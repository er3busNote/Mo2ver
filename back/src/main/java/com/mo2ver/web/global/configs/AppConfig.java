package com.mo2ver.web.global.configs;

import com.mo2ver.web.domain.member.service.MemberService;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.member.entity.MemberRole;
import com.mo2ver.web.global.common.properties.AppProperties;
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

    @Profile("development")    // → 개발환경(development)
    @Bean
    public ApplicationRunner applicationRunner() {
        return new ApplicationRunner() {

            @Autowired
            MemberService memberService;

            @Autowired
            AppProperties appProperties;

            @Override
            public void run(ApplicationArguments args) throws Exception {
                Member admin = Member.builder()
                        .loginId(appProperties.getAdminLoginId())
                        .memberName("ER3BUS")
                        .password(appProperties.getAdminPassword())
                        .cellPhoneNumber("010XXXXXXXX")
                        .email(appProperties.getAdminEmail())
                        .roles(Stream.of(MemberRole.ADMIN, MemberRole.MANAGER).collect(collectingAndThen(toSet(), Collections::unmodifiableSet)))
                        .build();
                memberService.saveAuth(admin);

                Member user = Member.builder()
                        .loginId(appProperties.getUserLoginId())
                        .memberName("ER3BUS")
                        .password(appProperties.getUserPassword())
                        .cellPhoneNumber("010XXXXXXXX")
                        .email(appProperties.getUserEmail())
                        .roles(Stream.of(MemberRole.USER).collect(collectingAndThen(toSet(), Collections::unmodifiableSet)))
                        .build();
                memberService.saveAuth(user);
            }
        };
    }
}
