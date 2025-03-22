package com.mo2ver.web.global.common.utils;

import com.mo2ver.web.global.common.properties.JwtProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@Component
@RequiredArgsConstructor
public class CookieUtil {

    private final JwtProperties jwtProperties;

    private static long jwtRefreshtokenValidationSecond;

    @PostConstruct
    public void init() {
        jwtRefreshtokenValidationSecond = jwtProperties.getJwtRefreshtokenValidationSecond();
    }

    public static ResponseCookie createCookie(String key, String value, boolean isHttpOnly) {
        return ResponseCookie.from(key, value)
                .httpOnly(isHttpOnly)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(jwtRefreshtokenValidationSecond)     // Refresh Token 만료시간과 동일하게 유지
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
