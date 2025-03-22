package com.mo2ver.web.common.file.repository;

import com.mo2ver.web.common.file.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, Long> {
}
