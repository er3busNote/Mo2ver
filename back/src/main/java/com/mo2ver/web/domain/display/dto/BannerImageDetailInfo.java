package com.mo2ver.web.domain.display.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BannerImageDetailInfo {

    private Long id;
    private String title;
    private String cnntUrl;
    private Integer file;
    private Character useyn;
}
