package com.mo2ver.web.domain.coupon.dto.request;

import com.mo2ver.web.domain.coupon.type.CouponType;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.groups.Default;
import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CouponRequest {

    @NotBlank(groups = Update.class)
    private String couponNo;

    @NotBlank(message="상품코드가 존재하지 않습니다.")
    private String goodsCode;

    @NotNull(message = "쿠폰타입이 존재하지 않습니다")
    private CouponType couponType;

    @NotNull(message="할인금액를 입력해 주세요.")
    @Positive
    private BigDecimal discountAmount;

    @NotNull(message="최대할인금액를 입력해 주세요.")
    @Positive
    private BigDecimal maxDiscountAmount;

    @NotNull(message="최소주문금액를 입력해 주세요.")
    @Positive
    private BigDecimal minOrderAmount;

    @NotNull(message="전체발급가능수량을 입력해 주세요.")
    private Integer totalQuantity;

    @NotNull(message="현재발급한수량을 입력해 주세요.")
    private Integer issueQuantity;

    public interface Update extends Default {}
}
