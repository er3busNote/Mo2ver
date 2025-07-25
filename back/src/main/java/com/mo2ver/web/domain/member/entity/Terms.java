package com.mo2ver.web.domain.member.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "TERMS")      // 약관관리
@Getter @Setter
@EqualsAndHashCode(of = "termsNo")
@Builder @NoArgsConstructor @AllArgsConstructor
public class Terms {

    @Id
    @GeneratedValue(generator = "termsNo")
    @GenericGenerator(name = "termsNo", strategy = "com.mo2ver.web.domain.member.entity.TermsGenerator")
    @Column(name = "TERMS_NO", columnDefinition = "CHAR(10) COMMENT '약관번호'")
    private String termsNo;

    @Column(name = "TERMS_TY_CD", columnDefinition = "CHAR(5) COMMENT '약관유형코드'")
    private String termsTypeCode;

    @Column(name = "TERMS_DSC", columnDefinition = "VARCHAR(100) COMMENT '약관설명'")
    private String termsDescription;

    @Column(name = "TERMS_VER", columnDefinition = "VARCHAR(10) COMMENT '약관버전'")
    private String termsVersion;

    @Column(name = "TERMS_HTML", columnDefinition = "TEXT COMMENT '약관HTML'")
    private String termsHtml;

    @Column(name = "DP_YN", nullable = false, columnDefinition = "CHAR(1) COMMENT '전시여부'")
    @NotBlank
    private Character displayYesNo;

    @Column(name = "DP_START_DE", columnDefinition = "DATE COMMENT '전시시작일자'")
    private Date displayStartDate;

    @Column(name = "ESSN_AGR_YN", nullable = false, columnDefinition = "CHAR(1) COMMENT '필수동의여부'")
    @NotBlank
    private Character essentialAgreeYesNo;

    @Column(name = "UPD_CONTS", columnDefinition = "VARCHAR(200) COMMENT '수정내용'")
    private String updateContents;

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
