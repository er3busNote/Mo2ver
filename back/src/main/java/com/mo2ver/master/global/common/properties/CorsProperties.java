package com.mo2ver.master.global.common.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotEmpty;

@Component
@ConfigurationProperties(prefix = "cors-setting")
@Getter @Setter
public class CorsProperties {

    @NotEmpty
    private String urlClient;

    @NotEmpty
    private String urlServer;
}
