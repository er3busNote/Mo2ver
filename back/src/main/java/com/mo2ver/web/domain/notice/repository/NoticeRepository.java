package com.mo2ver.web.domain.notice.repository;

import com.mo2ver.web.domain.notice.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
    Page<Notice> findAll(Pageable pageable);

    Page<Notice> findByNoticeYesNo(Character noticeYesNo, Pageable pageable);
}
