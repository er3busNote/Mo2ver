package com.mo2ver.web.domain.event.dto;

import com.mo2ver.web.domain.event.entity.EventImage;
import com.mo2ver.web.global.common.utils.JasyptUtil;
import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ImageInfo {

    private String base64Image;
    private String goodsImageAttachFile;
    private Character basicImageYesNo;

    public static String from(Integer goodsImageAttachFile) {
        return JasyptUtil.getEncryptor(goodsImageAttachFile);
    }

    public static ImageInfo of(EventImage eventImage) {
        return ImageInfo.builder()
                .goodsImageAttachFile(JasyptUtil.getEncryptor(eventImage.getGoodsImageAttachFile()))
                .basicImageYesNo(eventImage.getBasicImageYesNo())
                .build();
    }
}
