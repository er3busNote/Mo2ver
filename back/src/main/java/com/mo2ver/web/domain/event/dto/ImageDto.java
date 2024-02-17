package com.mo2ver.web.domain.event.dto;

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
}
