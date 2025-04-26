package com.mo2ver.web.domain.event.repository;

import com.mo2ver.web.domain.event.entity.EventManage;
import com.mo2ver.web.domain.event.dto.EventImageInfo;
import com.mo2ver.web.domain.event.dto.request.EventRequest;
import com.mo2ver.web.domain.event.dto.response.EventProductResponse;
import com.mo2ver.web.domain.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EventManageRepositoryCustom {
    Page<EventProductResponse> findById(Integer id, Pageable pageable);
    Page<EventManage> findByAll(Pageable pageable, Member currentUser);
    EventImageInfo findEventDetail(EventRequest eventRequest);
}
