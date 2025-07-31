package com.mo2ver.web.global.security;

import com.mo2ver.web.domain.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

import java.util.Collection;

public class WithMockMemberSecurityContextFactory implements WithSecurityContextFactory<WithMockMember> {

    @Autowired
    protected MemberService memberService;

    @Override
    public SecurityContext createSecurityContext(WithMockMember annotation) {

        UserDetailsService userDetailsService = (UserDetailsService) memberService;
        UserDetails userDetails = userDetailsService.loadUserByUsername(annotation.loginId());

        Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();

        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, userDetails.getPassword(), authorities);

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);

        return context;
    }
}
