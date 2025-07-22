package com.mo2ver.web.domain.display.repository;

import com.mo2ver.web.domain.display.entity.Banner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BannerRepository extends JpaRepository<Banner, String>, BannerRepositoryCustom {
    Page<Banner> findAll(Pageable pageable);
}
