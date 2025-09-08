package com.mo2ver.web.domain.order.entity;

import com.mo2ver.web.domain.coupon.entity.CouponMember;
import com.mo2ver.web.domain.delivery.entity.Delivery;
import com.mo2ver.web.domain.goods.entity.Goods;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.order.dto.OrderInfo;
import com.mo2ver.web.domain.order.dto.request.OrderRequest;
import com.mo2ver.web.domain.payment.entity.Payment;
import com.mo2ver.web.global.common.uuid.UuidManager;
import com.mo2ver.web.global.error.exception.NotFoundException;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Entity
@Table(
        name = "ODR",   // 주문관리
        indexes={
                @Index(name="FK_MBR_TO_ODR", columnList="MBR_NO")
        }
)
@Getter @Setter @ToString
@EqualsAndHashCode(of = "orderId")
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Order {

//    @Id
//    @GeneratedValue(generator = "orderCode")
//    @GenericGenerator(name = "orderCode", strategy = "com.mo2ver.web.domain.order.entity.OrderGenerator")
//    @Column(name = "ODR_CD", columnDefinition = "CHAR(10) COMMENT '주문코드'")
//    private String orderCode;

//    @Id
//    @GeneratedValue(generator = "UUID")
//    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
//    @Type(type = "uuid-char")
//    @Column(name = "ODR_ID", columnDefinition = "CHAR(36) COMMENT '주문번호'", updatable = false, nullable = false)
//    private UUID orderId;

    @Id
    @Column(name = "ODR_ID", columnDefinition = "CHAR(32) COMMENT '주문번호'", updatable = false, nullable = false)
    private String orderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "MBR_NO",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_MBR_TO_ODR"),
            columnDefinition = "CHAR(10) COMMENT '회원번호'"
    )
    private Member member;

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Payment payment;

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Delivery delivery;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetail> orderDetails = new ArrayList<>();

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderCoupon> orderCoupons = new ArrayList<>();

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderPoint> orderPoints = new ArrayList<>();

    @Column(name = "AMT", columnDefinition = "INT(11) COMMENT '주문금액'")
    private Long amount;

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

    @PrePersist
    public void generateOrderId() {
        if (this.orderId == null) this.orderId = UuidManager.generateId();
    }

    public Order(OrderRequest orderRequest, List<Goods> goodsList, Member currentUser) {
        this.createOrUpdateOrder(currentUser);
        this.member = currentUser;
        this.register = currentUser.getMemberNo();

        this.orderDetails.addAll(this.createOrderDetail(orderRequest.getGoodsOrders(), goodsList, currentUser));

        this.sortOrderDetail();

        this.totalPriceCalc();
    }

    public void update(CouponMember couponMember, int discountAmount) {
        OrderCoupon orderCoupon = this.createOrUpdateOrderCoupons(couponMember);
        orderCoupon.setUseAmount(discountAmount);

        this.totalPriceCalc();
        this.totalPriceCalcByCoupon();
        this.totalPriceCalcByPoint();
    }

    public void update(List<CouponMember> couponMembers) {
        int oldFileSize = this.orderCoupons.size();
        this.orderCoupons.addAll(this.updateOrderCoupons(couponMembers));
        this.orderCoupons.subList(0, oldFileSize).clear();

        this.sortOrderCoupon();
    }

    private void createOrUpdateOrder(Member currentUser) {
        this.updater = currentUser.getMemberNo();
    }

    private List<OrderDetail> createOrderDetail(List<OrderInfo> orderInfos, List<Goods> goodsList, Member currentUser) {
        return orderInfos.stream()
                .map(info -> OrderDetail.of(this, info, this.getGoodsInfo(goodsList, info.getGoodsCode()), currentUser))
                .collect(Collectors.toList());
    }

    private List<OrderCoupon> updateOrderCoupons(List<CouponMember> couponMembers) {
        return couponMembers.stream()
                .map(this::createOrUpdateOrderCoupons)
                .collect(Collectors.toList());
    }

    private OrderCoupon createOrUpdateOrderCoupons(CouponMember couponMember) {
        return this.orderCoupons.stream()
                .filter(it -> Objects.equals(it.getCouponMember().getCouponId(), couponMember.getCouponId()))
                .findFirst()
                .orElseGet(() -> OrderCoupon.of(this, couponMember));
    }

    private Goods getGoodsInfo(List<Goods> goodsList, String goodsCode) {
        return goodsList.stream()
                .filter(it -> it.getGoodsCode().equals(goodsCode))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("존재하지 않는 상품코드 입니다."));
    }

    private void sortOrderDetail() {
        int index = 1;
        for (OrderDetail orderDetail : this.orderDetails) {
            orderDetail.setDetailSequence(index++);
        }
    }

    private void sortOrderCoupon() {
        int index = 1;
        for (OrderCoupon orderCoupon : this.orderCoupons) {
            orderCoupon.setDetailSequence(index++);
        }
    }

    private void sortOrderPoint() {
        int index = 1;
        for (OrderPoint orderPoint : this.orderPoints) {
            orderPoint.setDetailSequence(index++);
        }
    }

    private void totalPriceCalc() {
        this.amount = 0L;
        for (OrderDetail orderDetail : this.orderDetails) {
            this.amount += orderDetail.getAmount();
        }
    }

    private void totalPriceCalcByCoupon() {
        for (OrderCoupon orderCoupon : this.orderCoupons) {
            this.amount -= Optional.ofNullable(orderCoupon.getUseAmount()).orElse(0);
        }
    }

    private void totalPriceCalcByPoint() {
        for (OrderPoint orderPoint : this.orderPoints) {
            this.amount -= Optional.ofNullable(orderPoint.getUseAmount()).orElse(0);
        }
    }
}
