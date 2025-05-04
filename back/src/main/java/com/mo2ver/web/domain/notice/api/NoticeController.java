package com.mo2ver.web.domain.notice.api;

import com.mo2ver.web.domain.member.entity.CurrentUser;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.notice.dto.NoticeFileInfo;
import com.mo2ver.web.domain.notice.dto.request.NoticeRequest;
import com.mo2ver.web.domain.notice.dto.response.NoticeResponse;
import com.mo2ver.web.domain.notice.service.NoticeService;
import com.mo2ver.web.global.common.dto.PageInfo;
import com.mo2ver.web.global.common.dto.response.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/notice")
public class NoticeController {

    private final NoticeService noticeService;

    @GetMapping("/info/{id}")
    public ResponseEntity<NoticeResponse> infoNotice(
            @PathVariable Integer id,
            @CurrentUser Member currentUser
    ) {
        return ResponseEntity.ok().body(noticeService.findNotice(id));
    }

    @GetMapping("/list")
    public ResponseEntity<Page<NoticeResponse>> listNotice(
            @Valid PageInfo pageInfo,
            @CurrentUser Member currentUser
    ) {
        Pageable pageable = PageRequest.of(pageInfo.getPage(), pageInfo.getSize(), Sort.Direction.DESC, "noticeManageNo");
        Page<NoticeResponse> pages = this.noticeService.findNoticelist(pageable, currentUser);
        return ResponseEntity.ok().body(pages);
    }

    @PostMapping("/detail")
    public ResponseEntity<NoticeFileInfo> eventDetail(
            @RequestBody @Valid NoticeRequest noticeRequest,
            @CurrentUser Member currentUser
    ) {
        return ResponseEntity.ok().body(noticeService.findNoticeDetail(noticeRequest));
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseHandler> createNotice(
            @RequestBody @Valid NoticeFileInfo noticeFileInfo,
            @CurrentUser Member currentUser
    ) {
        Long noticeManageNo = noticeService.saveNotice(noticeFileInfo, currentUser);
        return ResponseEntity.created(URI.create("/create/" + noticeManageNo))
                .body(ResponseHandler.builder()
                        .status(HttpStatus.CREATED.value())
                        .message("공지사항정보가 저장되었습니다")
                        .build());
    }

    @PatchMapping("/update")
    public ResponseEntity<ResponseHandler> updateNotice(
            @RequestBody @Validated(NoticeFileInfo.Update.class) NoticeFileInfo noticeFileInfo,
            @CurrentUser Member currentUser
    ) {
        noticeService.updateNotice(noticeFileInfo, currentUser);
        return ResponseEntity.ok()
                .body(ResponseHandler.builder()
                        .status(HttpStatus.OK.value())
                        .message("공지사항정보가 수정되었습니다")
                        .build());
    }
}
