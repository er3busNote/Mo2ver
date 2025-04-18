package com.mo2ver.web.domain.display.repository;

import com.mo2ver.web.domain.display.entity.BannerManage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BannerManageRepository extends JpaRepository<BannerManage, Long>, BannerManageRepositoryCustom {
    Page<BannerManage> findAll(Pageable paging);
}
