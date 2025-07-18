package com.mo2ver.web.global.configs;

import com.mo2ver.web.domain.member.service.MemberService;
import com.mo2ver.web.global.common.setting.CorsSetting;
import com.mo2ver.web.global.jwt.JwtAccessDeniedHandler;
import com.mo2ver.web.global.jwt.JwtAuthenticationEntryPoint;
import com.mo2ver.web.global.jwt.JwtSecurityConfig;
import com.mo2ver.web.global.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.context.ApplicationContext;
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
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;
    private final CorsSetting corsSetting;
    private final TokenProvider tokenProvider;
    private final AccessDeniedHandler accessDeniedHandler;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final Environment environment;
    private final ApplicationContext applicationContext;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        if (Arrays.asList(environment.getActiveProfiles()).contains("production") && getServerPorts().contains(443)) {  // → HTTPS 서버 실 배포 시
            configureForHTTPS(http);    // → CSRF Enabled
        } else {
            configureForHTTP(http);     // → CSRF Disabled
        }
        configureCommon(http);  // → 공통
        //configureForPort(http);  // → 포트포워딩
    }

    private List<Integer> getServerPorts() {
        Map<String, TomcatServletWebServerFactory> serverBeans = applicationContext.getBeansOfType(TomcatServletWebServerFactory.class);
        return serverBeans.values().stream()
                .map(TomcatServletWebServerFactory::getPort)
                .collect(Collectors.toList());
    }

    private void configureForPort(HttpSecurity http) throws Exception {
        http.portMapper()
                .http(80)
                .mapsTo(443);
    }

    private void configureForHTTP(HttpSecurity http) throws Exception {
        http.csrf().disable();
    }

    private void configureForHTTPS(HttpSecurity http) throws Exception {
        RequestMatcher refreshTokenMatcher = new AntPathRequestMatcher("/member/refresh");
        http.csrf(csrf -> csrf
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()) // CSRF 토큰을 쿠키에 저장
                .ignoringRequestMatchers(refreshTokenMatcher) // Refresh Token 요청은 CSRF 검사 제외 (시큐리티 컨텍스트의 인증정보가 활성화되지 않을 경우, 필터 체인 시 CSRF 검증에서 예외처리가 발생할 수 있기 때문)
        );
    }

    private void configureCommon(HttpSecurity http) throws Exception {
        http
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // → CSRF같은 예외적인 경우에는 별도로 처리할 수 있음
                .and()
                .cors().configurationSource(corsConfigurationSource())  // → CORS Origin 세팅
                .and()
                .authorizeRequests()
                .mvcMatchers(HttpMethod.GET, "/menu/**", "/images/**", "/file/**", "/member/**", "/category/**", "/goods/**", "/review/**", "/cart/**", "/banner/**", "/event/**", "/notice/**", "/search/**", "/coupon/**").permitAll()
                .mvcMatchers(HttpMethod.PATCH, "/member/refresh").permitAll()               // 1) 인증
                .mvcMatchers(HttpMethod.POST, "/code/**", "/images/**", "/member/**", "/category/**", "/goods/**", "/search/**").permitAll()
                .mvcMatchers(HttpMethod.PATCH, "/goods/**").permitAll()
                .mvcMatchers(HttpMethod.GET, "/member/*", "/address/*", "/cart/list", "/recommend/**", "/order/**").hasAnyRole("USER")  // 3.1) 회원, 주소록, 장바구니, 추천, 주문 목록
                .mvcMatchers(HttpMethod.PATCH, "/address/*").hasAnyRole("USER")                 // 3.2) 주소록
                .mvcMatchers(HttpMethod.POST, "/address/*", "/cart/**", "/review/**", "/order/**", "/payment/**").hasAnyRole("USER")    // 3.3) 주소록, 장바구니, 리뷰, 주문, 결재 추가
                .mvcMatchers(HttpMethod.PUT, "/cart/**", "/review/**", "/coupon/**").hasAnyRole("USER")       // 3.4) 장바구니, 리뷰 수정 및 쿠폰 생성
                .mvcMatchers(HttpMethod.DELETE, "/cart/**", "/review/**").hasAnyRole("USER")    // 3.5) 장바구니, 리뷰 삭제
                .mvcMatchers(HttpMethod.GET, "/banner/list").hasAnyRole("MANAGER", "ADMIN")
                .mvcMatchers(HttpMethod.POST, "/banner/**", "/event/**", "/notice/**", "/category/**", "/coupon/**").hasAnyRole("MANAGER", "ADMIN")
                .mvcMatchers(HttpMethod.PATCH, "/banner/**", "/event/**", "/notice/**", "/category/**", "/coupon/**").hasAnyRole("MANAGER", "ADMIN")
                .mvcMatchers(HttpMethod.DELETE, "/category/**").hasAnyRole("MANAGER", "ADMIN")
                .antMatchers("/ws/**").permitAll() // WebSocket 엔드포인트는 인증 없이 허용
                .anyRequest()
                .authenticated()
                .and()
                .exceptionHandling()
                    .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                    .accessDeniedHandler(jwtAccessDeniedHandler)
                .and()
                .apply(new JwtSecurityConfig(tokenProvider, accessDeniedHandler));
    }

    //CORS 설정
    @Bean
    protected CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(Arrays.asList(corsSetting.getUrlClient()));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE"));
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
