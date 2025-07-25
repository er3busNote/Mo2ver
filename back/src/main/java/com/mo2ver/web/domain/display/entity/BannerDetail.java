package com.mo2ver.web.domain.display.entity;

import com.mo2ver.web.domain.display.dto.BannerImageDetailInfo;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.global.common.utils.JasyptUtil;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "DP_BNNR_DTL", // 전시배너상세
        indexes={
                @Index(name="FK_DP_BNNR_TO_DP_BNNR_DTL", columnList="BNNR_NO")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = "bannerDetailId")
@Builder @NoArgsConstructor @AllArgsConstructor
public class BannerDetail {

    @Id
    @Column(name = "BNNR_DTL_ID", columnDefinition = "BIGINT(20) COMMENT '배너상세번호'")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 생성을 데이터베이스에 위임 (AUTO_INCREMENT)
    private Long bannerDetailId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "BNNR_NO",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_DP_BNNR_TO_DP_BNNR_DTL"),
            columnDefinition = "CHAR(10) COMMENT '배너번호'"
    )
    private Banner banner;

    @Column(name = "IMG_ATT_FILE", columnDefinition = "BIGINT(20) COMMENT '이미지첨부파일'")
    private Integer imageAttachFile;

    @Column(name = "CNNT_URL", columnDefinition = "VARCHAR(255) COMMENT '연결URL'")
    private String connectUrl;

    @Column(name = "BNNR_CONTS", columnDefinition = "VARCHAR(100) COMMENT '배너내용'")
    private String bannerContents;

    @Column(name= "SORT_SEQ", columnDefinition = "INT(11) COMMENT '정렬순서'")
    private Integer sortSequence;

    @Column(name = "USE_YN", columnDefinition = "CHAR(1) COMMENT '사용여부'")
    private Character useYesNo;

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

    public static BannerDetail from(Banner banner) {
        return BannerDetail.builder()
                .banner(banner)
                .sortSequence(1)
                .register(banner.getRegister())
                .updater(banner.getUpdater())
                .build();
    }

    public static BannerDetail of(Banner banner, BannerImageDetailInfo bannerImageDetailInfo, Member currentUser) {
        return BannerDetail.builder()
                .banner(banner)
                .imageAttachFile(JasyptUtil.getDecryptor(bannerImageDetailInfo.getFile()))
                .connectUrl(bannerImageDetailInfo.getCnntUrl())
                .bannerContents(bannerImageDetailInfo.getTitle())
                .sortSequence(1)
                .useYesNo(bannerImageDetailInfo.getUseyn())
                .register(currentUser.getMemberNo())
                .updater(currentUser.getMemberNo())
                .build();
    }

    public static BannerDetail of(Banner banner, BannerImageDetailInfo bannerImageDetailInfo, Integer imageAttachFile, Integer index, Member currentUser) {
        return BannerDetail.builder()
                .banner(banner)
                .imageAttachFile(imageAttachFile)
                .connectUrl(bannerImageDetailInfo.getCnntUrl())
                .bannerContents(bannerImageDetailInfo.getTitle())
                .sortSequence(1)
                .useYesNo(bannerImageDetailInfo.getUseyn())
                .register(currentUser.getMemberNo())
                .updater(currentUser.getMemberNo())
                .build();
    }
}
