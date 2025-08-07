package com.mo2ver.web.domain.display.dto;

import lombok.*;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class GoodsDisplayProductInfo {

    private Integer id;
    private String goodsCode;
    private String goodsName;
    private BigDecimal supplyPrice;
    private BigDecimal salePrice;
    private Integer sortSequence;
}
