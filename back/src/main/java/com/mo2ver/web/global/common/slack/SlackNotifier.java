package com.mo2ver.web.global.common.slack;

import com.mo2ver.web.global.common.setting.SentrySetting;
import com.mo2ver.web.global.common.setting.SlackSetting;
import com.mo2ver.web.global.error.dto.response.ErrorHandler;
import com.slack.api.Slack;
import com.slack.api.model.block.HeaderBlock;
import com.slack.api.model.block.SectionBlock;
import com.slack.api.model.block.composition.MarkdownTextObject;
import com.slack.api.model.block.composition.PlainTextObject;
import com.slack.api.model.block.element.ButtonElement;
import com.slack.api.webhook.Payload;
import com.slack.api.webhook.WebhookResponse;
import io.sentry.protocol.SentryId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
@Slf4j
public class SlackNotifier {

    private final Slack slack = Slack.getInstance();
    private static Slack staticSlack;

    private final SlackSetting slackSetting;
    private final SentrySetting sentrySetting;
    private static String webHookUrl;
    private static String environment;
    private static String issueBaseUrl;

    @PostConstruct
    public void init() {
        staticSlack = slack;
        webHookUrl = slackSetting.getUrl();
        environment = sentrySetting.getEnvironment();
        issueBaseUrl = sentrySetting.getIssueBaseUrl();
    }

    public static void sendCertificateAlert(LocalDate expireDate, long daysRemaining, String certificatePath) {
        HeaderBlock headerBlock = HeaderBlock.builder()
                .text(PlainTextObject.builder()
                        .text("🔒 SSL 인증서 만료 경고")
                        .build())
                .build();

        SectionBlock messageSectionBlock = SectionBlock.builder()
                .text(MarkdownTextObject.builder()
                        .text(String.format(
                                "[SSL 인증서 만료 체크]\n- 만료일: %s\n- 남은 기간: %d일\n- 파일: %s",
                                expireDate, daysRemaining, certificatePath
                        ))
                        .build())
                .build();

        Payload payload = Payload.builder()
                .blocks(Arrays.asList(headerBlock, messageSectionBlock))
                .build();

        send(payload);
    }

    public static void sendErrorAlert(Exception exception, SentryId sentryId) {
        HeaderBlock headerBlock = HeaderBlock.builder()
                .text(PlainTextObject.builder()
                        .text("🚨 " + ErrorHandler.getExceptionClassName(exception) + " 감지")
                        .build())
                .build();

        SectionBlock messageSectionBlock = SectionBlock.builder()
                .text(MarkdownTextObject.builder()
                        .text("*Environment:* " + environment
                                + "\n*Message:* " + exception.getMessage()
                                + "\n*Sentry Issue ID:* " + sentryId + "\n")
                        .build())
                .build();

        SectionBlock linkButtonSectionBlock = SectionBlock.builder()
                .text(MarkdownTextObject.builder()
                        .text("*Sentry Issue* 보러가기 \uD83D\uDC49")
                        .build())
                .accessory(ButtonElement.builder()
                        .text(PlainTextObject.builder().text("Click 👀").build())
                        .value("sentry_issue")
                        .url(getSentryIssueUrl(sentryId))
                        .actionId("button-action")
                        .build())
                .build();

        Payload payload = Payload.builder()
                .blocks(Arrays.asList(headerBlock, messageSectionBlock, linkButtonSectionBlock))
                .build();

        send(payload);
    }

    private static void send(Payload payload) {
        try {
            WebhookResponse response = staticSlack.send(webHookUrl, payload);
            if (response.getCode() == 200) {
                log.info("Slack 알림 전송 성공");
            } else {
                log.warn("Slack 알림 전송 실패: HTTP {}, Body: {}", response.getCode(), response.getBody());
            }
        } catch (Exception e) {
            log.error("Slack 알림 전송 중 오류 발생", e);
        }
    }

    private static String getSentryIssueUrl(SentryId sentryId) {
        return issueBaseUrl + sentryId;
    }
}
