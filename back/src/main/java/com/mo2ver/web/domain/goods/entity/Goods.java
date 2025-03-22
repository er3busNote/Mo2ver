package com.mo2ver.web.domain.goods.entity;

import com.mo2ver.web.common.file.dto.FileAttachInfo;
import com.mo2ver.web.domain.goods.dto.request.GoodsImageAttachRequest;
import com.mo2ver.web.domain.goods.dto.request.GoodsImageRequest;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.global.common.utils.BeanUtil;
import com.mo2ver.web.global.common.utils.JasyptUtil;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "GD")   // 상품
@Getter @Setter
@EqualsAndHashCode(of = "goodsCode")
@Builder @NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Goods {

    @Id
    @GeneratedValue(generator = "goodsCode")
    @GenericGenerator(name = "goodsCode", strategy = "com.mo2ver.web.domain.goods.entity.GoodsGenerator")
    @Column(name = "GD_CD", columnDefinition = "CHAR(10) COMMENT '상품코드'")
    private String goodsCode;

    @Column(name = "GD_NM", columnDefinition = "VARCHAR(100) COMMENT '상품명'")
    private String goodsName;

    @Column(name = "L_CAT_CD", columnDefinition = "CHAR(10) COMMENT '대카테고리코드'")
    private String largeCategoryCode;

    @Column(name = "M_CAT_CD", columnDefinition = "CHAR(10) COMMENT '중카테고리코드'")
    private String mediumCategoryCode;

    @Column(name = "S_CAT_CD", columnDefinition = "CHAR(10) COMMENT '소카테고리코드'")
    private String smallCategoryCode;

    @Column(name = "GD_CND", columnDefinition = "CHAR(10) COMMENT '상품상태'")
    private String goodsCondition;

    @Column(name = "GD_GENDER", columnDefinition = "VARCHAR(12) COMMENT '성별'")
    private String goodsGender;

    @Column(name = "GD_BRAND", columnDefinition = "VARCHAR(100) COMMENT '브랜드'")
    private String goodsBrand;

    @Column(name = "GD_YEAR", columnDefinition = "VARCHAR(5) COMMENT '제조일자'")
    private String goodsYear;

    @Column(name = "KWD", columnDefinition = "VARCHAR(200) COMMENT '키워드'")
    private String keyword;

    @Column(name = "SUMM_INFO", columnDefinition = "VARCHAR(200) COMMENT '요약정보'")
    private String summaryInfo;

    @Column(name = "REVW_CNT", columnDefinition = "INT(11) COMMENT '조회수'")
    private Integer reviewCount;

//    @OneToOne(mappedBy = "goodsCode", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    private Price priceCode;
//
//    @OneToOne(mappedBy = "applyDate", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    private Price priceDate;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumns(value = {
            @JoinColumn(name = "GD_CD", referencedColumnName = "GD_CD", insertable = false, updatable = false),
            @JoinColumn(name = "UPD_DT", referencedColumnName = "APPL_DT", insertable = false, updatable = false)
    }, foreignKey = @ForeignKey(name = "FK_GD_PRC_CD_TO_GD", value = ConstraintMode.NO_CONSTRAINT))
    private Price price;

    @OneToMany(mappedBy = "goodsCode", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Discount> goodsDiscountList = new ArrayList<>();

    @OneToMany(mappedBy = "goodsCode", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GoodsImage> goodsImageList = new ArrayList<>();

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

    private static String getDecryptor(String attachFile) {
        JasyptUtil jasyptUtil = BeanUtil.getBean(JasyptUtil.class);
        return jasyptUtil.decrypt(attachFile.replace(" ", "+"));
    }

    public Goods(GoodsImageAttachRequest goodsImageAttachRequest, Member currentUser) {
        this.createOrUpdateGoods(goodsImageAttachRequest, currentUser);
        this.goodsCondition = "10";
        this.register = currentUser.getMemberNo();
        this.updateDate = LocalDateTime.now();

        this.price = this.createGoodsPrice(goodsImageAttachRequest, currentUser);
        if('Y' == goodsImageAttachRequest.getSalePeriodYesNo()){
            this.goodsDiscountList.addAll(this.createGoodsDiscountList(goodsImageAttachRequest, currentUser));
        }
        this.goodsImageList.addAll(this.createGoodsImageList(goodsImageAttachRequest.getGoodsImg(), currentUser));

        this.sortGoodsImageList();
    }

    private void createOrUpdateGoods(GoodsImageRequest goodsImageRequest, Member currentUser) {
        this.goodsName = goodsImageRequest.getGoodsName();
        this.largeCategoryCode = goodsImageRequest.getLargeCategoryCode();
        this.mediumCategoryCode = goodsImageRequest.getMediumCategoryCode();
        this.smallCategoryCode = goodsImageRequest.getSmallCategoryCode();
        this.goodsGender = goodsImageRequest.getGoodsGender();
        this.goodsBrand = goodsImageRequest.getGoodsBrand();
        this.goodsYear = goodsImageRequest.getGoodsYear();
        this.keyword = goodsImageRequest.getKeyword();
        this.summaryInfo = goodsImageRequest.getSummaryInfo();
        this.updater = currentUser.getMemberNo();
    }

    private Price createGoodsPrice(GoodsImageRequest goodsImageRequest, Member currentUser) {
        return Price.of(this, goodsImageRequest, currentUser);
    }

    private List<Discount> createGoodsDiscountList(GoodsImageRequest goodsImageRequest, Member currentUser) {
        return Collections.singletonList(Discount.of(this, goodsImageRequest, currentUser));
    }

    private List<GoodsImage> createGoodsImageList(List<FileAttachInfo> fileAttachInfoList, Member currentUser) {
        return fileAttachInfoList.stream()
                .map(info -> GoodsImage.of(this, Integer.parseInt(getDecryptor(info.getFileAttachCode())), info.getFileExtension(), currentUser))
                .collect(Collectors.toList());
    }

    private void sortGoodsImageList() {
        int index = 1;
        for (GoodsImage goodsImage : this.goodsImageList) {
            if(index == 1) goodsImage.setBasicImageYesNo('Y');
            else goodsImage.setBasicImageYesNo('N');
            goodsImage.setSortSequence(index++);
        }
    }

    public static Goods of(GoodsImageRequest goodsImageRequest, Member currentUser) {
        return Goods.builder()
                .goodsName(goodsImageRequest.getGoodsName())
                .largeCategoryCode(goodsImageRequest.getLargeCategoryCode())
                .mediumCategoryCode(goodsImageRequest.getMediumCategoryCode())
                .smallCategoryCode(goodsImageRequest.getSmallCategoryCode())
                .goodsCondition("10")   // 초기값 : 등록(10)
                .goodsGender(goodsImageRequest.getGoodsGender())
                .goodsBrand(goodsImageRequest.getGoodsBrand())
                .goodsYear(goodsImageRequest.getGoodsYear())
                .summaryInfo(goodsImageRequest.getSummaryInfo())
                .keyword(goodsImageRequest.getKeyword())
                .register(currentUser.getMemberNo())
                .updater(currentUser.getMemberNo())
                .build();
    }
}
