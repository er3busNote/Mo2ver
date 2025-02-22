package com.mo2ver.web.domain.goods.dto.response;

import com.mo2ver.web.domain.goods.domain.Goods;
import com.mo2ver.web.domain.goods.dto.ImageInfo;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class GoodsResponse {

    private String goodsCode;
    private String goodsName;
    private String goodsBrand;
    private String goodsGender;
    private String goodsYear;
    private BigDecimal supplyPrice;
    private BigDecimal salePrice;
    private List<ImageInfo> imageList;

    public static GoodsResponse of(Goods goods) {
        return GoodsResponse.builder()
                .goodsCode(goods.getGoodsCode())
                .goodsName(goods.getGoodsName())
                .goodsBrand(goods.getGoodsBrand())
                .goodsGender(goods.getGoodsGender())
                .goodsYear(goods.getGoodsYear())
                .supplyPrice(goods.getPrice().getSupplyPrice())
                .salePrice(goods.getPrice().getSalePrice())
                .imageList(goods.getGoodsImageList().stream()
                        .filter(image -> image.getBasicImageYesNo() == 'Y')   // innerJoin 할때, 조건을 추가로 붙여야 함..
                        .map(ImageInfo::of)
                        .collect(Collectors.toList()))
                .build();
    }
}
