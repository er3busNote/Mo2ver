package com.mo2ver.web.common.file.service;

import com.mo2ver.web.common.file.dao.FileRepository;
import com.mo2ver.web.common.file.domain.File;
import com.mo2ver.web.common.file.dto.FileAttachDto;
import com.mo2ver.web.common.file.dto.FileDto;
import com.mo2ver.web.domain.member.domain.Member;
import com.mo2ver.web.global.common.util.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
public class FileService {

    private static final String FILE_DIRECTORY = "cmmn";

    @Autowired
    protected FileRepository fileRepository;

    @Autowired
    protected FileUtil fileUtil;
    @Autowired
    protected JasyptUtil jasyptUtil;
    @Autowired
    protected CryptoUtil cryptoUtil;

    protected DateUtil dateUtil;

    @Autowired
    private Environment environment;

    @Transactional
    public byte[] findFile(String fileAttachCode) throws Exception {
        Optional<File> info = this.fileRepository.findById(Long.parseLong(fileAttachCode));
        if (info.isPresent()) {
            File file = info.get();
            return this.cryptoUtil.decryptFile(file.getFilePath());
        } else {
            throw new IOException("해당되는 파일을 찾을 수 없습니다.");
        }
    }

    @Transactional
    public FileDto saveFile(MultipartFile file, String targetFolder, Member currentUser) throws Exception {
        Path uploadDirectory = this.fileUtil.getUploadDirectory(getDirectory(targetFolder));
        String fileName = file.getOriginalFilename();
        String contentType = file.getContentType();
        Integer fileSize = Integer.valueOf(String.valueOf(file.getSize()));
        String fileExtension = this.fileUtil.getFileExtension(Objects.requireNonNull(fileName));
        String fileNameWithoutExtension = this.fileUtil.removeFileExtension(fileName);
        File fileInfo = this.fileRepository.save(File.of(fileName, getFilePath(uploadDirectory), contentType, fileSize, currentUser));
        this.cryptoUtil.encryptFile(file, this.fileUtil.getTargetFile(fileInfo.getFilePath()));  // 파일 저장
        return FileDto.toDTO(fileInfo, fileExtension, fileNameWithoutExtension);
    }

    @Transactional
    public List<FileAttachDto> saveFile(List<MultipartFile> files, Member currentUser) throws Exception {
        List<FileDto> fileDtoList = files.stream().map(ExceptionUtil.wrapFunction(file -> this.saveFile(file, FILE_DIRECTORY, currentUser))).collect(Collectors.toList());
        return fileDtoList.stream().map(FileAttachDto::toDTO).collect(Collectors.toList());
    }

    private String getDirectory(String targetFolder) {
        String targetPath = targetFolder;
        if(environment.acceptsProfiles("test")){
            targetPath = targetFolder + "_dev";
        }
        return targetPath + "/" + this.dateUtil.getCurrentDate();
    }

    private String getFilePath(Path uploadDirectory) {
        return uploadDirectory.toString() + "/" + UUID.randomUUID();
    }

    public String getFileAttachCode(String id) {
        return jasyptUtil.decrypt(id.replace(" ", "+"));
    }
}
