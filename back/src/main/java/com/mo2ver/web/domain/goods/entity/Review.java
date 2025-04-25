package com.mo2ver.web.domain.goods.entity;

import com.mo2ver.web.domain.goods.dto.request.GoodsReviewRequest;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.global.common.utils.BeanUtil;
import com.mo2ver.web.global.common.utils.JasyptUtil;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
        name = "GD_REVW",    // 상품리뷰
        indexes={
                @Index(name="FK_GD_TO_GD_REVW", columnList="GD_CD"),
                @Index(name="FK_MBR_TO_GD_REVW_REGR", columnList="REGR"),
                @Index(name="FK_MBR_TO_GD_REVW_UPDR", columnList="UPDR")
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

    @Column(name = "IMG_ATT_FILE", columnDefinition = "BIGINT(20) COMMENT '이미지첨부파일'")
    private Integer imageAttachFile;

    @Column(name = "REVW_CONTS", columnDefinition = "VARCHAR(100) COMMENT '상품리뷰내용'")
    private String reviewContents;

    @Column(name = "RATING", columnDefinition = "INT(11) COMMENT '상품평점'")
    private Integer rating;

    @Column(name = "DEL_YN", columnDefinition = "CHAR(1) COMMENT '삭제유무'")
    private Character delYesNo;

    @OneToMany(mappedBy = "upperReviewNo", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviewList = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(
            name = "REGR",
            nullable = false,
            foreignKey = @ForeignKey(name = "FK_MBR_TO_GD_REVW_REGR"),
            columnDefinition = "VARCHAR(30) COMMENT '등록자'"
    )
    private Member register;

    @Builder.Default
    @Column(name = "REG_DT", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '등록일시'")
    @CreationTimestamp  // INSERT 시 자동으로 값을 채워줌
    private LocalDateTime registerDate = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(
            name = "UPDR",
            nullable = false,
            foreignKey = @ForeignKey(name = "FK_MBR_TO_GD_REVW_UPDR"),
            columnDefinition = "VARCHAR(30) COMMENT '수정자'"
    )
    private Member updater;

    @Builder.Default
    @Column(name = "UPD_DT", nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '수정일시'")
    @UpdateTimestamp    // UPDATE 시 자동으로 값을 채워줌
    private LocalDateTime updateDate = LocalDateTime.now();

    private static String getDecryptor(String attachFile) {
        JasyptUtil jasyptUtil = BeanUtil.getBean(JasyptUtil.class);
        return jasyptUtil.decrypt(attachFile.replace(" ", "+"));
    }

    public Review(GoodsReviewRequest goodsReviewRequest, Goods goods, Member currentUser) {
        this.createOrUpdateReview(goodsReviewRequest, goods, currentUser);
        this.register = currentUser;
    }

    public void update(GoodsReviewRequest goodsReviewRequest, Goods goods, Member currentUser) {
        this.createOrUpdateReview(goodsReviewRequest, goods, currentUser);
    }

    public void delete() {
        this.delYesNo = 'Y';
    }

    private void createOrUpdateReview(GoodsReviewRequest goodsReviewRequest, Goods goods, Member currentUser) {
        this.goodsCode = goods;
        this.upperReviewNo = Review.of(goodsReviewRequest, goods, currentUser);
        this.imageAttachFile = Integer.parseInt(getDecryptor(goodsReviewRequest.getReviewImg()));
        this.reviewContents = goodsReviewRequest.getReviewContents();
        this.rating = goodsReviewRequest.getRating();
        this.delYesNo = 'N';
        this.updater = currentUser;
    }

    private static Review of(GoodsReviewRequest goodsReviewRequest, Goods goods, Member currentUser) {
        return Review.builder()
                .goodsReviewNo(goodsReviewRequest.getReviewNo())
                .goodsCode(goods)
                .imageAttachFile(Integer.parseInt(getDecryptor(goodsReviewRequest.getReviewImg())))
                .reviewContents(goodsReviewRequest.getReviewContents())
                .rating(goodsReviewRequest.getRating())
                .register(currentUser)
                .updater(currentUser)
                .build();
    }
}
