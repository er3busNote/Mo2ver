package com.mo2ver.web.global.configs.filter;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.stereotype.Component;

@Component
public class NoneFilterChain {

    public void configure(ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry registry) {
        registry
                .mvcMatchers(HttpMethod.GET,
                        "/menu/**", "/images/**", "/file/**", "/member/**", "/category/**",
                        "/goods/**", "/review/**", "/cart/**", "/banner/**", "/event/**",
                        "/notice/**", "/search/**", "/coupon/**"
                ).permitAll()

                .mvcMatchers(HttpMethod.GET, "/init/**").permitAll()    // 0) POST → GET : URI에서 직접 접근해서 처리

                .mvcMatchers(HttpMethod.PATCH,   // 1) 인증
                        "/member/refresh"
                ).permitAll()

                .mvcMatchers(HttpMethod.POST,
                        "/code/**", "/images/**", "/member/**", "/category/**",
                        "/goods/**", "/search/**"
                ).permitAll()

                .mvcMatchers(HttpMethod.PATCH, "/goods/**").permitAll();
    }
}
