package com.mo2ver.web.common.file.service;

import com.mo2ver.web.common.file.repository.FileRepository;
import com.mo2ver.web.common.file.entity.File;
import com.mo2ver.web.common.file.dto.FileAttachInfo;
import com.mo2ver.web.common.file.dto.FileInfo;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.global.common.utils.*;
import com.mo2ver.web.global.common.uuid.UuidManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class FileService {

    private static final String FILE_DIRECTORY = "cmmn";

    private final FileRepository fileRepository;
    private final ObjectStorageUtil objectStorageUtil;
    private final Environment environment;

    @Transactional
    public byte[] findFile(Integer attachFile) throws Exception {
        Optional<File> info = this.fileRepository.findById(attachFile.longValue());
        if (info.isPresent()) {
            File file = info.get();
            if('Y' == file.getCloudYn()){
                return this.objectStorageUtil.downloadFile(file.getFilePath());
            } else {
                return CryptoUtil.decryptFile(file.getFilePath());
            }
        } else {
            throw new IOException("해당되는 파일을 찾을 수 없습니다.");
        }
    }

    @Transactional
    public FileInfo saveFile(MultipartFile file, String targetFolder, Member currentUser) throws Exception {
        Path uploadDirectory = FileUtil.getUploadDirectory(this.getDirectory(targetFolder));
        String fileName = file.getOriginalFilename();
        String contentType = file.getContentType();
        Integer fileSize = Integer.valueOf(String.valueOf(file.getSize()));
        File fileInfo = this.fileRepository.save(File.of(fileName, this.getFilePath(uploadDirectory), contentType, fileSize, 'N', currentUser));
        CryptoUtil.encryptFile(file, FileUtil.getTargetFile(fileInfo.getFilePath()));  // 파일 저장
        return FileInfo.of(fileInfo);
    }

    @Transactional
    public FileInfo saveBucketFile(MultipartFile file, Member currentUser) throws IOException {
        String bucketPath = this.getBucketPath();
        String fileName = file.getOriginalFilename();
        String contentType = file.getContentType();
        Integer fileSize = Integer.valueOf(String.valueOf(file.getSize()));
        File fileInfo = this.fileRepository.save(File.of(fileName, bucketPath, contentType, fileSize, 'Y', currentUser));
        this.objectStorageUtil.uploadFile(file, bucketPath);
        return FileInfo.of(fileInfo);
    }

    @Transactional
    public List<FileAttachInfo> saveFile(List<MultipartFile> files, Member currentUser) throws Exception {
        List<FileInfo> fileInfoList = files.stream().map(ExceptionUtil.wrapFunction(file -> this.saveFile(file, FILE_DIRECTORY, currentUser))).collect(Collectors.toList());
        return fileInfoList.stream().map(FileAttachInfo::of).collect(Collectors.toList());
    }

    @Transactional
    public List<FileAttachInfo> saveBucketFile(List<MultipartFile> files, Member currentUser) throws Exception {
        List<FileInfo> fileInfoList = files.stream().map(ExceptionUtil.wrapFunction(file -> this.saveBucketFile(file, currentUser))).collect(Collectors.toList());
        return fileInfoList.stream().map(FileAttachInfo::of).collect(Collectors.toList());
    }

    private String getDirectory(String targetFolder) {
        String targetPath = targetFolder;
        if(Arrays.asList(environment.getActiveProfiles()).contains("test")){
            targetPath = targetFolder + "_dev";
        }
        return targetPath + "/" + DateUtil.getCurrentDate();
    }

    private String getFilePath(Path uploadDirectory) {
        return uploadDirectory.toString() + "/" + UuidManager.generateId();
    }

    private String getBucketPath() {
        return DateUtil.getCurrentDate() + "/" + UuidManager.generateId();
    }
}
