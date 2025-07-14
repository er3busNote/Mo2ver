package com.mo2ver.web.domain.coupon.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CouponRequest {

    @NotBlank(message="상품코드가 존재하지 않습니다.")
    private String goodsCode;
}
