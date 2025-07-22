package com.mo2ver.web.domain.event.service;

import com.mo2ver.web.domain.event.dto.response.EventProductResponse;
import com.mo2ver.web.domain.event.entity.Event;
import com.mo2ver.web.domain.event.repository.EventRepository;
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

    private final EventRepository eventRepository;

    @Transactional
    public EventResponse findEvent(String eventNo) {
        Event event = this.findEventById(eventNo);
        return EventResponse.of(event);
    }

    @Transactional
    public Page<EventProductResponse> findEvent(String eventNo, Pageable pageable) {
        return this.eventRepository.findById(eventNo, pageable);
    }

    @Transactional
    public Page<EventResponse> findEventlist(Pageable pageable, Member currentUser) {
        Page<Event> event = this.eventRepository.findByAll(pageable, currentUser);
        return event.map(EventResponse::of);
    }

    @Transactional
    public EventImageInfo findEventDetail(EventRequest eventRequest) {
        return this.eventRepository.findEventDetail(eventRequest);
    }

    @Transactional
    public String saveImageEvent(EventImageInfo eventImageInfo, Member currentUser) {
        Event event = new Event(eventImageInfo, currentUser);
        return this.eventRepository.save(event).getEventNo();
    }

    @Transactional
    public void updateImageEvent(EventImageInfo eventImageInfo, Member currentUser) {
        Event event = this.findEventById(eventImageInfo.getEventNo());
        event.update(eventImageInfo, currentUser);
    }
    
    private Event findEventById(String eventNo) {
        return this.eventRepository.findById(eventNo)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 이벤트정보 입니다."));
    }
}
