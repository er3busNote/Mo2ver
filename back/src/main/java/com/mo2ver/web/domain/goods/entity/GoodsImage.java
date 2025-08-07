package com.mo2ver.web.domain.goods.entity;

import com.mo2ver.web.domain.member.entity.Member;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "GD_IMG",    // 상품이미지
        indexes={
                @Index(name="FK_GD_TO_GD_IMG", columnList="GD_CD")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = {"goods", "detailSequence"})
@Builder @NoArgsConstructor @AllArgsConstructor
public class GoodsImage implements Serializable {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "GD_CD",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_GD_TO_GD_IMG"),
            columnDefinition = "CHAR(10) COMMENT '상품코드'"
    )
    private Goods goods;

    @Id
    @Column(name= "DTL_SEQ", columnDefinition = "INT(11) COMMENT '상세순서'")
    private Integer detailSequence;

    @Column(name = "GD_IMG_ATT_FILE", columnDefinition = "BIGINT(20) COMMENT '상품이미지첨부파일'")
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

    public static GoodsImage of(Goods goods, Integer goodsImageAttachFile, String fileExtension, Member currentUser) {
        return GoodsImage.builder()
                .goods(goods)
                .goodsImageAttachFile(goodsImageAttachFile)
                .goodsImageExtension(fileExtension)
                .useYesNo('Y')
                .register(currentUser.getMemberNo())
                .updater(currentUser.getMemberNo())
                .build();
    }

    public static GoodsImage of(Goods goods, Integer goodsImageAttachFile, Character basicImageYesNo, String fileExtension, Integer index, Member currentUser) {
        return GoodsImage.builder()
                .goods(goods)
                .goodsImageAttachFile(goodsImageAttachFile)
                .goodsImageExtension(fileExtension)
                .basicImageYesNo(basicImageYesNo)
                .sortSequence(index)
                .useYesNo('Y')
                .register(currentUser.getMemberNo())
                .updater(currentUser.getMemberNo())
                .build();
    }
}
