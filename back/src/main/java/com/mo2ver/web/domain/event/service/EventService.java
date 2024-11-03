package com.mo2ver.web.domain.event.service;

import com.mo2ver.web.common.file.dto.FileDto;
import com.mo2ver.web.common.file.service.FileService;
import com.mo2ver.web.domain.event.dao.EventImageRepository;
import com.mo2ver.web.domain.event.dao.EventManageRepository;
import com.mo2ver.web.domain.event.domain.EventImage;
import com.mo2ver.web.domain.event.domain.EventManage;
import com.mo2ver.web.domain.event.dto.EventDetailDto;
import com.mo2ver.web.domain.event.dto.EventDto;
import com.mo2ver.web.domain.event.dto.EventImageDto;
import com.mo2ver.web.domain.member.domain.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.List;

@Slf4j
@Service
public class EventService {

    private static final String EVENT_DIRECTORY = "event";

    @Autowired
    protected FileService fileService;

    @Autowired
    protected EventManageRepository eventManageRepository;
    @Autowired
    protected EventImageRepository eventImageRepository;

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
        EventManage eventManage = this.eventManageRepository.save(EventManage.of(eventImageDto, currentUser));
        for (int i = 0; i < eventFiles.size(); i++) {
            MultipartFile file = eventFiles.get(i);
            Character basicImageYesNo = getBasicImageYesNo(i);
            FileDto fileDto = this.fileService.saveFile(file, EVENT_DIRECTORY, currentUser);
            this.eventImageRepository.save(EventImage.of(eventManage, fileDto.getFileCode(), basicImageYesNo, fileDto.getFileExtension(), i+1, currentUser));
        }
    }

    private Character getBasicImageYesNo(int i) {
        if (i == 0) return 'Y';
        return 'N';
    }
}
