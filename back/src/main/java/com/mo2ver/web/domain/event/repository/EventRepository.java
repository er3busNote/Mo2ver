package com.mo2ver.web.domain.event.repository;

import com.mo2ver.web.domain.event.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, String>, EventRepositoryCustom {
}
