package com.mo2ver.web.domain.member.service;

import com.mo2ver.web.domain.member.dao.MemberRepository;
import com.mo2ver.web.domain.member.domain.Member;
import com.mo2ver.web.domain.member.domain.MemberRole;
import com.mo2ver.web.domain.member.dto.request.SignupRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.util.Collections;
import java.util.stream.Stream;

import static java.util.stream.Collectors.collectingAndThen;
import static java.util.stream.Collectors.toSet;

@Service
@RequiredArgsConstructor
public class MemberService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public Member saveAuth(Member member) {
        member.setPassword(this.passwordEncoder.encode(member.getPassword()));
        return this.memberRepository.save(member);
    }

    public Member memberNoForUpdate() {
        return memberRepository.findFirstByOrderByMemberNoDesc();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member member = memberRepository.findByLoginId(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
        return new MemberAdapter(member);
    }

    @Transactional
    public void signup(SignupRequest signupRequest) {
        Member newMember = Member.builder()
                .loginId(signupRequest.getUsername())
                .memberName("ANONYMOUS")
                .password(signupRequest.getPassword())
                .cellPhoneNumber("010XXXXXXXX")
                .email(signupRequest.getEmail())
                .roles(Stream.of(MemberRole.USER).collect(collectingAndThen(toSet(), Collections::unmodifiableSet)))
                .build();
        this.saveAuth(newMember);
    }
}
