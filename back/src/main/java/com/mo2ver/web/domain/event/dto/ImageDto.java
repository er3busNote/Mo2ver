package com.mo2ver.web.domain.event.dto;

import com.mo2ver.web.domain.event.domain.EventImage;
import com.mo2ver.web.domain.goods.domain.GoodsImage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageDto {

    private String base64Image;

    private Integer goodsImageAttachFile;

    private String goodsImageExtension;

    private Character basicImageYesNo;

    public static ImageDto toDTO(EventImage eventImage) {
        return ImageDto.builder()
                .goodsImageAttachFile(eventImage.getGoodsImageAttachFile())
                .goodsImageExtension(eventImage.getGoodsImageExtension())
                .basicImageYesNo(eventImage.getBasicImageYesNo())
                .build();
    }
}
