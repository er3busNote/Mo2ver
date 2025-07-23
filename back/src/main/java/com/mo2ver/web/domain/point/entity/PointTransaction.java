package com.mo2ver.web.domain.point.entity;

import com.mo2ver.web.domain.order.entity.Order;
import com.mo2ver.web.domain.point.type.PointStatus;
import com.mo2ver.web.global.common.uuid.UuidManager;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "PNT_TRN", // 포인트거래이력
        indexes={
                @Index(name="FK_ODR_TO_PNT_TRN", columnList="ODR_ID")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = "transactionId")
@Builder @NoArgsConstructor @AllArgsConstructor
public class PointTransaction {

    @Id
    @Column(name = "TRN_ID", columnDefinition = "CHAR(32) COMMENT '포인트거래이력번호'", updatable = false, nullable = false)
    private String transactionId;

    @Enumerated(EnumType.STRING)
    @Column(name = "PNT_STS", columnDefinition = "CHAR(10) COMMENT '포인트상태'")
    private PointStatus pointStatus;

    @Column(name = "PNT_AMT", columnDefinition = "INT(11) COMMENT '포인트금액'")
    private Long pointAmount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "ODR_ID",
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_ODR_TO_PNT_TRN"),
            columnDefinition = "CHAR(32) COMMENT '주문번호'"
    )
    private Order order;

    @Column(name = "REGR", nullable = false, columnDefinition = "VARCHAR(30) COMMENT '등록자'")
    @NotBlank
    private String register;

    @Builder.Default
    @Column(name = "REG_DT", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '등록일시'")
    @CreationTimestamp  // INSERT 시 자동으로 값을 채워줌
    private LocalDateTime registerDate = LocalDateTime.now();
    
    @PrePersist
    public void generateTransactionId() {
        if (this.transactionId == null) this.transactionId = UuidManager.generateId();
    }
}
