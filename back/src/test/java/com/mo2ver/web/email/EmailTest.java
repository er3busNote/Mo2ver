package com.mo2ver.web.email;

import com.mo2ver.web.global.common.dto.EmailInfo;
import com.mo2ver.web.global.common.dto.EmailDetailInfo;
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
        emailUtil.sendEmail(getEmailInfo());
    }

    private EmailInfo getEmailInfo() {
        return EmailInfo.builder()
                .to("mo2vermail@gmail.com")
                .subject("테스트")
                .templateName("email-sample.vm")
                .info(EmailDetailInfo.builder()
                        .title("배병주")
                        .username("ByeongJu")
                        .build())
                .build();
    }
}
