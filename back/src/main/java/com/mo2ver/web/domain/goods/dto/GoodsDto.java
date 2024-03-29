package com.mo2ver.web.domain.goods.dto;

import com.mo2ver.web.domain.goods.domain.Goods;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoodsDto {

    private String goodsCode;
    private String goodsName;
    private String goodsBrand;
    private String goodsGender;
    private String goodsYear;
    private BigDecimal supplyPrice;
    private BigDecimal salePrice;
    private List<ImageDto> imageList;

    public static GoodsDto toDTO(Goods goods) {
        return GoodsDto.builder()
                .goodsCode(goods.getGoodsCode())
                .goodsName(goods.getGoodsName())
                .goodsBrand(goods.getGoodsBrand())
                .goodsGender(goods.getGoodsGender())
                .goodsYear(goods.getGoodsYear())
                .supplyPrice(goods.getPrice().getSupplyPrice())
                .salePrice(goods.getPrice().getSalePrice())
                .imageList(goods.getGoodsImageList().stream()
                        .filter(image -> image.getBasicImageYesNo() == 'Y')   // innerJoin 할때, 조건을 추가로 붙여야 함..
                        .map(ImageDto::toDTO)
                        .collect(Collectors.toList()))
                .build();
    }
}
