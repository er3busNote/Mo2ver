package com.mo2ver.web.domain.goods.entity;

import com.mo2ver.web.domain.goods.dto.request.GoodsReviewRequest;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.global.common.utils.JasyptUtil;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.util.StringUtils;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
        name = "GD_REVW",    // 상품리뷰
        indexes={
                @Index(name="FK_GD_TO_GD_REVW", columnList="GD_CD"),
                @Index(name="FK_MBR_TO_GD_REVW", columnList="MBR_NO")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = "goodsReviewNo")
@Builder @NoArgsConstructor @AllArgsConstructor
public class Review {

    @Id
    @Column(name = "GD_REVW_NO", columnDefinition = "BIGINT(20) COMMENT '상품리뷰관리번호'")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 생성을 데이터베이스에 위임 (AUTO_INCREMENT)
    private Long goodsReviewNo;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)  // 지연로딩 (N+1 문제)
    @JoinColumn(
            name = "GD_CD",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_GD_TO_GD_REVW"),
            columnDefinition = "CHAR(10) COMMENT '상품코드'"
    )
    private Goods goodsCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "UPPR_REVW_NO",
            referencedColumnName = "GD_REVW_NO",
            foreignKey = @ForeignKey(value = ConstraintMode.NO_CONSTRAINT),
            columnDefinition = "CHAR(10) COMMENT '상위상품리뷰번호'"
    )
    private Review upperReviewNo;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(
            name = "MBR_NO",
            nullable = false,
            foreignKey = @ForeignKey(name = "FK_MBR_TO_GD_REVW"),
            columnDefinition = "CHAR(10) COMMENT '회원번호'"
    )
    private Member member;

    @Column(name = "IMG_ATT_FILE", columnDefinition = "BIGINT(20) COMMENT '이미지첨부파일'")
    private Integer imageAttachFile;

    @Column(name = "REVW_CONTS", columnDefinition = "VARCHAR(100) COMMENT '상품리뷰내용'")
    private String reviewContents;

    @Column(name = "RATING", columnDefinition = "INT(11) COMMENT '상품평점'")
    private Integer rating;

    @Column(name = "DEL_YN", columnDefinition = "CHAR(1) COMMENT '삭제유무'")
    private Character delYesNo;

    @OneToMany(mappedBy = "upperReviewNo", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();

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

    public Review(GoodsReviewRequest goodsReviewRequest, Goods goods, Member currentUser) {
        this.createOrUpdateReview(goodsReviewRequest, goods, currentUser);
        this.member = currentUser;
        this.register = currentUser.getMemberNo();
    }

    public void update(GoodsReviewRequest goodsReviewRequest, Goods goods, Member currentUser) {
        this.createOrUpdateReview(goodsReviewRequest, goods, currentUser);
    }

    public void delete() {
        this.delYesNo = 'Y';
    }

    private void createOrUpdateReview(GoodsReviewRequest goodsReviewRequest, Goods goods, Member currentUser) {
        this.goodsCode = goods;
        if (goodsReviewRequest.getUpperReviewNo() != null) {
            this.upperReviewNo = Review.of(goodsReviewRequest, goods, currentUser);
        }
        if (StringUtils.hasText(goodsReviewRequest.getReviewImg())) {
            this.imageAttachFile = JasyptUtil.getDecryptor(goodsReviewRequest.getReviewImg());
        }
        this.reviewContents = goodsReviewRequest.getReviewContents();
        this.rating = goodsReviewRequest.getRating();
        this.delYesNo = 'N';
        this.updater = currentUser.getMemberNo();
    }

    private static Review of(GoodsReviewRequest goodsReviewRequest, Goods goods, Member currentUser) {
        return Review.builder()
                .goodsReviewNo(goodsReviewRequest.getUpperReviewNo())
                .goodsCode(goods)
                .member(currentUser)
                .imageAttachFile(JasyptUtil.getDecryptor(goodsReviewRequest.getReviewImg()))
                .reviewContents(goodsReviewRequest.getReviewContents())
                .rating(goodsReviewRequest.getRating())
                .register(currentUser.getMemberNo())
                .updater(currentUser.getMemberNo())
                .build();
    }
}
