package com.mo2ver.web.global.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class EmailInfo {

    private String to;

    private String subject;

    private String templateName;

    private EmailDetailInfo info;
}
