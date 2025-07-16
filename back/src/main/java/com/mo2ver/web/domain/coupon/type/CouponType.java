package com.mo2ver.web.domain.coupon.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CouponType {
    RATE('R'),
    AMOUNT('A');

    private final Character code;

    public static CouponType fromCode(Character code) {
        for (CouponType role : values()) {
            if (role.code.equals(Character.toUpperCase(code))) {
                return role;
            }
        }
        throw new IllegalArgumentException("Invalid code: " + code);
    }
}
