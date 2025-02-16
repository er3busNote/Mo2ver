package com.mo2ver.web.domain.display.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoodsDisplayProductDto {

    private Long id;
    private String goodsCode;
    private String goodsName;
    private BigDecimal supplyPrice;
    private BigDecimal salePrice;
    private Integer sortSequence;
}
