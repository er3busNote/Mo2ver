package com.mo2ver.web.domain.notice.dto.request;

import lombok.*;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class NoticeRequest {

    @NotNull(message = "공지사항관리번호가 존재하지 않습니다")
    @Range(min = 1)
    private Long noticeManageNo;
}
