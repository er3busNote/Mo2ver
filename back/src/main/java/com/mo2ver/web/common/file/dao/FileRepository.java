package com.mo2ver.web.common.file.dao;

import com.mo2ver.web.common.file.domain.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, Long> {
}
