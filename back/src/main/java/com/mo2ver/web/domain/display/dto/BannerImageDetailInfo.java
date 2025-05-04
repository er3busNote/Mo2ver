package com.mo2ver.web.domain.display.dto;

import com.mo2ver.web.global.common.utils.JasyptUtil;
import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class BannerImageDetailInfo {

    private Long id;
    private String title;
    private String cnntUrl;
    private String file;
    private Character useyn;

    public BannerImageDetailInfo(Long id, String title, String cnntUrl, Integer attachFile, Character useyn) {
        this.id = id;
        this.title = title;
        this.cnntUrl = cnntUrl;
        this.file = JasyptUtil.getEncryptor(attachFile);
        this.useyn = useyn;
    }
}
