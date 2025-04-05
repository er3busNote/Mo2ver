package com.mo2ver.web.common.menu.repository;

import com.mo2ver.web.common.menu.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<Menu, String>, MenuRepositoryCustom {
}
