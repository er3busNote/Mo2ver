package com.mo2ver.web.domain.display.dao;

import com.mo2ver.web.domain.display.domain.BannerManage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BannerManageRepository extends JpaRepository<BannerManage, Long> {
    Page<BannerManage> findAll(Pageable paging);
}
