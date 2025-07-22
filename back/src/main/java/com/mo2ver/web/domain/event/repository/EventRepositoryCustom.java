package com.mo2ver.web.domain.event.repository;

import com.mo2ver.web.domain.event.entity.Event;
import com.mo2ver.web.domain.event.dto.EventImageInfo;
import com.mo2ver.web.domain.event.dto.request.EventRequest;
import com.mo2ver.web.domain.event.dto.response.EventProductResponse;
import com.mo2ver.web.domain.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EventRepositoryCustom {
    Page<EventProductResponse> findById(String id, Pageable pageable);
    Page<Event> findByAll(Pageable pageable, Member currentUser);
    EventImageInfo findEventDetail(EventRequest eventRequest);
}
