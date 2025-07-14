package com.mo2ver.web.domain.coupon.dto.response;

import com.mo2ver.web.domain.coupon.entity.Coupon;
import lombok.*;

import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class CouponResponse {

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    private String issueDate;
    private String useDate;
    private String expireDate;
    private Character useYesNo;

    public static CouponResponse of(Coupon coupon) {
        return CouponResponse.builder()
                .issueDate(Optional.ofNullable(coupon.getIssueDate()).map(formatter::format).orElse(""))
                .useDate(Optional.ofNullable(coupon.getUseDate()).map(formatter::format).orElse(""))
                .expireDate(Optional.ofNullable(coupon.getExpireDate()).map(formatter::format).orElse(""))
                .useYesNo(coupon.getUseYesNo())
                .build();
    }
}
