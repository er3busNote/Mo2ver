package com.mo2ver.web.domain.order.entity;

import com.mo2ver.web.domain.member.entity.Member;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "ODR",   // 주문관리
        indexes={
                @Index(name="FK_MBR_TO_ODR", columnList="MBR_NO")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = "orderCode")
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Order {

    @Id
    @GeneratedValue(generator = "orderCode")
    @GenericGenerator(name = "orderCode", strategy = "com.mo2ver.web.domain.order.entity.OrderGenerator")
    @Column(name = "ODR_CD", columnDefinition = "CHAR(10) COMMENT '주문코드'")
    private String orderCode;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(
            name = "MBR_NO",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_MBR_TO_ODR"),
            columnDefinition = "CHAR(10) COMMENT '회원번호'"
    )
    private Member memberNo;

    @Column(name = "ODR_ID", columnDefinition = "VARCHAR(64) COMMENT '주문번호'")
    private String orderId;

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
}
