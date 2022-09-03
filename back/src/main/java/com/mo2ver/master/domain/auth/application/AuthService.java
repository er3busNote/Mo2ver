package com.mo2ver.master.domain.auth.application;

import com.mo2ver.master.domain.auth.dao.AuthRepository;
import com.mo2ver.master.domain.auth.domain.Auth;
import com.mo2ver.master.domain.auth.domain.AuthRole;
import com.mo2ver.master.domain.auth.dto.SignupDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import java.util.Collections;
import java.util.stream.Stream;

import static java.util.stream.Collectors.collectingAndThen;
import static java.util.stream.Collectors.toSet;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    AuthRepository authRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public Auth saveAuth(Auth auth) {
        auth.setPassword(this.passwordEncoder.encode(auth.getPassword()));
        return this.authRepository.save(auth);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Auth auth = authRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
        return new AuthAdapter(auth);
    }

    @Transactional
    public void signup(SignupDto signupDto) {

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String ipaddress = request.getHeader("X-FORWARDED-FOR");
        if (ipaddress == null) ipaddress = request.getRemoteAddr();

        Auth auth = Auth.builder()
                .username(signupDto.getUsername())
                .password(signupDto.getPassword())
                .email(signupDto.getEmail())
                .address(ipaddress)
                .roles(Stream.of(AuthRole.USER).collect(collectingAndThen(toSet(), Collections::unmodifiableSet)))    // 참고 : https://blog.kingbbode.com/41
                .build();

        this.saveAuth(auth);
    }
}
