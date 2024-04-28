package com.mo2ver.web.global.configs;

import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.runtime.RuntimeConstants;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.ServletConfig;

@Configuration
public class VelocityConfig  implements WebMvcConfigurer {

    @Bean
    public VelocityEngine velocityEngine() {
        VelocityEngine velocityEngine = new VelocityEngine();
        velocityEngine.setProperty(RuntimeConstants.RESOURCE_LOADERS, "class");
        velocityEngine.setProperty("resource.loader.class.class", ClasspathResourceLoader.class.getName());
        return velocityEngine;
    }

    @Bean
    public ViewResolver viewResolver(final VelocityEngine velocityEngine, final ServletConfig servletConfig) {
        VelocityViewResolver viewResolver = new VelocityViewResolver(velocityEngine, servletConfig);
        viewResolver.setCache(true);
        viewResolver.setPrefix("/templates/");
        viewResolver.setSuffix(".vm");
        viewResolver.setContentType("text/html;charset=UTF-8");
        return viewResolver;
    }
}
