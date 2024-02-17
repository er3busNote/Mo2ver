package com.mo2ver.web.domain.event.dao;

import com.mo2ver.web.domain.event.domain.EventManage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventManageRepository extends JpaRepository<EventManage, Long>, EventManageRepositoryCustom {
}
