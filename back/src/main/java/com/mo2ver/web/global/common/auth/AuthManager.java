package com.mo2ver.web.global.common.auth;

import com.mo2ver.web.domain.member.entity.MemberRole;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Component
public class AuthManager {

    public static boolean isUser(Set<MemberRole> roles) {
        return Collections.disjoint(roles, new HashSet<>(Arrays.asList(MemberRole.MANAGER, MemberRole.ADMIN)));
    }

    public static boolean isManager(Set<MemberRole> roles) {
        return roles.stream().anyMatch(role -> role == MemberRole.MANAGER || role == MemberRole.ADMIN);
    }
}
