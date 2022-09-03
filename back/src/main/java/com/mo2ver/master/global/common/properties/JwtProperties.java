package com.mo2ver.master.global.common.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotEmpty;

@Component
@ConfigurationProperties(prefix = "jwt-setting")
@Getter @Setter
public class JwtProperties {

    @NotEmpty
    private String jwtSecret;

    @NotEmpty
    private long jwtAccesstokenValidationSecond;

    @NotEmpty
    private long jwtRefreshtokenValidationSecond;
}
