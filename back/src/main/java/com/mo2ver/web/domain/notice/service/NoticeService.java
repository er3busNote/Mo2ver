package com.mo2ver.web.domain.notice.service;

import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.notice.dto.NoticeFileInfo;
import com.mo2ver.web.domain.notice.dto.request.NoticeRequest;
import com.mo2ver.web.domain.notice.dto.response.NoticeResponse;
import com.mo2ver.web.domain.notice.entity.Notice;
import com.mo2ver.web.domain.notice.repository.NoticeRepository;
import com.mo2ver.web.global.common.auth.AuthManager;
import com.mo2ver.web.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;

    @Transactional
    public NoticeResponse findNotice(Integer id) {
        Notice notice = this.findNoticeManageById(id.longValue());
        return NoticeResponse.of(notice);
    }

    @Transactional
    public Page<NoticeResponse> findNoticelist(Pageable pageable, Member currentUser) {
        Page<Notice> notice = this.findAll(pageable, currentUser);
        return notice.map(NoticeResponse::of);
    }

    private Page<Notice> findAll(Pageable pageable, Member currentUser) {
        if(currentUser == null || AuthManager.isUser(currentUser.getRoles())) {
            return this.noticeRepository.findByNoticeYesNo('Y', pageable);
        }
        return this.noticeRepository.findAll(pageable);
    }

    @Transactional
    public NoticeFileInfo findNoticeDetail(NoticeRequest noticeRequest) {
        Notice notice = this.findNoticeManageById(noticeRequest.getNoticeManageNo());
        return NoticeFileInfo.of(notice);
    }

    @Transactional
    public Long saveNotice(NoticeFileInfo noticeFileInfo, Member currentUser) {
        Notice notice = new Notice(noticeFileInfo, currentUser);
        return this.noticeRepository.save(notice).getNoticeManageNo();
    }

    @Transactional
    public void updateNotice(NoticeFileInfo noticeFileInfo, Member currentUser) {
        Notice notice = this.findNoticeManageById(noticeFileInfo.getNoticeNo());
        notice.update(noticeFileInfo, currentUser);
    }
    
    private Notice findNoticeManageById(long id) {
        return this.noticeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 공지사항정보 입니다."));
    }
}
