package com.mo2ver.web.domain.display.entity;

import com.mo2ver.web.domain.display.dto.GoodsDisplayProductInfo;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "DP_BNNR_PRD",   // 전시배너상품
        indexes={
                @Index(name = "FK_DP_BNNR_TO_DP_BNNR_PRD", columnList = "BNNR_NO")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = {"banner", "detailSequence"})
@Builder @NoArgsConstructor @AllArgsConstructor
public class BannerProduct implements Serializable {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "BNNR_NO",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_DP_BNNR_TO_DP_BNNR_PRD"),
            columnDefinition = "CHAR(10) COMMENT '배너번호'"
    )
    private Banner banner;

    @Id
    @Column(name= "DTL_SEQ", columnDefinition = "INT(11) COMMENT '상세순서'")
    private Integer detailSequence;

    @Column(name = "PRD_CD", columnDefinition = "CHAR(10) COMMENT '상품코드'")
    private String productCode;

    @Column(name = "PRD_NM", columnDefinition = "VARCHAR(50) COMMENT '상품명'")
    private String productName;

    @Column(name= "SORT_SEQ", columnDefinition = "INT(11) COMMENT '정렬순서'")
    private Integer sortSequence;

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

    public static BannerProduct from(Banner banner) {
        return BannerProduct.builder()
                .banner(banner)
                .register(banner.getUpdater())
                .updater(banner.getUpdater())
                .build();
    }

    public static BannerProduct of(Banner banner, GoodsDisplayProductInfo goodsDisplayProductInfo) {
        return BannerProduct.builder()
                .banner(banner)
                .productCode(goodsDisplayProductInfo.getGoodsCode())
                .productName(goodsDisplayProductInfo.getGoodsName())
                .sortSequence(goodsDisplayProductInfo.getSortSequence())
                .register(banner.getUpdater())
                .updater(banner.getUpdater())
                .build();
    }
}
