package com.mo2ver.master.domain.goods.domain;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.time.LocalDateTime;

@EqualsAndHashCode(of = {"goodsCode", "applyDate"})
@AllArgsConstructor
@NoArgsConstructor
public class PriceId implements Serializable {
    protected String goodsCode;
    protected LocalDateTime applyDate;
}
