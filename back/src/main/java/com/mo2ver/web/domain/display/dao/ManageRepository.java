package com.mo2ver.web.domain.display.dao;

import com.mo2ver.web.domain.display.domain.Manage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManageRepository extends JpaRepository<Manage, Long> {
    Page<Manage> findAll(Pageable paging);
}
