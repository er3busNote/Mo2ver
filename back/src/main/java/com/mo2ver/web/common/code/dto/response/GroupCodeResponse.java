package com.mo2ver.web.common.code.dto.response;

import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class GroupCodeResponse {

    private String commonGroupCode;
    private String commonCodeGroupName;
    private List<CodeResponse> commonCodeList;
}
