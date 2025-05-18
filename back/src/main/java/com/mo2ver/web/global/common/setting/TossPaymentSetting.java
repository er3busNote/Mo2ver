package com.mo2ver.web.global.common.setting;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotEmpty;

@Component
@ConfigurationProperties(prefix = "toss-payment")
@Getter @Setter
public class TossPaymentSetting {

    @NotEmpty
    private String urlPath;

    @NotEmpty
    private String clientKey;

    @NotEmpty
    private String secretKey;
}
