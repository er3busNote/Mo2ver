package com.mo2ver.master.domain.goods.domain;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "GD_PRC")
@Getter @Setter
@EqualsAndHashCode(of = {"goodsCode", "applyDate"})
@Builder @NoArgsConstructor @AllArgsConstructor
public class Price implements Serializable {

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
    @Column(name = "APPL_DT", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '적용일시'")
    private LocalDateTime applyDate;

    @Column(name = "GD_PRC", columnDefinition = "DECIMAL(10,0) COMMENT '상품가격'")
    private BigDecimal goodsPrice;

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
