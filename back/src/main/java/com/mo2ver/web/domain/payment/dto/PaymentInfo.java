package com.mo2ver.web.domain.payment.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.groups.Default;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class PaymentInfo {

    @NotNull(groups = Update.class)
    private String paymentCode;

    @NotBlank(message = "결제인증 키값이 존재하지 않습니다")
    private String paymentKey;

    @NotBlank(message = "주문번호가 존재하지 않습니다")
    private String orderId;

    @NotNull(message="결재금액을 입력해 주세요.")
    private Long amount;

    public interface Update extends Default {}

    public static PaymentInfo of(Long amount) {
        return PaymentInfo.builder()
                .orderId(UUID.randomUUID().toString())
                .amount(amount)
                .build();
    }

    public static PaymentInfo of(String paymentKey, String orderId, Long amount) {
        return PaymentInfo.builder()
                .paymentKey(paymentKey)
                .orderId(orderId)
                .amount(amount)
                .build();
    }
}
