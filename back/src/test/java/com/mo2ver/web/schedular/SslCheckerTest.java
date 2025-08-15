package com.mo2ver.web.schedular;

import com.mo2ver.web.schedular.service.SslCertificateService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
public class SslCheckerTest {

    @Autowired
    protected SslCertificateService sslCertificateService;

    @Test
    @DisplayName("인증서 만료 확인")
    public void checkCertificateTest() throws Exception {
        this.sslCertificateService.checkCertificate();
    }
}
