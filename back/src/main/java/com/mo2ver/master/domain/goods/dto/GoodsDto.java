package com.mo2ver.master.domain.goods.dto;

import com.mo2ver.master.domain.goods.domain.Goods;
import com.mo2ver.master.domain.goods.domain.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

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

    private List<Image> imageList;

    public static GoodsDto toDTO(Goods goods) {
        return GoodsDto.builder()
                .goodsCode(goods.getGoodsCode())
                .goodsName(goods.getGoodsName())
                .goodsBrand(goods.getGoodsBrand())
                .goodsGender(goods.getGoodsGender())
                .goodsYear(goods.getGoodsYear())
                .supplyPrice(goods.getPrice().getSupplyPrice())
                .salePrice(goods.getPrice().getSalePrice())
                .imageList(goods.getImageList())
                .build();
    }
}
