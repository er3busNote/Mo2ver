package com.mo2ver.web.domain.display.entity;

import com.mo2ver.web.domain.display.dto.BannerImageDetailInfo;
import com.mo2ver.web.domain.display.dto.BannerImageInfo;
import com.mo2ver.web.domain.display.dto.GoodsDisplayInfo;
import com.mo2ver.web.domain.display.dto.GoodsDisplayProductInfo;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.global.common.utils.JasyptUtil;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "DP_BNNR")    // 전시배너관리
@Getter @Setter
@EqualsAndHashCode(of = "bannerNo")
@Builder @NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Banner {

    @Id
    @GeneratedValue(generator = "deliveryCode")
    @GenericGenerator(name = "deliveryCode", strategy = "com.mo2ver.web.domain.display.entity.BannerGenerator")
    @Column(name = "BNNR_NO", columnDefinition = "CHAR(10) COMMENT '배너번호'")
    private String bannerNo;

    @Column(name = "SUBJ", columnDefinition = "VARCHAR(255) COMMENT '제목'")
    private String subject;

    @Column(name = "DP_STRT_DE", nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '전시시작일자'")
    private Date displayStartDate;

    @Column(name = "DP_END_DE", nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '전시종료일자'")
    private Date displayEndDate;

    @Column(name = "DP_TPL_CD", updatable = false, nullable = false, columnDefinition = "CHAR(10) COMMENT '템플릿유형'")
    private String displayTemplateCode;

    @Column(name = "DP_CND_CD", nullable = false, columnDefinition = "CHAR(10) COMMENT '전시상태코드'")
    private String displayConditionCode;

    @Column(name = "DP_YN", columnDefinition = "CHAR(1) COMMENT '전시여부'")
    private Character displayYesNo;

    @OneToMany(mappedBy = "banner", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BannerDetail> bannerDetails = new ArrayList<>();

    @OneToMany(mappedBy = "banner", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BannerProduct> bannerProducts = new ArrayList<>();

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

    public Banner(GoodsDisplayInfo goodsDisplayInfo, Member currentUser) {
        this.createOrUpdateBanner(goodsDisplayInfo, currentUser);
        this.displayTemplateCode = goodsDisplayInfo.getType();
        this.register = currentUser.getMemberNo();

        this.bannerProducts.addAll(this.createBannerProducts(goodsDisplayInfo.getGoods(), currentUser));

        this.sortBannerProducts();
    }

    public Banner(BannerImageInfo bannerImageInfo, Member currentUser) {
        this.createOrUpdateBanner(bannerImageInfo, currentUser);
        this.displayTemplateCode = bannerImageInfo.getType();
        this.register = currentUser.getMemberNo();

        this.bannerDetails.addAll(this.createBannerDetails(bannerImageInfo.getBnnrImg(), currentUser));

        this.sortBannerDetails();
    }

    public void update(GoodsDisplayInfo goodsDisplayInfo, Member currentUser) {
        this.createOrUpdateBanner(goodsDisplayInfo, currentUser);

        int oldSize = this.bannerProducts.size();
        this.bannerProducts.addAll(this.updateBannerProducts(goodsDisplayInfo.getGoods()));
        this.bannerProducts.subList(0, oldSize).clear();

        this.sortBannerProducts();
    }

    public void update(BannerImageInfo bannerImageInfo, Member currentUser) {
        this.createOrUpdateBanner(bannerImageInfo, currentUser);

        int oldSize = this.bannerDetails.size();
        this.bannerDetails.addAll(this.updateBannerDetails(bannerImageInfo.getBnnrImg()));
        this.bannerDetails.subList(0, oldSize).clear();

        this.sortBannerDetails();
    }

    private void createOrUpdateBanner(GoodsDisplayInfo goodsDisplayInfo, Member currentUser) {
        this.subject = goodsDisplayInfo.getTitle();
        this.displayStartDate = goodsDisplayInfo.getStartDate();
        this.displayEndDate = goodsDisplayInfo.getEndDate();
        this.displayConditionCode = goodsDisplayInfo.getCode();
        this.displayYesNo = goodsDisplayInfo.getUseyn();
        this.updater = currentUser.getMemberNo();
    }

    private void createOrUpdateBanner(BannerImageInfo bannerImageInfo, Member currentUser) {
        this.subject = bannerImageInfo.getTitle();
        this.displayStartDate = bannerImageInfo.getStartDate();
        this.displayEndDate = bannerImageInfo.getEndDate();
        this.displayConditionCode = bannerImageInfo.getCode();
        this.displayYesNo = bannerImageInfo.getUseyn();
        this.updater = currentUser.getMemberNo();
    }

    private List<BannerProduct> createBannerProducts(List<GoodsDisplayProductInfo> bannerGoodsProducts, Member currentUser) {
        return bannerGoodsProducts.stream()
                .map(info -> BannerProduct.of(this, info, currentUser))
                .collect(Collectors.toList());
    }

    private List<BannerDetail> createBannerDetails(List<BannerImageDetailInfo> bannerImageDetails, Member currentUser) {
        return bannerImageDetails.stream()
                .map(info -> BannerDetail.of(this, info, currentUser))
                .collect(Collectors.toList());
    }

    private List<BannerProduct> updateBannerProducts(List<GoodsDisplayProductInfo> bannerGoodsProducts) {
        return bannerGoodsProducts.stream()
                .map(this::createOrUpdateBannerProduct)
                .collect(Collectors.toList());
    }

    private List<BannerDetail> updateBannerDetails(List<BannerImageDetailInfo> bannerImageDetails) {
        return bannerImageDetails.stream()
                .map(this::createOrUpdateBannerDetail)
                .collect(Collectors.toList());
    }

    private BannerProduct createOrUpdateBannerProduct(GoodsDisplayProductInfo goodsDisplayProductInfo) {
        BannerProduct bannerProduct = this.bannerProducts.stream()
                .filter(it -> it.getBannerProductId().equals(goodsDisplayProductInfo.getId()))
                .findFirst()
                .orElseGet(() -> BannerProduct.from(this));
        bannerProduct.setProductCode(goodsDisplayProductInfo.getGoodsCode());
        bannerProduct.setProductName(goodsDisplayProductInfo.getGoodsName());
        bannerProduct.setUpdater(this.updater);
        return bannerProduct;
    }

    private BannerDetail createOrUpdateBannerDetail(BannerImageDetailInfo bannerImageDetailInfo) {
        BannerDetail bannerDetail = this.bannerDetails.stream()
                .filter(it -> it.getBannerDetailId().equals(bannerImageDetailInfo.getId()))
                .findFirst()
                .orElseGet(() -> BannerDetail.from(this));
        bannerDetail.setBannerContents(bannerImageDetailInfo.getTitle());
        bannerDetail.setConnectUrl(bannerImageDetailInfo.getCnntUrl());
        bannerDetail.setImageAttachFile(JasyptUtil.getDecryptor(bannerImageDetailInfo.getFile()));
        bannerDetail.setUseYesNo(bannerImageDetailInfo.getUseyn());
        bannerDetail.setUpdater(this.updater);
        return bannerDetail;
    }

    private void sortBannerProducts() {
        int index = 1;
        for (BannerProduct bannerProduct: this.bannerProducts) {
            bannerProduct.setSortSequence(index++);
        }
    }

    private void sortBannerDetails() {
        int index = 1;
        for (BannerDetail bannerDetail: this.bannerDetails) {
            bannerDetail.setDetailSequence(index++);
        }
    }

    public static Banner of(BannerImageInfo bannerImageInfo, Member currentUser) {
        return Banner.builder()
                .subject(bannerImageInfo.getTitle())
                .displayStartDate(bannerImageInfo.getStartDate())
                .displayEndDate(bannerImageInfo.getEndDate())
                .displayTemplateCode(bannerImageInfo.getType())
                .displayConditionCode(bannerImageInfo.getCode())
                .displayYesNo(bannerImageInfo.getUseyn())
                .register(currentUser.getMemberNo())
                .updater(currentUser.getMemberNo())
                .build();
    }
}
