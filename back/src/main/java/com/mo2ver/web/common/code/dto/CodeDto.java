package com.mo2ver.web.common.code.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CodeDto {

    private String commonCode;
    private String commonCodeName;
    private String description;
    private Integer sortSequence;
}
