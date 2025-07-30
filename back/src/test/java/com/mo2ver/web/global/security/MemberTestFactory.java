package com.mo2ver.web.global.security;

import com.mo2ver.web.domain.member.entity.Member;

public class MemberTestFactory {

    public static Member createMember(String memberNo, String loginId) {
        return Member.builder()
                .memberNo(memberNo)
                .loginId(loginId)
                .build();
    }
}
