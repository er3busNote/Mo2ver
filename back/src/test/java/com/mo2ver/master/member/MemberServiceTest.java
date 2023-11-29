package com.mo2ver.master.member;

import com.mo2ver.master.domain.member.domain.Member;
import com.mo2ver.master.domain.member.dto.SignupDto;
import com.mo2ver.master.domain.member.service.MemberService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@ActiveProfiles("test")
public class MemberServiceTest {

    @Autowired
    MemberService memberService;

    @Test
    @DisplayName("회원가입 등록 확인")
    public void signupTest() throws Exception {
        // Given (준비)
        int numOfExecute = 10;

        // When (실행)
        for (int i = 0; i < numOfExecute ; i++) {
            SignupDto signUpDto = SignupDto.builder()
                    .username("test" + Integer.toString(i+1))
                    .password("test" + Integer.toString(i+1))
                    .email("test" + Integer.toString(i+1) + "@test.com")
                    .build();
            this.memberService.signup(signUpDto);
        }

        // Then (검증)
        Member memberNo = this.memberService.memberNoForUpdate();
        assertThat(memberNo.getMemberNo()).isEqualTo("M000000012");
    }
}
