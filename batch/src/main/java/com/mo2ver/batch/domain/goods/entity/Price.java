package com.mo2ver.batch.domain.goods.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@IdClass(PriceId.class)
@Table(name = "GD_PRC")
@Getter @Setter
@EqualsAndHashCode(of = {"goodsCode", "applyDate"})
@Builder @NoArgsConstructor @AllArgsConstructor
public class Price {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)  // 지연로딩 (N+1 문제)
    @JoinColumn(
            name = "GD_CD",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(
                    name = "FK_GD_TO_GD_PRC",
                    foreignKeyDefinition = "FOREIGN KEY (GD_CD) REFERENCES GD(GD_CD) ON UPDATE RESTRICT ON DELETE RESTRICT"),
            columnDefinition = "CHAR(10) COMMENT '상품코드'"
    )
    private Goods goodsCode;

    @Id
    @Column(name = "APPL_DT", nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '적용일시'")
    private LocalDateTime applyDate;

    @Column(name = "SUPP_PRC", columnDefinition = "DECIMAL(10,0) COMMENT '공급가'")
    private BigDecimal supplyPrice;

    @Column(name = "SALE_PRC", columnDefinition = "DECIMAL(10,0) COMMENT '판매가'")
    private BigDecimal salePrice;

    @Column(name = "MAX_BUY_QTY", columnDefinition = "INT(11) COMMENT '최대구매수량'")
    private Integer maxBuyQuantity;

    @Column(name = "BUY_LMT_YN", columnDefinition = "CHAR(1) COMMENT '구매제한여부'")
    private Character buyLimitYesNo;

    @Column(name = "BUY_LMT_COND", columnDefinition = "CHAR(10) COMMENT '구매제한조건'")
    private String buyLimitCondition;

    @Column(name = "SALE_PERD_YN", columnDefinition = "CHAR(1) COMMENT '판매기간여부'")
    private Character salePeriodYesNo;

    @Column(name = "SALE_STRT_DT", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '판매시작일시'")
    private Date saleStartDate;

    @Column(name = "SALE_END_DT", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '판매종료일시'")
    private Date saleEndDate;

    @Column(name = "SALE_CND_CD", columnDefinition = "CHAR(10) COMMENT '판매상태코드'")
    private String saleConditionCode;

    @Column(name = "REGR", nullable = false, columnDefinition = "VARCHAR(30) COMMENT '등록자'")
    @NotBlank
    private String register;

//    @Builder.Default
//    @Column(name = "REG_DT", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '등록일시'")
//    @CreationTimestamp  // INSERT 시 자동으로 값을 채워줌
//    private LocalDateTime registerDate = LocalDateTime.now();
//
//    @Column(name = "UPDR", nullable = false, columnDefinition = "VARCHAR(30) COMMENT '수정자'")
//    @NotBlank
//    private String updater;
//
//    @Builder.Default
//    @Column(name = "UPD_DT", nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '수정일시'")
//    @UpdateTimestamp    // UPDATE 시 자동으로 값을 채워줌
//    private LocalDateTime updateDate = LocalDateTime.now();
}
