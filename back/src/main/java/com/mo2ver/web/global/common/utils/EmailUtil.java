package com.mo2ver.web.global.common.utils;

import com.mo2ver.web.global.common.dto.EmailInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Component;

import java.io.StringWriter;

@Slf4j
@Component
@RequiredArgsConstructor
public class EmailUtil {

    private final JavaMailSender emailSender;
    private final  VelocityEngine velocityEngine;

    public void sendEmail(EmailInfo emailInfo) {
        // Mime Message 생성
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            // 메일 메시지 정보 입력
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(emailInfo.getTo());
            helper.setSubject(emailInfo.getSubject());

            Template template = velocityEngine.getTemplate("templates/" + emailInfo.getTemplateName(), "UTF-8");
            VelocityContext velocityContext = new VelocityContext();
            velocityContext.put("emailInfo", emailInfo.getInfo());

            String emailContent = mergeTemplate(template, velocityContext);
            helper.setText(emailContent, true);
        };

        // 메일 전송
        try {
            emailSender.send(messagePreparator);
        } catch (MailException e) {
            log.error(e.getMessage());
        }
    }

    private String mergeTemplate(Template template, VelocityContext velocityContext) {
        StringWriter stringWriter = new StringWriter();
        template.merge(velocityContext, stringWriter);
        return stringWriter.toString();
    }
}
