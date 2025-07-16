package com.mo2ver.web.domain.coupon.converter;

import com.mo2ver.web.domain.coupon.type.CouponType;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class CouponTypeConverter implements Converter<String, CouponType> {

    @Override
    public CouponType convert(String source) {
        if (source == null || source.isEmpty()) {
            throw new IllegalArgumentException("쿠폰 코드가 존재하지 않습니다.");
        }
        return CouponType.fromCode(source.charAt(0));
    }
}
