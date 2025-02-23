package com.mo2ver.web.domain.display.dto;

import com.mo2ver.web.global.common.util.BeanUtil;
import com.mo2ver.web.global.common.util.JasyptUtil;
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

    private static String getEncryptor(Integer id) {
        JasyptUtil jasyptUtil = BeanUtil.getBean(JasyptUtil.class);
        return jasyptUtil.encrypt(String.valueOf(id));
    }

    public BannerImageDetailInfo(Long id, String title, String cnntUrl, Integer attachFile, Character useyn) {
        this.id = id;
        this.title = title;
        this.cnntUrl = cnntUrl;
        this.file = getEncryptor(attachFile);
        this.useyn = useyn;
    }
}
