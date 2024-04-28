package com.mo2ver.web.email;

import com.mo2ver.web.global.common.dto.EmailDto;
import com.mo2ver.web.global.common.dto.EmailInfoDto;
import com.mo2ver.web.global.common.util.EmailUtil;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@Slf4j
@ExtendWith(SpringExtension.class)
@SpringBootTest
@ActiveProfiles("test")
public class EmailTest {

    @Autowired
    protected EmailUtil emailUtil;

    @Test
    @DisplayName("이메일 수신 여부 확인")
    public void sendEmail() throws Exception {
        emailUtil.sendEmail(getEmailDto());
    }

    private EmailDto getEmailDto() {
        return EmailDto.builder()
                .to("mo2vermail@gmail.com")
                .subject("테스트")
                .templateName("email-sample.vm")
                .info(new EmailInfoDto("배병주", "ByeongJu"))
                .build();
    }
}
