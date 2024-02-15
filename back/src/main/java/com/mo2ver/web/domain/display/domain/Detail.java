package com.mo2ver.web.domain.display.domain;

import com.mo2ver.web.domain.display.dto.BannerImageDetailDto;
import com.mo2ver.web.domain.member.domain.Member;
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
                @Index(
                        name="FK_DP_BNNR_MNG_TO_DP_BNNR_DTL",
                        columnList="BNNR_MNG_NO"
                )
        }
)
@Getter @Setter
@EqualsAndHashCode(of = "bannerManageNo")
@Builder @NoArgsConstructor @AllArgsConstructor
public class Detail {

    @Id
    @Column(name = "BNNR_DTL_ID", columnDefinition = "BIGINT(20) COMMENT '배너상세관리번호'")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 생성을 데이터베이스에 위임 (AUTO_INCREMENT)
    private Long bannerDetailId;

    @ManyToOne(fetch = FetchType.LAZY)  // 지연로딩 (N+1 문제)
    @JoinColumn(
            name = "BNNR_MNG_NO",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(
                    name = "FK_DP_BNNR_MNG_TO_DP_BNNR_DTL",
                    foreignKeyDefinition = "FOREIGN KEY (BNNR_MNG_NO) REFERENCES DP_BNNR_MNG(BNNR_MNG_NO) ON UPDATE RESTRICT ON DELETE RESTRICT"),
            columnDefinition = "BIGINT(20) COMMENT '배너관리번호'"
    )
    private Manage bannerManageNo;

    @Column(name= "DTL_SEQ", columnDefinition = "INT(11) COMMENT '상세순서'")
    private Integer detailSequence;

    @Column(name = "IMG_ATT_FILE", columnDefinition = "VARCHAR(50) COMMENT '이미지첨부파일'")
    private String imageAttachFile;

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

    public static Detail of(Manage manage, BannerImageDetailDto bannerImageDetailDto, String fileNameWithoutExtension, Integer index, Member currentUser) {
        return Detail.builder()
                .bannerManageNo(manage)
                .detailSequence(index)
                .imageAttachFile(fileNameWithoutExtension)
                .connectUrl(bannerImageDetailDto.getCnntUrl())
                .bannerContents(bannerImageDetailDto.getTitle())
                .sortSequence(1)
                .useYesNo(bannerImageDetailDto.getUseyn())
                .register(currentUser.getMemberNo())
                .updater(currentUser.getMemberNo())
                .build();
    }
}
