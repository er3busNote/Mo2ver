package com.mo2ver.web.domain.delivery.entity;

import com.mo2ver.web.domain.delivery.type.DeliveryStatus;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.order.entity.OrderDetail;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "DLV_DTL", // 배송상세
        indexes={
                @Index(name="FK_DLV_TO_DLV_DTL", columnList="DLV_CD"),
                @Index(name="FK_ODR_DTL_TO_DLV_DTL", columnList="ODR_DTL_ID")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = "deliveryDetailId")
@Builder @NoArgsConstructor @AllArgsConstructor
public class DeliveryDetail {

    @Id
    @Column(name = "DLV_DTL_ID", columnDefinition = "BIGINT(20) COMMENT '배송상세번호'")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 생성을 데이터베이스에 위임 (AUTO_INCREMENT)
    private Long deliveryDetailId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "DLV_CD",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_DLV_TO_DLV_DTL"),
            columnDefinition = "CHAR(10) COMMENT '배송코드'"
    )
    private Delivery delivery;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "ODR_DTL_ID",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_ODR_DTL_TO_DLV_DTL"),
            columnDefinition = "BIGINT(20) COMMENT '주문상세번호'"
    )
    private OrderDetail orderDetail;

    @Enumerated(EnumType.STRING)
    @Column(name = "DLV_STS", columnDefinition = "CHAR(10) COMMENT '배송상태'")
    private DeliveryStatus deliveryStatus;

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

    public static DeliveryDetail of(Delivery delivery, OrderDetail orderDetail, DeliveryStatus deliveryStatus, Member currentUser) {
        return DeliveryDetail.builder()
                .delivery(delivery)
                .orderDetail(orderDetail)
                .deliveryStatus(deliveryStatus)
                .register(currentUser.getMemberNo())
                .updater(currentUser.getMemberNo())
                .build();
    }
}
