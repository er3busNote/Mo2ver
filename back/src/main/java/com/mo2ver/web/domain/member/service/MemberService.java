package com.mo2ver.web.domain.member.service;

import com.mo2ver.web.domain.member.dto.response.MemberResponse;
import com.mo2ver.web.domain.member.repository.MemberRepository;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.member.dto.request.SignupRequest;
import com.mo2ver.web.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public void saveAuth(Member member) {
        member.setPassword(this.passwordEncoder.encode(member.getPassword()));
        this.memberRepository.save(member);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member member = memberRepository.findByLoginId(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
        return new MemberAdapter(member);
    }

    @Transactional
    public MemberResponse findMember(Member currentUser) {
        Member member = this.findMemberById(currentUser.getMemberNo());
        return MemberResponse.of(member);
    }

    @Transactional
    public void signup(SignupRequest signupRequest) {
        Member newMember = Member.of(signupRequest);
        this.saveAuth(newMember);
    }

    private Member findMemberById(String memberNo) {
        return this.memberRepository.findById(memberNo)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 회원번호 입니다."));
    }

    public Member memberNoForUpdate() {
        return memberRepository.findFirstByOrderByMemberNoDesc();
    }
}
