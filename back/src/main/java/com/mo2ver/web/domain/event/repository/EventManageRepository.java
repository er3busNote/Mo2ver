package com.mo2ver.web.domain.event.repository;

import com.mo2ver.web.domain.event.entity.EventManage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventManageRepository extends JpaRepository<EventManage, Long>, EventManageRepositoryCustom {
}
