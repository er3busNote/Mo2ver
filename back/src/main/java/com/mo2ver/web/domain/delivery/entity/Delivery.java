package com.mo2ver.web.domain.delivery.entity;

import com.mo2ver.web.domain.delivery.type.DeliveryStatus;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.order.entity.Order;
import com.mo2ver.web.domain.order.entity.OrderDetail;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(
        name = "DLV",   // 배송관리
        indexes={
                @Index(name="FK_ODR_TO_DLV", columnList="ODR_ID")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = "deliveryCode")
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Delivery {

    @Id
    @GeneratedValue(generator = "deliveryCode")
    @GenericGenerator(name = "deliveryCode", strategy = "com.mo2ver.web.domain.delivery.entity.DeliveryGenerator")
    @Column(name = "DLV_CD", columnDefinition = "CHAR(10) COMMENT '배송코드'")
    private String deliveryCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "ODR_ID",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_ODR_TO_DLV"),
            columnDefinition = "CHAR(36) COMMENT '주문번호'"
    )
    private Order order;

    @OneToMany(mappedBy = "delivery", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DeliveryDetail> deliveryDetails = new ArrayList<>();

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

    public Delivery(Order order, Member currentUser) {
        this.createOrUpdateDelivery(currentUser);
        this.order = order;
        this.register = currentUser.getMemberNo();

        this.deliveryDetails.addAll(this.createDeliveryDetail(order.getOrderDetails(), currentUser));
    }

    private void createOrUpdateDelivery(Member currentUser) {
        this.updater = currentUser.getMemberNo();
    }

    private List<DeliveryDetail> createDeliveryDetail(List<OrderDetail> orderDetails, Member currentUser) {
        return orderDetails.stream()
                .map(info -> DeliveryDetail.of(this, info, DeliveryStatus.READY, currentUser))
                .collect(Collectors.toList());
    }
}
