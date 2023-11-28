package com.mo2ver.master.domain.member.service;

import com.mo2ver.master.domain.member.dao.MemberRepository;
import com.mo2ver.master.domain.member.domain.Member;
import com.mo2ver.master.domain.member.domain.MemberRole;
import com.mo2ver.master.domain.member.dto.SignupDto;
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
public class MemberService implements UserDetailsService {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public Member saveAuth(Member member) {
        member.setPassword(this.passwordEncoder.encode(member.getPassword()));
        return this.memberRepository.save(member);
    }

    public Member memberNoForUpdate() {
        return memberRepository.findFirstByOrderByMemberNoDesc();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member member = memberRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
        return new MemberAdapter(member);
    }

    @Transactional
    public void signup(SignupDto signupDto) {

        Member lastMember = this.memberNoForUpdate();
        String memberNo = 'M' + String.format("%09d", Integer.parseInt(lastMember.getMemberNo().substring(1)) + 1);

        Member newMember = Member.builder()
                .memberNo(memberNo)
                .loginId(signupDto.getUsername())
                .memberName("ANONYMOUS")
                .password(signupDto.getPassword())
                .cellPhoneNumber("010XXXXXXXX")
                .email(signupDto.getEmail())
                .roles(Stream.of(MemberRole.USER).collect(collectingAndThen(toSet(), Collections::unmodifiableSet)))
                .register(memberNo)
                .updater(memberNo)
                .build();

        this.saveAuth(newMember);
    }
}
