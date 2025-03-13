package com.mo2ver.web.global.common.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmailDetailInfo {

    private String title;

    private String username;
}
