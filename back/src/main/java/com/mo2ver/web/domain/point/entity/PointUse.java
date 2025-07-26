package com.mo2ver.web.domain.point.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "PNT_USE", // 포인트사용내역
        indexes={
                @Index(name="FK_PNT_TO_PNT_TRN", columnList="TRN_ID"),
                @Index(name="FK_PNT_TO_PNT_USE", columnList="PNT_NO")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = {"pointTransaction", "detailSequence"})
@Builder @NoArgsConstructor @AllArgsConstructor
public class PointUse implements Serializable {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "TRN_ID",
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_PNT_TO_PNT_TRN"),
            columnDefinition = "CHAR(10) COMMENT '포인트거래이력번호'"
    )
    private PointTransaction pointTransaction;

    @Id
    @Column(name= "DTL_SEQ", columnDefinition = "INT(11) COMMENT '상세순서'")
    private Integer detailSequence;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "PNT_NO",
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_PNT_TO_PNT_USE"),
            columnDefinition = "CHAR(10) COMMENT '포인트번호'"
    )
    private Point point;

    @Column(name = "USE_AMT", columnDefinition = "INT(11) COMMENT '포인트사용금액'")
    private Long useAmount;

    @Column(name = "DEL_YN", columnDefinition = "CHAR(1) COMMENT '삭제유무'")
    private Character delYesNo;

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
