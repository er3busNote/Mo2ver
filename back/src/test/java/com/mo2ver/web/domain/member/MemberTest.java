package com.mo2ver.web.domain.member;

import com.mo2ver.web.global.auth.CsrfConfigTest;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.member.dto.request.SignupRequest;
import com.mo2ver.web.domain.member.service.MemberService;
import com.mo2ver.web.global.jwt.dto.TokenInfo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class MemberTest extends CsrfConfigTest {

    @Autowired
    protected MemberService memberService;

    @Test
    @DisplayName("회원 상세 정보 확인")
    public void findMemberInfoTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        mockMvc.perform(get("/member/info")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("회원가입 등록 확인")
    public void signupTest() throws Exception {
        // Given (준비)
        int start = 5;   // 시작 번호
        int end = 15;    // 마지막 번호

        List<Integer> numbers = IntStream.rangeClosed(start, end)
                .boxed()   // int → Integer 변환
                .collect(Collectors.toList());

        // When (실행)
        for (Integer num : numbers) {
            SignupRequest signupRequest = this.getSignupRequest(num);
            if(nonSignupUser(signupRequest)) {
                this.memberService.signup(signupRequest);
            }
        }

        // Then (검증)
        Member memberNo = this.memberService.memberNoForUpdate();
        assertThat(memberNo.getMemberNo()).isEqualTo("MB00000011");
    }

    private boolean nonSignupUser(SignupRequest signupRequest) {
        UserDetailsService userDetailsService = (UserDetailsService) memberService;
        try {
            userDetailsService.loadUserByUsername(signupRequest.getUsername());
        } catch (UsernameNotFoundException e) {
            return true;
        }
        return false;
    }

    private SignupRequest getSignupRequest(int num) {
        return SignupRequest.builder()
                .username("test" + (num+1))
                .password("test" + (num+1))
                .email("test" + (num+1) + "@test.com")
                .build();
    }
}
