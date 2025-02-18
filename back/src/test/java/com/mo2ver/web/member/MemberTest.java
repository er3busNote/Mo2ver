package com.mo2ver.web.member;

import com.mo2ver.web.domain.member.domain.Member;
import com.mo2ver.web.domain.member.dto.request.SignupRequest;
import com.mo2ver.web.domain.member.service.MemberService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@ActiveProfiles("test")
public class MemberTest {

    @Autowired
    private MemberService memberService;

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
