package com.mo2ver.web.domain.order.entity;

import com.mo2ver.web.domain.coupon.entity.CouponMember;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(
        name = "ODR_CPN", // 주문쿠폰
        indexes={
                @Index(name="FK_ODR_TO_ODR_CPN", columnList="ODR_ID"),
                @Index(name="FK_CPN_MBR_TO_ODR_CPN", columnList="CPN_ID")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = "orderCouponId")
@Builder @NoArgsConstructor @AllArgsConstructor
public class OrderCoupon {

    @Id
    @Column(name = "ODR_CPN_ID", columnDefinition = "BIGINT(20) COMMENT '주문쿠폰번호'")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 생성을 데이터베이스에 위임 (AUTO_INCREMENT)
    private Long orderCouponId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "ODR_ID",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_ODR_TO_ODR_CPN"),
            columnDefinition = "CHAR(32) COMMENT '주문번호'"
    )
    private Order order;

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
