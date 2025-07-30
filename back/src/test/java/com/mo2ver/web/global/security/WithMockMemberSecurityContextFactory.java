package com.mo2ver.web.global.security;

import com.mo2ver.web.domain.member.entity.Member;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

public class WithMockMemberSecurityContextFactory implements WithSecurityContextFactory<WithMockMember> {

    @Override
    public SecurityContext createSecurityContext(WithMockMember annotation) {

        String memberNo = annotation.memberNo();
        String loginId = annotation.loginId();
        String role = annotation.role();

        Member member = MemberTestFactory.createMember(memberNo, loginId);

        Authentication authentication = new TestingAuthenticationToken(member, null, role);
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);
        return context;
    }
}
