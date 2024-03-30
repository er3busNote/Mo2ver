package com.mo2ver.web.domain.event.service;

import com.mo2ver.web.domain.event.dao.EventImageRepository;
import com.mo2ver.web.domain.event.dao.EventManageRepository;
import com.mo2ver.web.domain.event.domain.EventImage;
import com.mo2ver.web.domain.event.domain.EventManage;
import com.mo2ver.web.domain.event.dto.EventDetailDto;
import com.mo2ver.web.domain.event.dto.EventDto;
import com.mo2ver.web.domain.event.dto.EventImageDto;
import com.mo2ver.web.domain.member.domain.Member;
import com.mo2ver.web.global.common.properties.CryptoProperties;
import com.mo2ver.web.global.common.properties.ImagesProperties;
import com.mo2ver.web.global.common.util.CryptoUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Service
public class EventService {

    private static final String EVENT_DIRECTORY = "event";

    @Autowired
    protected EventManageRepository eventManageRepository;
    @Autowired
    protected EventImageRepository eventImageRepository;
    @Autowired
    protected CryptoUtil cryptoUtil;
    @Autowired
    protected CryptoProperties cryptoProperties;
    @Autowired
    protected ImagesProperties imagesProperties;

    @Transactional
    public byte[] findEventImage(Integer id) throws Exception {
        String projectDir = System.getProperty("user.dir");
        Path folderPath = Paths.get(imagesProperties.getFilepath());
        Path uploadDirectory = folderPath.resolve(EVENT_DIRECTORY);
        Optional<EventImage> info = this.eventImageRepository.findByGoodsImageAttachFile(id);
        if (info.isPresent()) {
            EventImage eventImage = info.get();
            String targetFileName = eventImage.getGoodsImageAttachFile() + "." + eventImage.getGoodsImageExtension();
            File targetFile = new File(projectDir + "/" + uploadDirectory + "/" + targetFileName);
            return this.cryptoUtil.decryptFile(targetFile.getAbsolutePath(), cryptoProperties.getPassword(), cryptoProperties.getSalt());
        } else {
            throw new IOException("해당되는 파일을 찾을 수 없습니다.");
        }
    }

    @Transactional
    public Page<EventDetailDto> findEvent(Integer id, Pageable pageable) {
        return this.eventManageRepository.findById(id, pageable);
    }

    @Transactional
    public Page<EventDto> findEventlist(Pageable pageable) {
        Page<EventManage> event = this.eventManageRepository.findByAll(pageable);
        return event.map(EventDto::toDTO);
    }

    @Transactional
    public void saveImageEvent(List<MultipartFile> eventFiles, EventImageDto eventImageDto, Member currentUser) throws Exception {
        String projectDir = System.getProperty("user.dir");
        Path folderPath = Paths.get(imagesProperties.getFilepath());
        Path uploadDirectory = folderPath.resolve(EVENT_DIRECTORY);
        this.createDirectory(uploadDirectory.toString()); // 업로드할 디렉토리가 없으면 생성

        EventManage eventManage = this.eventManageRepository.save(EventManage.of(eventImageDto, currentUser));
        for (int i = 0; i < eventFiles.size(); i++) {
            MultipartFile file = eventFiles.get(i);
            String fileName = file.getOriginalFilename();
            String fileExtension = getFileExtension(Objects.requireNonNull(fileName));
            Integer goodsImageAttachFile = getGoodsImageAttachFile(eventManage.getEventManageNo(), i+1);
            Character basicImageYesNo = getBasicImageYesNo(i);
            File targetFile = new File(projectDir + "/" + uploadDirectory + "/" + goodsImageAttachFile + "." + fileExtension);
            this.cryptoUtil.encryptFile(file, targetFile, cryptoProperties.getPassword(), cryptoProperties.getSalt());  // 파일 저장
            this.eventImageRepository.save(EventImage.of(eventManage, goodsImageAttachFile, basicImageYesNo, fileExtension, i+1, currentUser));
        }
    }

    private void createDirectory(String uploadDirectory) {
        File directory = new File(uploadDirectory);
        if (!directory.exists()) {
            directory.mkdirs();
        }
    }

    private String getFileExtension(String fileName) {
        int lastDotIndex = fileName.lastIndexOf(".");
        if (lastDotIndex > 0) {
            return fileName.substring(lastDotIndex + 1);
        }
        return "";
    }

    private Integer getGoodsImageAttachFile(Long eventManageNo, Integer index) {
        return eventManageNo.intValue() * 10 + index;
    }

    private Character getBasicImageYesNo(int i) {
        if (i == 0) return 'Y';
        return 'N';
    }
}
