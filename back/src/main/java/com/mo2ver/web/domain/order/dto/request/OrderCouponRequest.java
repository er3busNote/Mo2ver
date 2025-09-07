package com.mo2ver.web.domain.order.dto.request;

import com.mo2ver.web.global.common.validation.MinListSize;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Min;
import javax.validation.groups.Default;
import java.util.List;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class OrderCouponRequest {

    @NotBlank(groups = Update.class)
    private String orderId;

    @MinListSize(value = 1, message = "쿠폰 코드는 최소 1개 이상의 코드를 포함해야 합니다.")
    private List<String> couponCodes;

    @NotNull(message="촐 주문금액을 입력해 주세요.")
    @Min(value = 1000, message = "총 주문 금액은 최소 1000원 이상이어야 합니다.")
    private Integer totalAmount;
    
    private Integer couponAmount;

    public interface Update extends Default {}
}
