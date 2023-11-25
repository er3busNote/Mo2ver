package com.mo2ver.master.domain.auth.service;

import com.mo2ver.master.domain.auth.domain.Auth;
import com.mo2ver.master.domain.auth.domain.AuthRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

public class AuthAdapter extends User {

    private Auth auth;

    public AuthAdapter(Auth auth) {
        super(auth.getEmail(), auth.getPassword(), authorities(auth.getRoles()));
        this.auth = auth;
    }

    private static Collection<? extends GrantedAuthority> authorities(Set<AuthRole> roles) {
        return roles.stream()
                .map(r -> new SimpleGrantedAuthority("ROLE_" + r.name()))
                .collect(Collectors.toSet());
    }

    public Auth getAuth() {
        return auth;
    }
}
