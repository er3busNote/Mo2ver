package com.mo2ver.web.domain.event.dto;

import com.mo2ver.web.domain.event.entity.EventImage;
import com.mo2ver.web.global.common.utils.BeanUtil;
import com.mo2ver.web.global.common.utils.JasyptUtil;
import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ImageInfo {

    private String base64Image;
    private Integer goodsImageAttachFile;
    private Character basicImageYesNo;

    private static String getEncryptor(Integer id) {
        JasyptUtil jasyptUtil = BeanUtil.getBean(JasyptUtil.class);
        return jasyptUtil.encrypt(String.valueOf(id));
    }

    public static String from(ImageInfo imageInfo) {
        return getEncryptor(imageInfo.getGoodsImageAttachFile());
    }

    public static ImageInfo of(EventImage eventImage) {
        return ImageInfo.builder()
                .goodsImageAttachFile(eventImage.getGoodsImageAttachFile())
                .basicImageYesNo(eventImage.getBasicImageYesNo())
                .build();
    }
}
