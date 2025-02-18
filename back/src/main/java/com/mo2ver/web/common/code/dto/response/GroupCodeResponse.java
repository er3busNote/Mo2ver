package com.mo2ver.web.common.code.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GroupCodeResponse {

    private String commonGroupCode;
    private String commonCodeGroupName;
    private List<CodeResponse> commonCodeList;
}
