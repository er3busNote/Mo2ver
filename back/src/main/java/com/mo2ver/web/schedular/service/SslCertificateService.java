package com.mo2ver.web.schedular.service;

import com.mo2ver.web.global.common.slack.SlackNotifier;
import com.mo2ver.web.global.common.utils.DateUtil;
import com.mo2ver.web.global.common.utils.FileUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.time.LocalDate;

@Service
@Slf4j
public class SslCertificateService {

    @Value("${server.ssl.certificate}")
    private String certificatePath;

    public void checkCertificate() {
        try {
            if (!FileUtil.isExistFile(certificatePath)) {
                log.error("SSL 인증서 파일을 찾을 수 없습니다: {}", certificatePath);
                return;
            }

            X509Certificate cert = loadCertificate(certificatePath);
            LocalDate expireDate = DateUtil.toLocalDate(cert.getNotAfter());

            long daysRemaining = DateUtil.daysBetween(expireDate);

            if (daysRemaining <= 30) {
                SlackNotifier.sendCertificateAlert(expireDate, daysRemaining, certificatePath);
            }

            SlackNotifier.sendCertificateAlert(expireDate, daysRemaining, certificatePath);

        } catch (Exception e) {
            log.error("SSL 인증서 유효기간 체크 실패", e);
        }
    }

    private X509Certificate loadCertificate(String path) throws Exception {
        try (FileInputStream fis = new FileInputStream(path)) {
            CertificateFactory cf = CertificateFactory.getInstance("X.509");
            return (X509Certificate) cf.generateCertificate(fis);
        }
    }
}
