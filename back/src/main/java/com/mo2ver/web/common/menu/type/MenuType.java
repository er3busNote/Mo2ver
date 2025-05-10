package com.mo2ver.web.common.menu.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MenuType {
    USER(0),
    ADMIN(1);

    private final Integer code;

    public static MenuType fromCode(Integer code) {
        for (MenuType role : values()) {
            if (role.code.equals(code)) {
                return role;
            }
        }
        throw new IllegalArgumentException("Invalid code: " + code);
    }
}
