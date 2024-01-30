package com.mo2ver.web.global.common.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotEmpty;

@Component
@ConfigurationProperties(prefix = "images-setting")
@Getter @Setter
public class ImagesProperties {

    @NotEmpty
    private String filepath;
}
