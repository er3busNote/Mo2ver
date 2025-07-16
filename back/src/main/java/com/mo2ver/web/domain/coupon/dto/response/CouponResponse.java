package com.mo2ver.web.domain.coupon.dto.response;

import com.mo2ver.web.domain.coupon.entity.Coupon;
import com.mo2ver.web.domain.coupon.type.CouponType;
import lombok.*;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class CouponResponse {

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    private String couponCode;
    private String goodsCode;
    private String issueDate;
    private String useDate;
    private String expireDate;
    private CouponType couponType;
    private BigDecimal discountAmount;
    private BigDecimal maxDiscountAmount;
    private BigDecimal minOrderAmount;
    private Integer totalQuantity;
    private Integer issueQuantity;
    private Character useYesNo;

    public static CouponResponse of(Coupon coupon) {
        return CouponResponse.builder()
                .couponCode(coupon.getCouponCode())
                .goodsCode(coupon.getGoods().getGoodsCode())
                .issueDate(Optional.ofNullable(coupon.getIssueDate()).map(formatter::format).orElse(""))
                .useDate(Optional.ofNullable(coupon.getUseDate()).map(formatter::format).orElse(""))
                .expireDate(Optional.ofNullable(coupon.getExpireDate()).map(formatter::format).orElse(""))
                .couponType(coupon.getCouponDetail().getCouponType())
                .discountAmount(coupon.getCouponDetail().getDiscountAmount())
                .maxDiscountAmount(coupon.getCouponDetail().getMaxDiscountAmount())
                .minOrderAmount(coupon.getCouponDetail().getMinOrderAmount())
                .totalQuantity(coupon.getCouponDetail().getTotalQuantity())
                .issueQuantity(coupon.getCouponDetail().getIssueQuantity())
                .useYesNo(coupon.getUseYesNo())
                .build();
    }
}
