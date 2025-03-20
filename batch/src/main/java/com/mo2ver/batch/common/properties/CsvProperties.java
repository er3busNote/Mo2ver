package com.mo2ver.batch.common.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotEmpty;

@Component
@ConfigurationProperties(prefix = "csv-setting")
@Getter @Setter
public class CsvProperties {

    @NotEmpty
    private String filepath;
}
