package com.mo2ver.master.domain.display.domain;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "DP_BNNR_DTL")
@Getter @Setter
@EqualsAndHashCode(of = "bannerManageNo")
@Builder @NoArgsConstructor @AllArgsConstructor
public class Detail {

    @Id
    @Column(name = "BNNR_MNG_NO", columnDefinition = "BIGINT(20) COMMENT '배너관리번호'")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 생성을 데이터베이스에 위임 (AUTO_INCREMENT)
    private Long bannerManageNo;

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
}
