package com.mo2ver.master.domain.display.domain;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "DP_BNNR_MNG")
@Getter @Setter
@EqualsAndHashCode(of = "bannerManageNo")
@Builder @NoArgsConstructor @AllArgsConstructor
public class Manage {

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
