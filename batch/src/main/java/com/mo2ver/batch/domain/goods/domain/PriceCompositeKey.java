package com.mo2ver.batch.domain.goods.domain;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class PriceCompositeKey implements Serializable {
    private String goodsCode;
    private LocalDateTime applyDate;
}
