package com.mo2ver.batch.domain.goods.entity;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class PriceId implements Serializable {
    private String goodsCode;
    private LocalDateTime applyDate;
}
