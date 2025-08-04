package com.mo2ver.web.domain.order.entity;

import com.mo2ver.web.domain.point.entity.Point;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(
        name = "ODR_PNT", // 주문포인트
        indexes={
                @Index(name="FK_ODR_TO_ODR_PNT", columnList="ODR_ID"),
                @Index(name="FK_PNT_TO_ODR_PNT", columnList="PNT_NO")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = {"order", "detailSequence"})
@Builder @NoArgsConstructor @AllArgsConstructor
public class OrderPoint implements Serializable {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "ODR_ID",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_ODR_TO_ODR_PNT"),
            columnDefinition = "CHAR(32) COMMENT '주문번호'"
    )
    private Order order;

    @Id
    @Column(name= "DTL_SEQ", columnDefinition = "INT(11) COMMENT '상세순서'")
    private Integer detailSequence;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "PNT_NO",
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_PNT_TO_ODR_PNT"),
            columnDefinition = "CHAR(10) COMMENT '포인트번호'"
    )
    private Point point;

    @Column(name = "USE_AMT", columnDefinition = "INT(11) COMMENT '포인트사용금액'")
    private Long useAmount;
}
