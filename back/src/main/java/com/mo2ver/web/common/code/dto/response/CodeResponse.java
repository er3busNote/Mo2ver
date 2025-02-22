package com.mo2ver.web.common.code.dto.response;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class CodeResponse {

    private String commonCode;
    private String commonCodeName;
    private String description;
    private Integer sortSequence;
}
