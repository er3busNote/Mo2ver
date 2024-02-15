package com.mo2ver.web.domain.goods.domain;

import com.mo2ver.web.domain.goods.dto.GoodsImageDto;
import com.mo2ver.web.domain.member.domain.Member;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(
        name = "GD_PRC",    // 상품가격
        indexes={
                @Index(
                        name="FK_GD_TO_GD_PRC_CD",
                        columnList="GD_CD",
                        unique = true
                )
        }
)
@Getter @Setter
@Builder @NoArgsConstructor @AllArgsConstructor
public class Price implements Persistable<PriceId> {

    @EmbeddedId
    private PriceId priceId;

    @MapsId("goodsCode")
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(
            name = "GD_CD",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_GD_TO_GD_PRC_CD"),
            columnDefinition = "CHAR(10) COMMENT '상품코드'"
    )
    private Goods goodsCode;

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

    @Override
    public PriceId getId() {
        return priceId;
    }

    // 새로운 엔티티 판단 전략 재정의
    @Override
    public boolean isNew() {
        return priceId == null || goodsCode == null;
    }

    public static Price of(GoodsImageDto goodsImageDto, Member currentUser) {
        Goods goods = Goods.builder().updateDate(LocalDateTime.now()).build();
        PriceId priceId = new PriceId(goods.getGoodsCode(), goods.getUpdateDate());
        return Price.builder()
                .priceId(priceId)
                .goodsCode(Goods.of(goodsImageDto, currentUser))
                .supplyPrice(goodsImageDto.getSupplyPrice())
                .salePrice(goodsImageDto.getSalePrice())
                .maxBuyQuantity(goodsImageDto.getMaxBuyQuantity())
                .buyLimitYesNo(goodsImageDto.getBuyLimitYesNo())
                .buyLimitCondition(goodsImageDto.getBuyLimitCondition())
                .salePeriodYesNo(goodsImageDto.getSalePeriodYesNo())
                .saleStartDate(goodsImageDto.getSaleStartDate())
                .saleEndDate(goodsImageDto.getSaleEndDate())
                .saleConditionCode("10")
                .register(currentUser.getMemberNo())
                .build();
    }
}
