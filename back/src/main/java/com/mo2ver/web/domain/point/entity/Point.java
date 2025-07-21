package com.mo2ver.web.domain.point.entity;

import com.mo2ver.web.domain.member.entity.Member;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "PNT", // 포인트
        indexes={
                @Index(name="FK_MBR_TO_PNT", columnList="MBR_NO")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = "pointManageNo")
@Builder @NoArgsConstructor @AllArgsConstructor
public class Point {

    @Id
    @Column(name = "PNT_MNG_NO", columnDefinition = "BIGINT(20) COMMENT '포인트관리번호'")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 생성을 데이터베이스에 위임 (AUTO_INCREMENT)
    private Long pointManageNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "MBR_NO",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_MBR_TO_PNT"),
            columnDefinition = "CHAR(10) COMMENT '회원번호'"
    )
    private Member member;

    @Column(name = "TOT_PNT", columnDefinition = "INT(11) COMMENT '현재보유포인트'")
    private Integer totalPoint;

    @Column(name = "AVL_PNT", columnDefinition = "INT(11) COMMENT '사용가능한포인트'")
    private Integer availablePoint;

    @Column(name = "EXPR_PNT", columnDefinition = "INT(11) COMMENT '소멸된포인트'")
    private Integer expirePoint;

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
