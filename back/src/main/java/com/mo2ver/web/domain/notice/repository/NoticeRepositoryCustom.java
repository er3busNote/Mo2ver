package com.mo2ver.web.domain.notice.repository;

import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.notice.dto.NoticeFileInfo;
import com.mo2ver.web.domain.notice.dto.request.NoticeRequest;
import com.mo2ver.web.domain.notice.dto.response.NoticeResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface NoticeRepositoryCustom {
    Optional<NoticeResponse> findNoticeById(Integer id);
    Page<NoticeResponse> findByAll(Pageable pageable, Member currentUser);
    NoticeFileInfo findNoticeDetail(NoticeRequest noticeRequest);
}
