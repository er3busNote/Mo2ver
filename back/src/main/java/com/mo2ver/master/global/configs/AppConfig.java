package com.mo2ver.master.global.configs;

import com.mo2ver.master.domain.auth.application.AuthService;
import com.mo2ver.master.domain.auth.domain.Auth;
import com.mo2ver.master.domain.auth.domain.AuthRole;
import com.mo2ver.master.global.common.properties.AppProperties;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.stream.Stream;

import static java.util.stream.Collectors.collectingAndThen;
import static java.util.stream.Collectors.toSet;

@Configuration
public class AppConfig {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Profile("development")
    @Bean
    public ApplicationRunner applicationRunner() {
        return new ApplicationRunner() {

            @Autowired
            AuthService authService;

            @Autowired
            AppProperties appProperties;

            @Override
            public void run(ApplicationArguments args) throws Exception {
                Auth admin = Auth.builder()
                        .username(appProperties.getAdminUsername())
                        .password(appProperties.getAdminPassword())
                        .email(appProperties.getAdminEmail())
                        .address(appProperties.getLocalAddress())
                        .roles(Stream.of(AuthRole.ADMIN, AuthRole.MANAGER).collect(collectingAndThen(toSet(), Collections::unmodifiableSet)))    // 참고 : https://blog.kingbbode.com/41
                        //.createdAt(LocalDateTime.now())
                        .build();
                authService.saveAuth(admin);

                Auth user = Auth.builder()
                        .username(appProperties.getUserUsername())
                        .password(appProperties.getUserPassword())
                        .email(appProperties.getUserEmail())
                        .address(appProperties.getLocalAddress())
                        .roles(Stream.of(AuthRole.USER).collect(collectingAndThen(toSet(), Collections::unmodifiableSet)))    // 참고 : https://blog.kingbbode.com/41
                        //.createdAt(LocalDateTime.now())
                        .build();
                authService.saveAuth(user);
            }
        };
    }
}
