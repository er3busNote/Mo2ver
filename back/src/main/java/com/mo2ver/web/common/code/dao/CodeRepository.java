package com.mo2ver.web.common.code.dao;

import com.mo2ver.web.common.code.domain.Code;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CodeRepository extends JpaRepository<Code, String>, CodeRepositoryCustom {
}
