package com.mo2ver.master.global.configs;

import com.mo2ver.master.global.common.properties.CorsProperties;
import org.apache.catalina.Context;
import org.apache.catalina.connector.Connector;
import org.apache.tomcat.util.descriptor.web.SecurityCollection;
import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.CommonsRequestLoggingFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;


@Configuration
@EnableWebMvc // Spring Boot의 자동 구성을 비활성화 ( → 수동 설정)
public class WebConfig implements WebMvcConfigurer {

    public static final String ALLOWED_METHOD_NAMES = "GET,HEAD,POST,PUT,DELETE,TRACE,OPTIONS,PATCH";

    @Autowired
    CorsProperties corsProperties;

    @Override
    public void addCorsMappings(final CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(corsProperties.getUrlClient())
                .allowedMethods(ALLOWED_METHOD_NAMES.split(","))
                .allowedHeaders("*")
                //.exposedHeaders("Set-Cookie")
                .allowCredentials(true)
                .maxAge(3600);
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

    @Bean
    public ServletWebServerFactory serverFactory() {
        TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory() {
            @Override
            protected void postProcessContext(Context context) {    // HTTP → HTTPS Rewrite
                if (isSSLApplied(context)) {    // SSL이 적용되었는지 확인
                    SecurityConstraint securityConstraint = new SecurityConstraint();
                    securityConstraint.setUserConstraint("CONFIDENTIAL");
                    SecurityCollection collection = new SecurityCollection();
                    collection.addPattern("/*");
                    securityConstraint.addCollection(collection);
                    context.addConstraint(securityConstraint);
                }
            }
        };
        tomcat.addAdditionalTomcatConnectors(createSslConnector());
        return tomcat;
    }

    private boolean isSSLApplied(Context context) {
        SecurityConstraint[] constraints = context.findConstraints();
        return constraints != null && Arrays.stream(constraints)
                .anyMatch(constraint -> "CONFIDENTIAL".equals(constraint.getUserConstraint()));
    }

    private Connector createSslConnector() {    // HTTP/1.1 Connector
        Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
        connector.setScheme("http");
        connector.setSecure(false);
        connector.setPort(80);
        connector.setRedirectPort(443);
        return connector;
    }
}
