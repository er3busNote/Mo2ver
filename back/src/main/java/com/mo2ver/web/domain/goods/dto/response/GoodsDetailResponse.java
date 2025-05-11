package com.mo2ver.web.domain.goods.dto.response;

import com.mo2ver.web.domain.goods.entity.Goods;
import com.mo2ver.web.domain.goods.entity.Review;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GoodsDetailResponse extends GoodsResponse {

    private Double averageRating;
    private Integer reviewCount;

    public static GoodsDetailResponse of(Goods goods) {
        GoodsResponse goodsResponse = GoodsResponse.of(goods);
        return GoodsDetailResponse.builder()
                .goodsCode(goodsResponse.getGoodsCode())
                .goodsName(goodsResponse.getGoodsName())
                .goodsBrand(goodsResponse.getGoodsBrand())
                .goodsGender(goodsResponse.getGoodsGender())
                .goodsYear(goodsResponse.getGoodsYear())
                .supplyPrice(goodsResponse.getSupplyPrice())
                .salePrice(goodsResponse.getSalePrice())
                .imageList(goodsResponse.getImageList())
                .keywordList(goodsResponse.getKeywordList())
                .averageRating(goods.getGoodsReviews().stream()
                        .filter(r -> r.getRating() != null)
                        .mapToInt(Review::getRating)
                        .average()
                        .orElse(0.0))
                .reviewCount(goods.getGoodsReviews().size())
                .build();
    }
}
