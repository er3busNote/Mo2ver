package com.mo2ver.web.global.configs;

import com.mo2ver.web.domain.member.service.MemberService;
import com.mo2ver.web.global.common.properties.CorsProperties;
import com.mo2ver.web.global.jwt.JwtAccessDeniedHandler;
import com.mo2ver.web.global.jwt.JwtAuthenticationEntryPoint;
import com.mo2ver.web.global.jwt.JwtSecurityConfig;
import com.mo2ver.web.global.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
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
    private final CorsProperties corsProperties;
    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Autowired
    private Environment environment;
    @Autowired
    private ApplicationContext applicationContext;

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
                .mvcMatchers(HttpMethod.GET, "/member/**", "/category/**", "/goods/**", "/cart/**", "/banner/**", "/event/**").permitAll()
                .mvcMatchers(HttpMethod.PATCH, "/member/refresh").permitAll()               // 1) 인증
                .mvcMatchers(HttpMethod.GET, "/images/**", "/file/image/**").permitAll()    // 2) 이미지 파일
                .mvcMatchers(HttpMethod.POST, "/code/**", "/images/**", "/member/**", "/category/**", "/goods/**").permitAll()
                .mvcMatchers(HttpMethod.GET, "/cart/list").hasAnyRole("USER")           // 3.1) 장바구니 목록
                .mvcMatchers(HttpMethod.POST, "/cart/**").hasAnyRole("USER")            // 3.2) 장바구니 추가
                .mvcMatchers(HttpMethod.PUT, "/cart/**").hasAnyRole("USER")             // 3.3) 장바구니 수정
                .mvcMatchers(HttpMethod.DELETE, "/cart/**").hasAnyRole("USER")          // 3.4) 장바구니 삭제
                .mvcMatchers(HttpMethod.GET, "/banner/list").hasAnyRole("MANAGER", "ADMIN")
                .mvcMatchers(HttpMethod.POST, "/banner/**", "/event/**", "/category/**").hasAnyRole("MANAGER", "ADMIN")
                .mvcMatchers(HttpMethod.PATCH, "/banner/**", "/event/**", "/category/**").hasAnyRole("MANAGER", "ADMIN")
                .mvcMatchers(HttpMethod.DELETE, "/category/**").hasAnyRole("MANAGER", "ADMIN")
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
