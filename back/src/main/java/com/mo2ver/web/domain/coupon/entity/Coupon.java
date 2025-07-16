package com.mo2ver.web.domain.coupon.entity;

import com.mo2ver.web.domain.coupon.dto.request.CouponRequest;
import com.mo2ver.web.domain.coupon.type.CouponType;
import com.mo2ver.web.domain.goods.entity.Goods;
import com.mo2ver.web.domain.member.entity.Member;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "CPN",   // 쿠폰
        indexes={
                @Index(name="FK_GD_TO_CPN", columnList="GD_CD")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = "couponNo")
@Builder @NoArgsConstructor @AllArgsConstructor
public class Coupon {

    @Id
    @GeneratedValue(generator = "couponNo")
    @GenericGenerator(name = "couponNo", strategy = "com.mo2ver.web.domain.coupon.entity.CouponGenerator")
    @Column(name = "CPN_NO", columnDefinition = "CHAR(10) COMMENT '쿠폰번호'")
    private String couponNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "GD_CD",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_GD_TO_CPN"),
            columnDefinition = "CHAR(10) COMMENT '상품코드'"
    )
    private Goods goods;

    @Enumerated(EnumType.STRING)
    @Column(name = "CPN_TYPE", columnDefinition = "CHAR(10) COMMENT '쿠폰타입'")
    private CouponType couponType;

    @Column(name = "DIS_AMT", columnDefinition = "DECIMAL(10,0) COMMENT '할인금액'")
    private BigDecimal discountAmount;

    @Column(name = "MAX_DIS_AMT", columnDefinition = "DECIMAL(10,0) COMMENT '최대할인금액'")
    private BigDecimal maxDiscountAmount;

    @Column(name = "MIN_ODR_AMT", columnDefinition = "DECIMAL(10,0) COMMENT '최소주문금액'")
    private BigDecimal minOrderAmount;

    @Column(name = "TOT_QTY", columnDefinition = "INT(11) COMMENT '전체발급가능수량'")
    private Integer totalQuantity;

    @Column(name = "ISSUE_QTY", columnDefinition = "INT(11) COMMENT '현재발급한수량'")
    private Integer issueQuantity;

    @Column(name = "REGR", nullable = false, columnDefinition = "VARCHAR(30) COMMENT '등록자'")
    @NotBlank
    private String register;

    @Builder.Default
    @Column(name = "REG_DT", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '등록일시'")
    @CreationTimestamp  // INSERT 시 자동으로 값을 채워줌
    private LocalDateTime registerDate = LocalDateTime.now();

    @Column(name = "UPDR", nullable = false, columnDefinition = "VARCHAR(30) COMMENT '수정자'")
    @NotBlank
    private String updater;

    @Builder.Default
    @Column(name = "UPD_DT", nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '수정일시'")
    @UpdateTimestamp    // UPDATE 시 자동으로 값을 채워줌
    private LocalDateTime updateDate = LocalDateTime.now();

    public Coupon(CouponRequest couponRequest, Goods goods, Member currentUser) {
        this.createOrUpdateCoupon(couponRequest, currentUser);
        this.goods = goods;
        this.register = currentUser.getMemberNo();
    }

    private void createOrUpdateCoupon(CouponRequest couponRequest, Member currentUser) {
        this.couponType = couponRequest.getCouponType();
        this.discountAmount = couponRequest.getDiscountAmount();
        this.maxDiscountAmount = couponRequest.getMaxDiscountAmount();
        this.minOrderAmount = couponRequest.getMinOrderAmount();
        this.totalQuantity = couponRequest.getTotalQuantity();
        this.issueQuantity = couponRequest.getIssueQuantity();
        this.updater = currentUser.getMemberNo();
    }
}
