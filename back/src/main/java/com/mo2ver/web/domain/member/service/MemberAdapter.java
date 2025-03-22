package com.mo2ver.web.domain.member.service;

import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.member.entity.MemberRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

public class MemberAdapter extends User {

    public Member member;   // @CurrentUser의 @AuthenticationPrincipal에서, private로 하게 되면 member를 가져올 수 없음 → public으로 변경

    public MemberAdapter(Member member) {
        super(member.getLoginId(), member.getPassword(), authorities(member.getRoles()));
        this.member = member;
    }

    private static Collection<? extends GrantedAuthority> authorities(Set<MemberRole> roles) {
        return roles.stream()
                .map(r -> new SimpleGrantedAuthority("ROLE_" + r.name()))
                .collect(Collectors.toSet());
    }

    public Member getAuth() {
        return member;
    }
}
