package com.mo2ver.web.domain.display.domain;

import com.mo2ver.web.domain.display.dto.BannerImageDetailInfo;
import com.mo2ver.web.domain.display.dto.BannerImageInfo;
import com.mo2ver.web.domain.display.dto.GoodsDisplayInfo;
import com.mo2ver.web.domain.display.dto.GoodsDisplayProductInfo;
import com.mo2ver.web.domain.member.domain.Member;
import com.mo2ver.web.global.common.util.BeanUtil;
import com.mo2ver.web.global.common.util.JasyptUtil;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "DP_BNNR_MNG")    // 전시배너관리
@Getter @Setter
@EqualsAndHashCode(of = "bannerManageNo")
@Builder @NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class BannerManage {

    @Id
    @Column(name = "BNNR_MNG_NO", columnDefinition = "BIGINT(20) COMMENT '배너관리번호'")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 생성을 데이터베이스에 위임 (AUTO_INCREMENT)
    private Long bannerManageNo;

    @Column(name = "SUBJ", columnDefinition = "VARCHAR(255) COMMENT '제목'")
    private String subject;

    @Column(name = "DP_STRT_DE", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '전시시작일자'")
    private Date displayStartDate;

    @Column(name = "DP_END_DE", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '전시종료일자'")
    private Date displayEndDate;

    @Column(name = "DP_TPL_CD", nullable = false, columnDefinition = "CHAR(10) COMMENT '템플릿유형'")
    private String displayTemplateCode;

    @Column(name = "DP_CND_CD", nullable = false, columnDefinition = "CHAR(10) COMMENT '전시상태코드'")
    private String displayConditionCode;

    @Column(name = "DP_YN", columnDefinition = "CHAR(1) COMMENT '전시여부'")
    private Character displayYesNo;

    @OneToMany(mappedBy = "bannerManageNo", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BannerDetail> bannerDetailList = new ArrayList<>();

    @OneToMany(mappedBy = "bannerManageNo", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BannerProduct> bannerProductList = new ArrayList<>();

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

    public BannerManage(GoodsDisplayInfo goodsDisplayInfo, Member currentUser) {
        this.createOrUpdateBannerManage(goodsDisplayInfo, currentUser);
        this.displayTemplateCode = goodsDisplayInfo.getType();
        this.register = currentUser.getMemberNo();

        this.bannerProductList.addAll(this.createBannerProductList(goodsDisplayInfo.getGoods(), currentUser));

        this.sortBannerProductList();
    }

    public BannerManage(BannerImageInfo bannerImageInfo, Member currentUser) {
        this.createOrUpdateBannerManage(bannerImageInfo, currentUser);
        this.displayTemplateCode = bannerImageInfo.getType();
        this.register = currentUser.getMemberNo();

        this.bannerDetailList.addAll(this.createBannerDetailList(bannerImageInfo.getBnnrImg(), currentUser));

        this.sortBannerDetailList();
    }

    public void update(GoodsDisplayInfo goodsDisplayInfo, Member currentUser) {
        this.createOrUpdateBannerManage(goodsDisplayInfo, currentUser);

        int oldSize = this.bannerProductList.size();
        this.bannerProductList.addAll(this.updateBannerProductList(goodsDisplayInfo.getGoods()));
        this.bannerProductList.subList(0, oldSize).clear();

        this.sortBannerProductList();
    }

    public void update(BannerImageInfo bannerImageInfo, Member currentUser) {
        this.createOrUpdateBannerManage(bannerImageInfo, currentUser);

        int oldSize = this.bannerDetailList.size();
        this.bannerDetailList.addAll(this.updateBannerDetailList(bannerImageInfo.getBnnrImg()));
        this.bannerDetailList.subList(0, oldSize).clear();

        this.sortBannerDetailList();
    }

    private void createOrUpdateBannerManage(GoodsDisplayInfo goodsDisplayInfo, Member currentUser) {
        this.subject = goodsDisplayInfo.getTitle();
        this.displayStartDate = goodsDisplayInfo.getStartDate();
        this.displayEndDate = goodsDisplayInfo.getEndDate();
        this.displayConditionCode = goodsDisplayInfo.getCode();
        this.displayYesNo = goodsDisplayInfo.getUseyn();
        this.updater = currentUser.getMemberNo();
    }

    private void createOrUpdateBannerManage(BannerImageInfo bannerImageInfo, Member currentUser) {
        this.subject = bannerImageInfo.getTitle();
        this.displayStartDate = bannerImageInfo.getStartDate();
        this.displayEndDate = bannerImageInfo.getEndDate();
        this.displayConditionCode = bannerImageInfo.getCode();
        this.displayYesNo = bannerImageInfo.getUseyn();
        this.updater = currentUser.getMemberNo();
    }

    private List<BannerProduct> createBannerProductList(List<GoodsDisplayProductInfo> bannerGoodsProductInfoList, Member currentUser) {
        return bannerGoodsProductInfoList.stream()
                .map(info -> BannerProduct.of(this, info, currentUser))
                .collect(Collectors.toList());
    }

    private List<BannerDetail> createBannerDetailList(List<BannerImageDetailInfo> bannerImageDetailInfoList, Member currentUser) {
        return bannerImageDetailInfoList.stream()
                .map(info -> BannerDetail.of(this, info, currentUser))
                .collect(Collectors.toList());
    }

    private List<BannerProduct> updateBannerProductList(List<GoodsDisplayProductInfo> bannerGoodsProductInfoList) {
        return bannerGoodsProductInfoList.stream()
                .map(this::createOrUpdateBannerProduct)
                .collect(Collectors.toList());
    }

    private List<BannerDetail> updateBannerDetailList(List<BannerImageDetailInfo> bannerImageDetailInfoList) {
        return bannerImageDetailInfoList.stream()
                .map(this::createOrUpdateBannerDetail)
                .collect(Collectors.toList());
    }

    private BannerProduct createOrUpdateBannerProduct(GoodsDisplayProductInfo goodsDisplayProductInfo) {
        BannerProduct bannerProduct = this.bannerProductList.stream()
                .filter(it -> it.getBannerProductId().equals(goodsDisplayProductInfo.getId()))
                .findFirst()
                .orElseGet(() -> BannerProduct.from(this));
        bannerProduct.setProductCode(goodsDisplayProductInfo.getGoodsCode());
        bannerProduct.setProductName(goodsDisplayProductInfo.getGoodsName());
        bannerProduct.setUpdater(this.updater);
        return bannerProduct;
    }

    private BannerDetail createOrUpdateBannerDetail(BannerImageDetailInfo bannerImageDetailInfo) {
        BannerDetail bannerDetail = this.bannerDetailList.stream()
                .filter(it -> it.getBannerDetailId().equals(bannerImageDetailInfo.getId()))
                .findFirst()
                .orElseGet(() -> BannerDetail.from(this));
        bannerDetail.setBannerContents(bannerImageDetailInfo.getTitle());
        bannerDetail.setConnectUrl(bannerImageDetailInfo.getCnntUrl());
        bannerDetail.setImageAttachFile(Integer.parseInt(getDecryptor(bannerImageDetailInfo.getFile())));
        bannerDetail.setUseYesNo(bannerImageDetailInfo.getUseyn());
        bannerDetail.setUpdater(this.updater);
        return bannerDetail;
    }

    private void sortBannerProductList() {
        int index = 1;
        for (BannerProduct bannerProduct: this.bannerProductList) {
            bannerProduct.setSortSequence(index++);
        }
    }

    private void sortBannerDetailList() {
        int index = 1;
        for (BannerDetail bannerDetail: this.bannerDetailList) {
            bannerDetail.setDetailSequence(index++);
        }
    }

    public static BannerManage of(BannerImageInfo bannerImageInfo, Member currentUser) {
        return BannerManage.builder()
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
