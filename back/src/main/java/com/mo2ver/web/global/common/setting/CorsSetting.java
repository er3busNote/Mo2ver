package com.mo2ver.web.global.common.setting;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotEmpty;

@Component
@ConfigurationProperties(prefix = "cors-setting")
@Getter @Setter
public class CorsSetting {

    @NotEmpty
    private String urlClient;
}
