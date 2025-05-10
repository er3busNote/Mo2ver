package com.mo2ver.web.domain.goods.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CategoryType {
    LARGE('L'),
    MEDIUM('M'),
    SMALL('S');

    private final Character code;

    public static CategoryType fromCode(Character code) {
        for (CategoryType role : values()) {
            if (role.code.equals(Character.toUpperCase(code))) {
                return role;
            }
        }
        throw new IllegalArgumentException("Invalid code: " + code);
    }
}
