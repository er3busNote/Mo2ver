package com.mo2ver.web.common.code.repository;

import com.mo2ver.web.common.code.entity.Code;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CodeRepository extends JpaRepository<Code, String>, CodeRepositoryCustom {
}
