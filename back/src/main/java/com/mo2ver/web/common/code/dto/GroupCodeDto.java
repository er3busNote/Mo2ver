package com.mo2ver.web.common.code.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GroupCodeDto {

    private String commonGroupCode;
    private String commonCodeGroupName;
    private List<CodeDto> commonCodeList;
}
