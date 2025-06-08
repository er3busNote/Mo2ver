package com.mo2ver.web.domain.order.dto.response;

import com.mo2ver.web.domain.goods.dto.response.GoodsResponse;
import com.mo2ver.web.domain.order.entity.OrderDetail;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderGoodsResponse extends GoodsResponse {

    private Integer buyQuantity;
    private Long amount;

    public static OrderGoodsResponse of(OrderDetail orderDetail) {
        GoodsResponse goodsResponse = GoodsResponse.of(orderDetail.getGoods());
        return OrderGoodsResponse.builder()
                .goodsCode(goodsResponse.getGoodsCode())
                .goodsName(goodsResponse.getGoodsName())
                .goodsBrand(goodsResponse.getGoodsBrand())
                .goodsGender(goodsResponse.getGoodsGender())
                .goodsYear(goodsResponse.getGoodsYear())
                .supplyPrice(goodsResponse.getSupplyPrice())
                .salePrice(goodsResponse.getSalePrice())
                .imageList(goodsResponse.getImageList())
                .keywordList(goodsResponse.getKeywordList())
                .buyQuantity(orderDetail.getBuyQuantity())
                .amount(orderDetail.getAmount())
                .build();
    }
}
