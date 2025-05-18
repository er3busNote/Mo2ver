package com.mo2ver.web.domain.payment.dto.response;

import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PaymentResponse {

    private String clientKey;
    private String orderId;
    private Long amount;

    public static PaymentResponse of(String clientKey, String orderId, Long amount) {
        return PaymentResponse.builder()
                .clientKey(clientKey)
                .orderId(orderId)
                .amount(amount)
                .build();
    }
}
