package com.mo2ver.web.domain.order.entity;

import com.mo2ver.web.domain.goods.entity.Goods;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.order.dto.OrderInfo;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "ODR_DTL", // 주문상세
        indexes={
                @Index(name="FK_ODR_TO_ODR_DTL", columnList="ODR_ID"),
                @Index(name="FK_GD_TO_ODR_DTL", columnList="GD_CD")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = "orderDetailId")
@Builder @NoArgsConstructor @AllArgsConstructor
public class OrderDetail {

    @Id
    @Column(name = "ODR_DTL_ID", columnDefinition = "BIGINT(20) COMMENT '주문상세관리번호'")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 생성을 데이터베이스에 위임 (AUTO_INCREMENT)
    private Long orderDetailId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "ODR_ID",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_ODR_TO_ODR_DTL"),
            columnDefinition = "CHAR(36) COMMENT '주문번호'"
    )
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "GD_CD",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_GD_TO_ODR_DTL"),
            columnDefinition = "CHAR(10) COMMENT '상품코드'"
    )
    private Goods goods;

    @Column(name = "BUY_QTY", columnDefinition = "INT(11) COMMENT '구매수량'")
    private Integer buyQuantity;

    @Column(name = "AMT", columnDefinition = "INT(11) COMMENT '상품금액'")
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

    public static OrderDetail of(Order order, OrderInfo orderInfo, Goods goods, Member currentUser) {
        return OrderDetail.builder()
                .order(order)
                .goods(goods)
                .buyQuantity(orderInfo.getQuantity())
                .amount(goods.getPrice().getSalePrice().multiply(BigDecimal.valueOf(orderInfo.getQuantity())).longValue())
                .register(currentUser.getMemberNo())
                .updater(currentUser.getMemberNo())
                .build();
    }
}
