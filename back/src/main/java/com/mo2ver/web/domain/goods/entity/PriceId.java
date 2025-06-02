package com.mo2ver.web.domain.goods.entity;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.io.Serializable;

@EqualsAndHashCode(of = {"goodsCode", "goodsOptionNo"})
@AllArgsConstructor
@NoArgsConstructor
public class PriceId implements Serializable {
    @Column(name = "GD_CD")
    protected String goodsCode;
    @Column(name = "GD_OPT_NO")
    protected Long goodsOptionNo;
}
