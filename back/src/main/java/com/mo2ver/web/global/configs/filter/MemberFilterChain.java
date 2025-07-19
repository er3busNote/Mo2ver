package com.mo2ver.web.global.configs.filter;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.stereotype.Component;

@Component
public class MemberFilterChain {

    public void configure(ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry registry) {
        registry
                .mvcMatchers(HttpMethod.GET,    // 3.1) 회원, 주소록, 장바구니, 추천, 주문 목록
                        "/member/*", "/address/*", "/cart/list",
                        "/recommend/**", "/order/**"
                ).hasRole("USER")

                .mvcMatchers(HttpMethod.PATCH,  // 3.2) 주소록
                        "/address/*"
                ).hasRole("USER")

                .mvcMatchers(HttpMethod.POST,   // 3.3) 주소록, 장바구니, 리뷰, 주문, 결재 추가
                        "/address/*", "/cart/**", "/review/**", "/order/**", "/payment/**"
                ).hasRole("USER")

                .mvcMatchers(HttpMethod.PUT,    // 3.4) 장바구니, 리뷰 수정 및 쿠폰 생성
                        "/cart/**", "/review/**", "/coupon/**"
                ).hasRole("USER")

                .mvcMatchers(HttpMethod.DELETE, // 3.5) 장바구니, 리뷰 삭제
                        "/cart/**", "/review/**"
                ).hasRole("USER");
    }
}
