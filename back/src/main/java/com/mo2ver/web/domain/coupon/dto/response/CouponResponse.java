package com.mo2ver.web.domain.coupon.dto.response;

import com.mo2ver.web.domain.coupon.entity.CouponMember;
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

    public static CouponResponse of(CouponMember couponMember) {
        return CouponResponse.builder()
                .couponCode(couponMember.getCouponCode())
                .goodsCode(couponMember.getCoupon().getGoods().getGoodsCode())
                .issueDate(Optional.ofNullable(couponMember.getIssueDate()).map(formatter::format).orElse(""))
                .useDate(Optional.ofNullable(couponMember.getUseDate()).map(formatter::format).orElse(""))
                .expireDate(Optional.ofNullable(couponMember.getExpireDate()).map(formatter::format).orElse(""))
                .couponType(couponMember.getCoupon().getCouponType())
                .discountAmount(couponMember.getCoupon().getDiscountAmount())
                .maxDiscountAmount(couponMember.getCoupon().getMaxDiscountAmount())
                .minOrderAmount(couponMember.getCoupon().getMinOrderAmount())
                .totalQuantity(couponMember.getCoupon().getTotalQuantity())
                .issueQuantity(couponMember.getCoupon().getIssueQuantity())
                .useYesNo(couponMember.getUseYesNo())
                .build();
    }
}
