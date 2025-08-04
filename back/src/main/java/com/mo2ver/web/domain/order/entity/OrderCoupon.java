package com.mo2ver.web.domain.order.entity;

import com.mo2ver.web.domain.coupon.entity.CouponMember;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(
        name = "ODR_CPN", // 주문쿠폰
        indexes={
                @Index(name="FK_ODR_TO_ODR_CPN", columnList="ODR_ID"),
                @Index(name="FK_CPN_MBR_TO_ODR_CPN", columnList="CPN_ID")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = {"order", "detailSequence"})
@Builder @NoArgsConstructor @AllArgsConstructor
public class OrderCoupon implements Serializable {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "ODR_ID",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_ODR_TO_ODR_CPN"),
            columnDefinition = "CHAR(32) COMMENT '주문번호'"
    )
    private Order order;

    @Id
    @Column(name= "DTL_SEQ", columnDefinition = "INT(11) COMMENT '상세순서'")
    private Integer detailSequence;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "CPN_ID",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_CPN_MBR_TO_ODR_CPN"),
            columnDefinition = "CHAR(32) COMMENT '쿠폰번호'"
    )
    private CouponMember couponMember;

    public static OrderCoupon of(Order order, CouponMember couponMember) {
        return OrderCoupon.builder()
                .order(order)
                .couponMember(couponMember)
                .build();
    }
}
