package com.mo2ver.web.domain.search.dto.response;

import com.mo2ver.web.domain.goods.dto.response.GoodsResponse;
import com.mo2ver.web.domain.goods.entity.Goods;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SearchGoodsResponse extends GoodsResponse {

    public static SearchGoodsResponse of(Goods goods) {
        GoodsResponse goodsResponse = GoodsResponse.of(goods);
        return SearchGoodsResponse.builder()
                .goodsCode(goodsResponse.getGoodsCode())
                .goodsName(goodsResponse.getGoodsName())
                .goodsBrand(goodsResponse.getGoodsBrand())
                .goodsGender(goodsResponse.getGoodsGender())
                .goodsYear(goodsResponse.getGoodsYear())
                .supplyPrice(goodsResponse.getSupplyPrice())
                .salePrice(goodsResponse.getSalePrice())
                .imageList(goodsResponse.getImageList())
                .keywordList(goodsResponse.getKeywordList())
                .build();
    }
}
