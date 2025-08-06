package com.mo2ver.web.domain.delivery.entity;

import com.mo2ver.web.domain.delivery.type.DeliveryStatus;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.order.entity.Order;
import com.mo2ver.web.domain.order.entity.OrderDetail;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "DLV_DTL", // 배송상세
        indexes={
                @Index(name="FK_DLV_TO_DLV_DTL", columnList="DLV_CD"),
                @Index(name="FK_ODR_TO_CPN_MBR", columnList="ODR_ID")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = {"delivery", "detailSequence"})
@Builder @NoArgsConstructor @AllArgsConstructor
public class DeliveryDetail implements Serializable {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "DLV_CD",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_DLV_TO_DLV_DTL"),
            columnDefinition = "CHAR(10) COMMENT '배송코드'"
    )
    private Delivery delivery;

    @Id
    @Column(name= "DTL_SEQ", columnDefinition = "INT(11) COMMENT '상세순서'")
    private Integer detailSequence;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "ODR_ID",
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_ODR_TO_CPN_MBR"),
            columnDefinition = "CHAR(32) COMMENT '주문번호'"
    )
    private Order order;

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
                .detailSequence(orderDetail.getDetailSequence())
                .order(orderDetail.getOrder())
                .deliveryStatus(deliveryStatus)
                .register(currentUser.getMemberNo())
                .updater(currentUser.getMemberNo())
                .build();
    }
}
