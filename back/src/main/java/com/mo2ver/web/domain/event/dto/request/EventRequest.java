package com.mo2ver.web.domain.event.dto.request;

import lombok.*;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class EventRequest {

    @NotNull(message = "이벤트관리번호가 존재하지 않습니다")
    @Range(min = 1)
    private Long eventManageNo;
}
