package com.mo2ver.web.domain.event.dao;

import com.mo2ver.web.domain.event.domain.EventImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventImageRepository extends JpaRepository<EventImage, Long> {
}
