package com.mo2ver.web.domain.goods.domain;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@EqualsAndHashCode(of = {"goodsCode", "applyDate"})
@AllArgsConstructor
@NoArgsConstructor
public class PriceId implements Serializable {
    protected String goodsCode;
    protected LocalDateTime applyDate;
}
