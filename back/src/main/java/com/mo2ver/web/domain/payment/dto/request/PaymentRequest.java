package com.mo2ver.web.domain.payment.dto.request;

import lombok.*;

import javax.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PaymentRequest {

    @NotNull(message="결재금액을 입력해 주세요.")
    private Long amount;
}
