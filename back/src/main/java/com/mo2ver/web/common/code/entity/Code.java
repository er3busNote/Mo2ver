package com.mo2ver.web.common.code.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "CMM_CD",    // 공통코드
        indexes={
                @Index(name="FK_CMM_CD_GRP_TO_CMM_CD", columnList="CMM_GRP_CD")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = {"commonCode", "commonGroupCode"})
@Builder @NoArgsConstructor @AllArgsConstructor
public class Code implements Serializable {

    @Id
    @Column(name = "CMM_CD", columnDefinition = "CHAR(5) COMMENT '공통코드'")
    private String commonCode;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)  // 지연로딩 (N+1 문제)
    @JoinColumn(
            name = "CMM_GRP_CD",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_CMM_GRP_CD"),
            columnDefinition = "CHAR(5) COMMENT '공통그룹코드'"
    )
    private GroupCode commonGroupCode;

    @Column(name = "CMM_CD_NM", columnDefinition = "VARCHAR(50) COMMENT '공통코드명'")
    private String commonCodeName;

    @Column(name = "DSC", columnDefinition = "VARCHAR(100) COMMENT '설명'")
    private String description;

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
}
