package com.mo2ver.web.domain.member.domain;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(
        name = "TERMS_AGR",
        indexes={
                @Index(
                        name="FK_MBR_TO_TERMS_AGR",
                        columnList="MBR_NO"
                )
        }
)
@Getter @Setter
@EqualsAndHashCode(of = {"termsManageNo", "memberNo"})
@Builder @NoArgsConstructor @AllArgsConstructor
public class TermsAgree implements Serializable {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)  // 지연로딩 (N+1 문제)
    @JoinColumn(
            name = "TERMS_MNG_NO",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(
                    name = "FK_TERMS_MNG_TO_TERMS_AGR",
                    foreignKeyDefinition = "FOREIGN KEY (TERMS_MNG_NO) REFERENCES TERMS_MNG(TERMS_MNG_NO) ON UPDATE RESTRICT ON DELETE RESTRICT"),
            columnDefinition = "BIGINT(20) COMMENT '약관관리번호'"
    )
    private TermsManage termsManageNo;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)  // 지연로딩 (N+1 문제)
    @JoinColumn(
            name = "MBR_NO",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(
                    name = "FK_MBR_TO_TERMS_AGR",
                    foreignKeyDefinition = "FOREIGN KEY (MBR_NO) REFERENCES MEMBER(MBR_NO) ON UPDATE RESTRICT ON DELETE RESTRICT"),
            columnDefinition = "CHAR(10) COMMENT '회원번호'"
    )
    private Member memberNo;

    @Column(name = "AGR_YN", columnDefinition = "CHAR(1) COMMENT '동의여부'")
    @ColumnDefault("'N'")
    private Character agreeYesNo;

    @Column(name = "AGR_DE", columnDefinition = "DATE COMMENT '동의일자'")
    private Date agreeDate;

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
