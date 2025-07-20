package com.mo2ver.web.domain.order.dto.request;

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

    private List<String> couponCodes;

    public interface Update extends Default {}
}
