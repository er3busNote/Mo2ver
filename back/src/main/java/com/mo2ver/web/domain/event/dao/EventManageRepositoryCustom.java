package com.mo2ver.web.domain.event.dao;

import com.mo2ver.web.domain.event.domain.EventManage;
import com.mo2ver.web.domain.event.dto.EventImageInfo;
import com.mo2ver.web.domain.event.dto.request.EventRequest;
import com.mo2ver.web.domain.event.dto.response.EventDetailResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EventManageRepositoryCustom {
    Page<EventDetailResponse> findById(Integer id, Pageable pageable);
    Page<EventManage> findByAll(Pageable pageable);
    EventImageInfo findEventDetail(EventRequest eventRequest);
}
