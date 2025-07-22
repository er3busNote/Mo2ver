package com.mo2ver.web.domain.notice.service;

import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.member.repository.MemberRepository;
import com.mo2ver.web.domain.notice.dto.NoticeFileInfo;
import com.mo2ver.web.domain.notice.dto.request.NoticeRequest;
import com.mo2ver.web.domain.notice.dto.response.NoticeResponse;
import com.mo2ver.web.domain.notice.entity.Notice;
import com.mo2ver.web.domain.notice.repository.NoticeRepository;
import com.mo2ver.web.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class NoticeService {

    private final MemberRepository memberRepository;
    private final NoticeRepository noticeRepository;

    @Transactional
    public NoticeResponse findNotice(String noticeNo) {
        return this.findByNoticeId(noticeNo);
    }

    @Transactional
    public Page<NoticeResponse> findNoticelist(Pageable pageable, Member currentUser) {
        return this.noticeRepository.findByAll(pageable, currentUser);
    }

    @Transactional
    public NoticeFileInfo findNoticeDetail(NoticeRequest noticeRequest) {
        return this.noticeRepository.findNoticeDetail(noticeRequest);
    }

    @Transactional
    public String saveNotice(NoticeFileInfo noticeFileInfo, Member currentUser) {
        Member member = this.findMemberById(currentUser.getMemberNo());
        Notice notice = new Notice(noticeFileInfo, member);
        return this.noticeRepository.save(notice).getNoticeNo();
    }

    @Transactional
    public void updateNotice(NoticeFileInfo noticeFileInfo, Member currentUser) {
        Notice notice = this.findNoticeById(noticeFileInfo.getNoticeNo());
        notice.update(noticeFileInfo, currentUser);
    }

    private Member findMemberById(String memberNo) {
        return this.memberRepository.findById(memberNo)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 회원번호 입니다."));
    }
    
    private Notice findNoticeById(String noticeNo) {
        return this.noticeRepository.findById(noticeNo)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 공지사항정보 입니다."));
    }

    private NoticeResponse findByNoticeId(String noticeNo) {
        return this.noticeRepository.findNoticeById(noticeNo)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 공지사항정보 입니다."));
    }
}
