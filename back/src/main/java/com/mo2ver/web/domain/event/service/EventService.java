package com.mo2ver.web.domain.event.service;

import com.mo2ver.web.domain.event.dao.EventImageRepository;
import com.mo2ver.web.domain.event.dao.EventManageRepository;
import com.mo2ver.web.domain.event.domain.EventImage;
import com.mo2ver.web.domain.event.domain.EventManage;
import com.mo2ver.web.domain.event.dto.EventDetailDto;
import com.mo2ver.web.domain.event.dto.EventDto;
import com.mo2ver.web.domain.event.dto.EventImageDto;
import com.mo2ver.web.domain.member.domain.Member;
import com.mo2ver.web.global.common.util.CryptoUtil;
import com.mo2ver.web.global.common.util.FileUtil;
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
    protected FileUtil fileUtil;
    @Autowired
    protected CryptoUtil cryptoUtil;

    @Transactional
    public byte[] findEventImage(Integer id) throws Exception {
        Path uploadDirectory = this.fileUtil.getUploadDirectory(EVENT_DIRECTORY);
        Optional<EventImage> info = this.eventImageRepository.findByGoodsImageAttachFile(id);
        if (info.isPresent()) {
            EventImage eventImage = info.get();
            String targetFileName = eventImage.getGoodsImageAttachFile() + "." + eventImage.getGoodsImageExtension();
            File targetFile = this.fileUtil.getTargetFile(uploadDirectory, targetFileName);
            return this.cryptoUtil.decryptFile(targetFile.getAbsolutePath());
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
        Path uploadDirectory = this.fileUtil.getUploadDirectory(EVENT_DIRECTORY);
        EventManage eventManage = this.eventManageRepository.save(EventManage.of(eventImageDto, currentUser));
        for (int i = 0; i < eventFiles.size(); i++) {
            MultipartFile file = eventFiles.get(i);
            String fileName = file.getOriginalFilename();
            String fileExtension = this.fileUtil.getFileExtension(Objects.requireNonNull(fileName));
            Integer goodsImageAttachFile = getGoodsImageAttachFile(eventManage.getEventManageNo(), i+1);
            Character basicImageYesNo = getBasicImageYesNo(i);
            File targetFile = this.fileUtil.getTargetFile(uploadDirectory, goodsImageAttachFile + "." + fileExtension);
            this.cryptoUtil.encryptFile(file, targetFile);  // 파일 저장
            this.eventImageRepository.save(EventImage.of(eventManage, goodsImageAttachFile, basicImageYesNo, fileExtension, i+1, currentUser));
        }
    }

    private Integer getGoodsImageAttachFile(Long eventManageNo, Integer index) {
        return eventManageNo.intValue() * 10 + index;
    }

    private Character getBasicImageYesNo(int i) {
        if (i == 0) return 'Y';
        return 'N';
    }
}
