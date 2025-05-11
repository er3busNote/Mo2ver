package com.mo2ver.web.domain.goods.dto.response;

import com.mo2ver.web.domain.goods.dto.ImageInfo;
import com.mo2ver.web.domain.goods.entity.Goods;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.Collections;

@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GoodsDetailResponse extends GoodsResponse {

    private Double averageRating;
    private Integer reviewCount;

    @QueryProjection
    public GoodsDetailResponse(String goodsCode, String goodsName, String goodsBrand, String goodsGender, String goodsYear, BigDecimal supplyPrice, BigDecimal salePrice, ImageInfo imageList, String keyword, Double averageRating, Long reviewCount) {
        this.goodsCode = goodsCode;
        this.goodsName = goodsName;
        this.goodsBrand = goodsBrand;
        this.goodsGender = goodsGender;
        this.goodsYear = goodsYear;
        this.supplyPrice = supplyPrice;
        this.salePrice = salePrice;
        this.imageList = Collections.singletonList(imageList);
        this.keywordList = getKeywordList(keyword);
        this.averageRating = averageRating;
        this.reviewCount = reviewCount.intValue();
    }

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
//                .averageRating(goods.getGoodsReviews().stream()
//                        .filter(r -> r.getRating() != null)
//                        .mapToInt(Review::getRating)
//                        .average()
//                        .orElse(0.0))
//                .reviewCount(goods.getGoodsReviews().size())
                .build();
    }
}
