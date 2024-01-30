package com.mo2ver.web.domain.goods.domain;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "GD_IMG",
        indexes={
                @Index(
                        name="FK_GD_TO_GD_IMG",
                        columnList="GD_CD"
                )
        }
)
@Getter @Setter
@EqualsAndHashCode(of = "goodsImageManageNo")
@Builder @NoArgsConstructor @AllArgsConstructor
public class Image {

    @Id
    @Column(name = "GD_IMG_MNG_NO", columnDefinition = "BIGINT(20) COMMENT '상품이미지관리번호'")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 생성을 데이터베이스에 위임 (AUTO_INCREMENT)
    private Long goodsImageManageNo;

    @ManyToOne(fetch = FetchType.LAZY)  // 지연로딩 (N+1 문제)
    @JoinColumn(
            name = "GD_CD",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(
                    name = "FK_GD_TO_GD_IMG",
                    foreignKeyDefinition = "FOREIGN KEY (GD_CD) REFERENCES GD(GD_CD) ON UPDATE RESTRICT ON DELETE RESTRICT"),
            columnDefinition = "CHAR(10) COMMENT '상품코드'"
    )
    private Goods goodsCode;

    @Column(name = "GD_IMG_ATT_FILE", columnDefinition = "INT(11) COMMENT '상품이미지첨부파일'")
    private Integer goodsImageAttachFile;

    @Column(name = "GD_IMG_EXT", columnDefinition = "CHAR(20) COMMENT '상품이미지확장자'")
    private String goodsImageExtension;

    @Column(name = "BSC_IMG_YN", columnDefinition = "CHAR(1) COMMENT '기본이미지여부'")
    private Character basicImageYesNo;

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
