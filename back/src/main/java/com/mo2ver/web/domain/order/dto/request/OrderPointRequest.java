package com.mo2ver.web.domain.order.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.groups.Default;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class OrderPointRequest {

    @NotBlank(groups = Update.class)
    private String orderId;

    @NotNull(message="포인트 금액을 입력해 주세요.")
    private Integer pointAmount;

    public interface Update extends Default {}
}
