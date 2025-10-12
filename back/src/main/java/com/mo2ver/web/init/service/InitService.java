package com.mo2ver.web.init.service;

import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.member.service.MemberService;
import com.mo2ver.web.domain.member.type.MemberRole;
import com.mo2ver.web.global.common.setting.AppSetting;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.stream.Stream;

import static java.util.stream.Collectors.collectingAndThen;
import static java.util.stream.Collectors.toSet;

@Slf4j
@Service
@RequiredArgsConstructor
public class InitService {

    private final MemberService memberService;
    private final AppSetting appSetting;

    public void initMembers() {
        Member admin = Member.builder()
                .loginId(appSetting.getAdminLoginId())
                .memberName("ER3BUS")
                .password(appSetting.getAdminPassword())
                .cellPhoneNumber("010XXXXXXXX")
                .email(appSetting.getAdminEmail())
                .roles(Stream.of(MemberRole.ADMIN, MemberRole.MANAGER).collect(collectingAndThen(toSet(), Collections::unmodifiableSet)))
                .build();
        memberService.saveAuth(admin);

        Member user = Member.builder()
                .loginId(appSetting.getUserLoginId())
                .memberName("ER3BUS")
                .password(appSetting.getUserPassword())
                .cellPhoneNumber("010XXXXXXXX")
                .email(appSetting.getUserEmail())
                .roles(Stream.of(MemberRole.USER).collect(collectingAndThen(toSet(), Collections::unmodifiableSet)))
                .build();
        memberService.saveAuth(user);
    }
}
