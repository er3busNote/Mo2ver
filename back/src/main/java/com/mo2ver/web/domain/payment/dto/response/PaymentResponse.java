package com.mo2ver.web.domain.payment.dto.response;

import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PaymentResponse {

    private String clientKey;
    private String orderId;

    public static PaymentResponse of(String clientKey, String orderId) {
        return PaymentResponse.builder()
                .clientKey(clientKey)
                .orderId(orderId)
                .build();
    }
}
