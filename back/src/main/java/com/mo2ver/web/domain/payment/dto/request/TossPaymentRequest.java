package com.mo2ver.web.domain.payment.dto.request;

import com.mo2ver.web.domain.payment.dto.PaymentInfo;
import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class TossPaymentRequest {

    private String paymentKey;
    private String orderId;
    private Long amount;

    public static TossPaymentRequest of(PaymentInfo paymentInfo) {
        return TossPaymentRequest.builder()
                .paymentKey(paymentInfo.getPaymentKey())
                .orderId(paymentInfo.getOrderId().toString())
                .amount(paymentInfo.getAmount())
                .build();
    }
}
