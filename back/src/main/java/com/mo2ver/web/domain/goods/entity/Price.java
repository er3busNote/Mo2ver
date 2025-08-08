package com.mo2ver.web.domain.goods.entity;

import com.mo2ver.web.domain.goods.dto.request.GoodsImageRequest;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "GD_PRC")    // 상품가격
@Getter @Setter
@Builder @NoArgsConstructor @AllArgsConstructor
public class Price implements Persistable<PriceId> {

    @EmbeddedId
    private PriceId priceId;

    @MapsId("goodsCode")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "GD_CD",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_GD_TO_GD_PRC_GD_CD"),
            columnDefinition = "CHAR(10) COMMENT '상품코드'"
    )
    private Goods goods;

    @MapsId("goodsOptionNo")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "GD_OPT_NO",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_GD_OPT_TO_GD_PRC_GD_OPT_NO"),
            columnDefinition = "BIGINT(20) COMMENT '상품옵션번호'"
    )
    private Options options;

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

    @Override
    public PriceId getId() {
        return priceId;
    }

    // 새로운 엔티티 판단 전략 재정의
    @Override
    public boolean isNew() {
        return priceId == null || goods == null || options == null;
    }

    public static Price of(Goods goods, Options options, GoodsImageRequest goodsImageRequest) {
        PriceId priceId = new PriceId(goods.getGoodsCode(), options.getGoodsOptionNo());
        return Price.of(priceId, goods, options, goodsImageRequest);
    }

    public static Price of(Goods goods, Price price, Options options, GoodsImageRequest goodsImageRequest) {
        PriceId priceId = price == null || price.isNew() ? new PriceId(goods.getGoodsCode(), options.getGoodsOptionNo()) : Objects.requireNonNull(price).getPriceId();
        return Price.of(priceId, goods, options, goodsImageRequest);
    }

    public static Price of(PriceId priceId, Goods goods, Options options, GoodsImageRequest goodsImageRequest) {
        return Price.builder()
                .priceId(priceId)
                .goods(goods)
                .options(options)
                .supplyPrice(goodsImageRequest.getSupplyPrice())
                .salePrice(goodsImageRequest.getSalePrice())
                .maxBuyQuantity(goodsImageRequest.getMaxBuyQuantity())
                .buyLimitYesNo(goodsImageRequest.getBuyLimitYesNo())
                .buyLimitCondition(goodsImageRequest.getBuyLimitCondition())
                .salePeriodYesNo(goodsImageRequest.getSalePeriodYesNo())
                .saleStartDate(goodsImageRequest.getSaleStartDate())
                .saleEndDate(goodsImageRequest.getSaleEndDate())
                .saleConditionCode("10")
                .register(goods.getUpdater())
                .updater(goods.getUpdater())
                .build();
    }
}
