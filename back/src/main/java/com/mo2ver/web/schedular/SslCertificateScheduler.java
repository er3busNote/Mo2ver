package com.mo2ver.web.schedular;

import com.mo2ver.web.schedular.service.SslCertificateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class SslCertificateScheduler {

    private final SslCertificateService sslCertificateService;

    /**
     * 매일 오전 9시 실행
     */
    @Scheduled(cron = "0 0 9 * * *")
    public void runDailyCheck() {
        log.info("SSL 인증서 체크 스케줄러 시작");
        sslCertificateService.checkCertificate();
    }
}
