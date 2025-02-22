package com.mo2ver.web.domain.display.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class BannerImageDetailInfo {

    private Long id;
    private String title;
    private String cnntUrl;
    private Integer file;
    private Character useyn;
}
