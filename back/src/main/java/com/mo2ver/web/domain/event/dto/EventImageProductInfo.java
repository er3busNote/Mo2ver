package com.mo2ver.web.domain.event.dto;

import lombok.*;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class EventImageProductInfo {

    private Integer id;
    private String goodsCode;
    private String goodsName;
    private BigDecimal supplyPrice;
    private BigDecimal salePrice;
    private Integer sortSequence;
}
