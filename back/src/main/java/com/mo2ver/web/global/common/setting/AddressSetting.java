package com.mo2ver.web.global.common.setting;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotEmpty;

@Component
@ConfigurationProperties(prefix = "address-api")
@Getter @Setter
public class AddressSetting {

    @NotEmpty
    private String baseUrl;

    @NotEmpty
    private String confmKey;
}
