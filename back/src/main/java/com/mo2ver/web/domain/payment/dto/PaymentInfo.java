package com.mo2ver.web.domain.payment.dto;

import com.mo2ver.web.domain.order.entity.Order;
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

    @NotNull(message = "주문번호가 존재하지 않습니다")
    private UUID orderId;

    @NotNull(message="결재금액을 입력해 주세요.")
    private Long amount;

    public interface Update extends Default {}

    public static PaymentInfo of(Order order) {
        return PaymentInfo.builder()
                .orderId(order.getOrderId())
                .amount(order.getAmount())
                .build();
    }
}
