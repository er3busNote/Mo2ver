package com.mo2ver.web.domain.order.dto.request;

import com.mo2ver.web.global.common.validation.MinListSize;
import lombok.*;

import javax.validation.constraints.NotBlank;
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

    private Integer couponAmount;

    public interface Update extends Default {}
}
