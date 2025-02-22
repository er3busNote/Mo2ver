package com.mo2ver.web.global.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class EmailDetailInfo {

    private String title;

    private String username;
}
