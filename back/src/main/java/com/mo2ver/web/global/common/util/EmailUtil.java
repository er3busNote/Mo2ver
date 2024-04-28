package com.mo2ver.web.global.common.util;

import com.mo2ver.web.global.common.dto.EmailDto;
import lombok.extern.slf4j.Slf4j;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Component;

import javax.mail.internet.MimeMessage;
import java.io.StringWriter;
import java.util.Map;

@Slf4j
@Component
public class EmailUtil {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private VelocityEngine velocityEngine;

    public void sendEmail(EmailDto emailDto) {
        // Mime Message 생성
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            // 메일 메시지 정보 입력
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(emailDto.getTo());
            helper.setSubject(emailDto.getSubject());

            Template template = velocityEngine.getTemplate("templates/" + emailDto.getTemplateName(), "UTF-8");
            VelocityContext velocityContext = new VelocityContext();
            velocityContext.put("emailInfo", emailDto.getInfo());

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
