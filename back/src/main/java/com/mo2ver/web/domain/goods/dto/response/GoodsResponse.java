package com.mo2ver.web.domain.goods.dto.response;

import com.mo2ver.web.domain.goods.entity.Goods;
import com.mo2ver.web.domain.goods.dto.ImageInfo;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Data
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class GoodsResponse {

    protected String goodsCode;
    protected String goodsName;
    protected String goodsBrand;
    protected String goodsGender;
    protected String goodsYear;
    protected BigDecimal supplyPrice;
    protected BigDecimal salePrice;
    protected List<ImageInfo> imageList;
    protected List<String> keywordList;

    public static GoodsResponse of(Goods goods) {
        return GoodsResponse.builder()
                .goodsCode(goods.getGoodsCode())
                .goodsName(goods.getGoodsName())
                .goodsBrand(goods.getGoodsBrand())
                .goodsGender(goods.getGoodsGender())
                .goodsYear(goods.getGoodsYear())
                .supplyPrice(goods.getPrice().getSupplyPrice())
                .salePrice(goods.getPrice().getSalePrice())
                .imageList(goods.getGoodsImages().stream()
                        .filter(image -> image.getBasicImageYesNo() == 'Y')   // innerJoin 할때, 조건을 추가로 붙여야 함..
                        .map(ImageInfo::of)
                        .collect(Collectors.toList()))
                .keywordList(getKeywordList(goods.getKeyword()))
                .build();
    }

    public static List<String> getKeywordList(String keyword) {
        return Optional.ofNullable(keyword)
                .map(s -> Arrays.stream(s.split("#"))
                        .filter(token -> !token.isEmpty())
                        .collect(Collectors.toList()))
                .orElse(Collections.emptyList());
    }
}
