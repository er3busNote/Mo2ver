package com.mo2ver.master.domain.goods.domain;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "GD_DIS_PRC",
        indexes={
                @Index(
                        name="FK_GD_TO_GD_DIS_PRC",
                        columnList="GD_CD"
                )
        }
)
@Getter @Setter
@EqualsAndHashCode(of = "goodsPriceId")
@Builder @NoArgsConstructor @AllArgsConstructor
public class Discount {

    @Id
    @Column(name = "GD_PRC_ID", columnDefinition = "BIGINT(20) COMMENT '상품가격ID'")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 생성을 데이터베이스에 위임 (AUTO_INCREMENT)
    private Long goodsPriceId;

    @ManyToOne(fetch = FetchType.LAZY)  // 지연로딩 (N+1 문제)
    @JoinColumn(
            name = "GD_CD",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(
                    name = "FK_GD_TO_GD_DIS_PRC",
                    foreignKeyDefinition = "FOREIGN KEY (GD_CD) REFERENCES GD(GD_CD) ON UPDATE RESTRICT ON DELETE RESTRICT"),
            columnDefinition = "CHAR(10) COMMENT '상품코드'"
    )
    private Goods goodsCode;

    @Column(name = "STRT_DT", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '시작일시'")
    private LocalDateTime startDate;

    @Column(name = "END_DT", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '종료일시'")
    private LocalDateTime endDate;

    @Column(name = "DIS_PRC", columnDefinition = "DECIMAL(10,0) COMMENT '할인가격'")
    private BigDecimal discountPrice;

    @Column(name = "RATE_YN", columnDefinition = "CHAR(1) COMMENT '비율여부'")
    private Character rateYesNo;

    @Column(name = "MAX_LIMIT_YN", columnDefinition = "CHAR(1) COMMENT '최대허용여부'")
    private Character maxLimitYesNo;

    @Column(name = "MAX_LIMIT_AMT", columnDefinition = "DECIMAL(10,0) COMMENT '최대허용금액'")
    private BigDecimal maxLimitAmount;

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
