package com.mo2ver.web.domain.event.dao;

import com.mo2ver.web.domain.event.domain.EventManage;
import com.mo2ver.web.domain.event.dto.EventDetailDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EventManageRepositoryCustom {
    Page<EventDetailDto> findById(Integer id, Pageable pageable);
    Page<EventManage> findByAll(Pageable pageable);
}
