package com.mo2ver.web.global.configs.filter;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.stereotype.Component;

@Component
public class AdminFilterChain {

    public void configure(ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry registry) {
        registry
                .mvcMatchers(HttpMethod.GET, "/banner/list").hasAnyRole("MANAGER", "ADMIN")

                .mvcMatchers(HttpMethod.POST,
                        "/banner/**", "/event/**", "/notice/**",
                        "/category/**", "/coupon/**"
                ).hasAnyRole("MANAGER", "ADMIN")

                .mvcMatchers(HttpMethod.PATCH,
                        "/banner/**", "/event/**", "/notice/**",
                        "/category/**", "/coupon/**"
                ).hasAnyRole("MANAGER", "ADMIN")

                .mvcMatchers(HttpMethod.DELETE, "/category/**").hasAnyRole("MANAGER", "ADMIN");
    }
}
