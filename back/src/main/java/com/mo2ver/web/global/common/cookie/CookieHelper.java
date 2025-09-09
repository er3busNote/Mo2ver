package com.mo2ver.web.global.common.cookie;

import com.mo2ver.web.global.common.setting.JwtSetting;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@Component
@RequiredArgsConstructor
public class CookieHelper {

    private final JwtSetting jwtSetting;

    protected static long jwtRefreshtokenValidationSecond;

    @PostConstruct
    public void init() {
        jwtRefreshtokenValidationSecond = jwtSetting.getJwtRefreshtokenValidationSecond();
    }

    public static ResponseCookie createCookie(String key, String value, boolean isHttpOnly) {
        return ResponseCookie.from(key, value)
                .httpOnly(isHttpOnly)
                .secure(true)
                .sameSite("None")
                .path("/")
                //.maxAge(jwtRefreshtokenValidationSecond)     // Refresh Token 만료시간과 동일하게 유지
                .build();
    }

    public static String resolveTokenFromCookie(HttpServletRequest request, String key) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (key.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
