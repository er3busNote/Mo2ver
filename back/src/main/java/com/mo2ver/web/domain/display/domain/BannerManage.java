package com.mo2ver.web.domain.display.domain;

import com.mo2ver.web.domain.display.dto.BannerImageDetailInfo;
import com.mo2ver.web.domain.display.dto.BannerImageInfo;
import com.mo2ver.web.domain.display.dto.GoodsDisplayInfo;
import com.mo2ver.web.domain.member.domain.Member;
import com.mo2ver.web.global.common.util.BeanUtil;
import com.mo2ver.web.global.common.util.JasyptUtil;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "DP_BNNR_MNG")    // 전시배너관리
@Getter @Setter
@EqualsAndHashCode(of = "bannerManageNo")
@Builder @NoArgsConstructor @AllArgsConstructor
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
    private List<BannerDetail> bannerDetailList;

    @OneToMany(mappedBy = "bannerManageNo", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BannerProduct> bannerProductList;

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
        return jasyptUtil.decrypt(attachFile);
    }

    public void update(BannerImageInfo bannerImageInfo, Member currentUser) {
        this.subject = bannerImageInfo.getTitle();
        this.displayStartDate = bannerImageInfo.getStartDate();
        this.displayEndDate = bannerImageInfo.getEndDate();
        this.displayConditionCode = bannerImageInfo.getCode();
        this.displayYesNo = bannerImageInfo.getUseyn();
        this.updater = currentUser.getMemberNo();

        int oldSize = this.bannerDetailList.size();
        this.bannerDetailList.addAll(this.updateBannerDetailList(bannerImageInfo.getBnnrImg()));
        this.bannerDetailList.subList(0, oldSize).clear();

        sortBannerDetailList();
    }

    private List<BannerDetail> updateBannerDetailList(List<BannerImageDetailInfo> bannerImageDetailInfoList) {
        return bannerImageDetailInfoList.stream()
                .map(this::createOrUpdateBannerDetail)
                .collect(Collectors.toList());
    }

    private BannerDetail createOrUpdateBannerDetail(BannerImageDetailInfo bannerImageDetailInfo) {
        BannerDetail bannerDetail = this.bannerDetailList.stream()
                .filter(it -> it.getBannerDetailId().equals(bannerImageDetailInfo.getId()))
                .findFirst()
                .orElseGet(() -> BannerDetail.from(from(this.bannerManageNo, this.updater)));
        bannerDetail.setBannerContents(bannerImageDetailInfo.getTitle());
        bannerDetail.setConnectUrl(bannerImageDetailInfo.getCnntUrl());
        bannerDetail.setImageAttachFile(Integer.parseInt(getDecryptor(bannerImageDetailInfo.getFile())));
        bannerDetail.setUseYesNo(bannerImageDetailInfo.getUseyn());
        bannerDetail.setUpdater(this.updater);
        return bannerDetail;
    }

    private void sortBannerDetailList() {
        int index = 1;
        for (BannerDetail bannerDetail: this.bannerDetailList) {
            bannerDetail.setDetailSequence(index++);
        }
    }

    public static BannerManage from(Long bannerManageNo, String updater) {
        return BannerManage.builder()
                .bannerManageNo(bannerManageNo)
                .register(updater)
                .updater(updater)
                .build();
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

    public static BannerManage of(GoodsDisplayInfo goodsDisplayInfo, Member currentUser) {
        BannerManage bannerManage = BannerManage.builder()
                .subject(goodsDisplayInfo.getTitle())
                .displayStartDate(goodsDisplayInfo.getStartDate())
                .displayEndDate(goodsDisplayInfo.getEndDate())
                .displayTemplateCode(goodsDisplayInfo.getType())
                .displayConditionCode(goodsDisplayInfo.getCode())
                .displayYesNo(goodsDisplayInfo.getUseyn())
                .register(currentUser.getMemberNo())
                .updater(currentUser.getMemberNo())
                .build();
        bannerManage.setBannerProductList(goodsDisplayInfo.getGoods().stream()
                .map(data -> BannerProduct.of(bannerManage, data, currentUser))
                .collect(Collectors.toList()));
        return bannerManage;
    }
}
