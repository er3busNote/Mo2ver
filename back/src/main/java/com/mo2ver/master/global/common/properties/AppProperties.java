package com.mo2ver.master.global.common.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotEmpty;

@Component
@ConfigurationProperties(prefix = "init-member")
@Getter @Setter
public class AppProperties {

    @NotEmpty
    private String adminLoginId;

    @NotEmpty
    private String adminPassword;

    @NotEmpty
    private String adminEmail;

    @NotEmpty
    private String userLoginId;

    @NotEmpty
    private String userPassword;

    @NotEmpty
    private String userEmail;
}
