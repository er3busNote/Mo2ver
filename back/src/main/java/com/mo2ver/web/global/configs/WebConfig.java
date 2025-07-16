package com.mo2ver.web.global.configs;

import com.mo2ver.web.common.menu.converter.MenuTypeConverter;
import com.mo2ver.web.domain.coupon.converter.CouponTypeConverter;
import com.mo2ver.web.domain.goods.converter.CategoryTypeConverter;
import com.mo2ver.web.global.common.setting.CorsSetting;
import com.mo2ver.web.global.common.setting.ImagesSetting;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.Context;
import org.apache.catalina.connector.Connector;
import org.apache.tomcat.util.descriptor.web.SecurityCollection;
import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.filter.CommonsRequestLoggingFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
@RequiredArgsConstructor
@EnableWebMvc // Spring Boot의 자동 구성을 비활성화 ( → 수동 설정)
public class WebConfig implements WebMvcConfigurer {

    public static final String ALLOWED_METHOD_NAMES = "GET,HEAD,POST,PUT,DELETE,TRACE,OPTIONS,PATCH";

    private final CorsSetting corsSetting;
    private final ImagesSetting imagesSetting;
    private final Environment environment;

    @Override
    public void addCorsMappings(final CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(corsSetting.getUrlClient())
                .allowedMethods(ALLOWED_METHOD_NAMES.split(","))
                .allowedHeaders("*")
                //.exposedHeaders("Set-Cookie")
                .allowCredentials(true)
                .maxAge(3600);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:" + imagesSetting.getFilepath() + "/")
                .setCachePeriod(60 * 60 * 24 * 365);
    }
    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new MenuTypeConverter());
        registry.addConverter(new CategoryTypeConverter());
        registry.addConverter(new CouponTypeConverter());
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
                if (Arrays.asList(environment.getActiveProfiles()).contains("production") && isSSLApplied(context)) {    // SSL이 적용되었는지 확인
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
