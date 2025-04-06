package com.mo2ver.batch.domain.goods.dto;

import com.mo2ver.batch.domain.goods.entity.Goods;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageDto {

    private Goods goodsCode;

    private Integer goodsImageAttachFile;

    private String goodsImageExtension;

    private Character basicImageYesNo;

    private Integer sortSequence;

    private Character useYesNo;

    private String register;

    private String updater;

    public static ImageDto of(Goods goods) {
        Integer filepath = Integer.parseInt(goods.getGoodsCode()) - 1000000000;
        return ImageDto.builder()
                .goodsCode(goods)
                .goodsImageAttachFile(filepath)
                .goodsImageExtension("jpg")
                .basicImageYesNo('Y')
                .sortSequence(1)
                .useYesNo('Y')
                .register("SYSTEM")
                .updater("SYSTEM")
                .build();
    }
}
