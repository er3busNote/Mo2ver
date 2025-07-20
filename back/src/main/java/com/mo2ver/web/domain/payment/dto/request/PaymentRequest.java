package com.mo2ver.web.domain.payment.dto.request;

import lombok.*;

import javax.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PaymentRequest {

    @NotNull(message = "주문번호가 존재하지 않습니다")
    private String orderId;
}
