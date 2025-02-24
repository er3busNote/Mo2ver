package com.mo2ver.web.domain.event.service;

import com.mo2ver.web.common.file.dto.FileInfo;
import com.mo2ver.web.common.file.service.FileService;
import com.mo2ver.web.domain.event.dao.EventImageRepository;
import com.mo2ver.web.domain.event.dao.EventManageRepository;
import com.mo2ver.web.domain.event.domain.EventImage;
import com.mo2ver.web.domain.event.domain.EventManage;
import com.mo2ver.web.domain.event.dto.response.EventDetailResponse;
import com.mo2ver.web.domain.event.dto.response.EventResponse;
import com.mo2ver.web.domain.event.dto.request.EventImageRequest;
import com.mo2ver.web.domain.member.domain.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class EventService {

    private static final String EVENT_DIRECTORY = "event";

    private final FileService fileService;
    private final EventManageRepository eventManageRepository;
    private final EventImageRepository eventImageRepository;

    @Transactional
    public Page<EventDetailResponse> findEvent(Integer id, Pageable pageable) {
        return this.eventManageRepository.findById(id, pageable);
    }

    @Transactional
    public Page<EventResponse> findEventlist(Pageable pageable) {
        Page<EventManage> event = this.eventManageRepository.findByAll(pageable);
        return event.map(EventResponse::of);
    }

    @Transactional
    public Long saveImageEvent(List<MultipartFile> eventFiles, EventImageRequest eventImageRequest, Member currentUser) throws Exception {
        EventManage eventManage = this.eventManageRepository.save(EventManage.of(eventImageRequest, currentUser));
        for (int i = 0; i < eventFiles.size(); i++) {
            MultipartFile file = eventFiles.get(i);
            Character basicImageYesNo = getBasicImageYesNo(i);
            FileInfo fileInfo = this.fileService.saveFile(file, EVENT_DIRECTORY, currentUser);
            this.eventImageRepository.save(EventImage.of(eventManage, fileInfo.getFileCode(), basicImageYesNo, fileInfo.getFileExtension(), i+1, currentUser));
        }
        return eventManage.getEventManageNo();
    }

    private Character getBasicImageYesNo(int i) {
        if (i == 0) return 'Y';
        return 'N';
    }
}
