package com.mo2ver.master.global.configs;

import com.mo2ver.master.global.common.properties.CorsProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.CommonsRequestLoggingFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    public static final String ALLOWED_METHOD_NAMES = "GET,HEAD,POST,PUT,DELETE,TRACE,OPTIONS,PATCH";

    @Autowired
    CorsProperties corsProperties;

    @Override
    public void addCorsMappings(final CorsRegistry registry) {
        registry.addMapping("/**")
                //.allowedOrigins(corsProperties.getUrlClient())
                .allowedOrigins("*")
                .allowedMethods(ALLOWED_METHOD_NAMES.split(","))
                .allowedHeaders("*")
                //.exposedHeaders("Set-Cookie")
                .allowCredentials(true);
    }

    @Bean
    public CommonsRequestLoggingFilter commonsRequestLoggingFilter() {
        CommonsRequestLoggingFilter filter = new CommonsRequestLoggingFilter();
        filter.setIncludeClientInfo(true); //클라이언트 주소와 세션 ID를 로그에 출력
        filter.setIncludeHeaders(true); //헤더정보를 로그에 출력
        filter.setIncludeQueryString(true); //queryString을 로그에 출력
        filter.setIncludePayload(true); //body request 내용을 로그에 출력
        filter.setMaxPayloadLength(1000);	//로그에 포함할 body request 사이즈 제한
        return filter;
    }
}
