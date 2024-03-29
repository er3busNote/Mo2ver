package com.mo2ver.web.domain.display.domain;

import com.mo2ver.web.domain.display.dto.BannerImageDto;
import com.mo2ver.web.domain.display.dto.GoodsDisplayDto;
import com.mo2ver.web.domain.member.domain.Member;
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

    public static BannerManage of(BannerImageDto bannerImageDto, Member currentUser) {
        return BannerManage.builder()
                .subject(bannerImageDto.getTitle())
                .displayStartDate(bannerImageDto.getStartDate())
                .displayEndDate(bannerImageDto.getEndDate())
                .displayYesNo(bannerImageDto.getUseyn())
                .register(currentUser.getMemberNo())
                .updater(currentUser.getMemberNo())
                .build();
    }

    public static BannerManage of(GoodsDisplayDto goodsDisplayDto, Member currentUser) {
        BannerManage bannerManage = BannerManage.builder()
                .subject(goodsDisplayDto.getTitle())
                .displayStartDate(goodsDisplayDto.getStartDate())
                .displayEndDate(goodsDisplayDto.getEndDate())
                .displayYesNo(goodsDisplayDto.getUseyn())
                .register(currentUser.getMemberNo())
                .updater(currentUser.getMemberNo())
                .build();
        bannerManage.setBannerProductList(goodsDisplayDto.getGoods().stream()
                .map(data -> BannerProduct.of(bannerManage, data, currentUser))
                .collect(Collectors.toList()));
        return bannerManage;
    }
}
