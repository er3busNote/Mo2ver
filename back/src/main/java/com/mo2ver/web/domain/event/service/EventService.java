package com.mo2ver.web.domain.event.service;

import com.mo2ver.web.domain.event.dto.response.EventProductResponse;
import com.mo2ver.web.domain.event.repository.EventManageRepository;
import com.mo2ver.web.domain.event.entity.EventManage;
import com.mo2ver.web.domain.event.dto.request.EventRequest;
import com.mo2ver.web.domain.event.dto.response.EventResponse;
import com.mo2ver.web.domain.event.dto.EventImageInfo;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class EventService {

    private final EventManageRepository eventManageRepository;

    @Transactional
    public EventResponse findEvent(Integer id) {
        EventManage eventManage = this.findEventManageById(id.longValue());
        return EventResponse.of(eventManage);
    }

    @Transactional
    public Page<EventProductResponse> findEvent(Integer id, Pageable pageable) {
        return this.eventManageRepository.findById(id, pageable);
    }

    @Transactional
    public Page<EventResponse> findEventlist(Pageable pageable, Member currentUser) {
        Page<EventManage> event = this.eventManageRepository.findByAll(pageable, currentUser);
        return event.map(EventResponse::of);
    }

    @Transactional
    public EventImageInfo findEventDetail(EventRequest eventRequest) {
        return this.eventManageRepository.findEventDetail(eventRequest);
    }

    @Transactional
    public Long saveImageEvent(EventImageInfo eventImageInfo, Member currentUser) {
        EventManage eventManage = new EventManage(eventImageInfo, currentUser);
        return this.eventManageRepository.save(eventManage).getEventManageNo();
    }

    @Transactional
    public void updateImageEvent(EventImageInfo eventImageInfo, Member currentUser) {
        EventManage eventManage = this.findEventManageById(eventImageInfo.getEventNo());
        eventManage.update(eventImageInfo, currentUser);
    }
    
    private EventManage findEventManageById(long id) {
        return this.eventManageRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 이벤트정보 입니다."));
    }
}
