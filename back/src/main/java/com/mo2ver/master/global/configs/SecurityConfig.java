package com.mo2ver.master.global.configs;

import com.mo2ver.master.domain.member.service.MemberService;
import com.mo2ver.master.global.common.properties.CorsProperties;
import com.mo2ver.master.global.jwt.JwtAccessDeniedHandler;
import com.mo2ver.master.global.jwt.JwtAuthenticationEntryPoint;
import com.mo2ver.master.global.jwt.JwtSecurityConfig;
import com.mo2ver.master.global.jwt.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    Environment environment;

    @Autowired
    MemberService memberService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    CorsProperties corsProperties;

    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    public SecurityConfig(TokenProvider tokenProvider,
                          JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
                          JwtAccessDeniedHandler jwtAccessDeniedHandler) {
        this.tokenProvider = tokenProvider;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        if (Arrays.asList(environment.getActiveProfiles()).contains("prod")) {  // → HTTPS 서버 실 배포 시
            configureForHTTPS(http);    // → CSRF Enabled
        } else {
            configureForHTTP(http);     // → CSRF Disabled
        }
        configureCommon(http);  // → 공통
    }

    private void configureForHTTP(HttpSecurity http) throws Exception {
        http.csrf().disable();
    }

    private void configureForHTTPS(HttpSecurity http) throws Exception {
        http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
    }

    private void configureCommon(HttpSecurity http) throws Exception {
        http
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // → CSRF같은 예외적인 경우에는 별도로 처리할 수 있음
                .and()
                .cors().configurationSource(corsConfigurationSource())  // → CORS Origin 세팅
                .and()
                .authorizeRequests()
                .mvcMatchers(HttpMethod.GET, "/member/**", "/category/**").permitAll()
                .mvcMatchers(HttpMethod.PATCH, "/member/refresh").permitAll()
                .mvcMatchers(HttpMethod.POST, "/member/**", "/category/**").permitAll()
                .mvcMatchers(HttpMethod.POST, "/goods/create").hasAnyRole("MANAGER", "ADMIN")
                .anyRequest()
                .authenticated()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
                .and()
                .apply(new JwtSecurityConfig(tokenProvider));
    }

    //CORS 설정
    @Bean
    protected CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(Arrays.asList(corsProperties.getUrlClient()));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH"));
        config.setAllowedHeaders(Arrays.asList("Origin", "Authorization", "X-XSRF-TOKEN", "Content-Type", "Accept"));
        config.setAllowCredentials(true);   // 쿠키 요청을 허용하도록 true로 설정
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(memberService)
                .passwordEncoder(passwordEncoder);
    }
}
