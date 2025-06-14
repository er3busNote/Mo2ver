package com.mo2ver.web.member;

import com.mo2ver.web.auth.CsrfConfigTest;
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
        int numOfExecute = 10;

        // When (실행)
        for (int i = 0; i < numOfExecute ; i++) {
            SignupRequest signUpRequest = SignupRequest.builder()
                    .username("test" + Integer.toString(i+1))
                    .password("test" + Integer.toString(i+1))
                    .email("test" + Integer.toString(i+1) + "@test.com")
                    .build();
            this.memberService.signup(signUpRequest);
        }

        // Then (검증)
        Member memberNo = this.memberService.memberNoForUpdate();
        assertThat(memberNo.getMemberNo()).isEqualTo("M000000013");
    }
}
