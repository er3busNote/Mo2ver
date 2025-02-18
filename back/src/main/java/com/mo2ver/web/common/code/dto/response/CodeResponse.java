package com.mo2ver.web.common.code.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CodeResponse {

    private String commonCode;
    private String commonCodeName;
    private String description;
    private Integer sortSequence;
}
