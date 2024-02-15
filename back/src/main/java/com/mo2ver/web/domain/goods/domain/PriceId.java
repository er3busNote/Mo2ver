package com.mo2ver.web.domain.goods.domain;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.io.Serializable;
import java.time.LocalDateTime;

@EqualsAndHashCode(of = {"goodsCode", "applyDate"})
@AllArgsConstructor
@NoArgsConstructor
public class PriceId implements Serializable {
    @Column(name = "GD_CD")
    protected String goodsCode;
    @Column(name = "APPL_DT")
    protected LocalDateTime applyDate;
}
