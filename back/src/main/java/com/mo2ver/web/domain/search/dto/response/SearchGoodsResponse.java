package com.mo2ver.web.domain.search.dto.response;

import com.mo2ver.web.domain.goods.entity.Goods;
import lombok.*;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class SearchGoodsResponse {

    private String goodsCode;
    private String goodsName;
    private String goodsBrand;
    private String goodsGender;
    private String goodsYear;
    private BigDecimal supplyPrice;
    private BigDecimal salePrice;

    public static SearchGoodsResponse of(Goods goods) {
        return SearchGoodsResponse.builder()
                .goodsCode(goods.getGoodsCode())
                .goodsName(goods.getGoodsName())
                .goodsBrand(goods.getGoodsBrand())
                .goodsGender(goods.getGoodsGender())
                .goodsYear(goods.getGoodsYear())
                .supplyPrice(goods.getPrice().getSupplyPrice())
                .salePrice(goods.getPrice().getSalePrice())
                .build();
    }
}
