package com.mo2ver.web.domain.event.dto;

import com.mo2ver.web.domain.event.entity.EventImage;
import com.mo2ver.web.global.common.utils.JasyptUtil;
import lombok.*;

import java.util.Optional;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ImageInfo {

    private String base64Image;
    private String goodsImageAttachFile;
    private Character basicImageYesNo;

    public ImageInfo(String base64Image, Integer goodsImageAttachFile, Character basicImageYesNo) {
        this.base64Image = base64Image;
        this.goodsImageAttachFile = String.valueOf(Optional.ofNullable(goodsImageAttachFile).orElse(0));
        this.basicImageYesNo = basicImageYesNo;
    }

    public static String from(ImageInfo imageInfo) {
        return JasyptUtil.getEncryptor(Integer.valueOf(imageInfo.getGoodsImageAttachFile()));
    }

    public static ImageInfo of(EventImage eventImage) {
        return ImageInfo.builder()
                .goodsImageAttachFile(JasyptUtil.getEncryptor(eventImage.getGoodsImageAttachFile()))
                .basicImageYesNo(eventImage.getBasicImageYesNo())
                .build();
    }
}
