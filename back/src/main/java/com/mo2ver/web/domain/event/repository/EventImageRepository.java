package com.mo2ver.web.domain.event.repository;

import com.mo2ver.web.domain.event.entity.EventImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EventImageRepository extends JpaRepository<EventImage, Long> {

    Optional<EventImage> findByGoodsImageAttachFile(Integer id);
}
