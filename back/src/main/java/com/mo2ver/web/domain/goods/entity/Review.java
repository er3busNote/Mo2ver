package com.mo2ver.web.domain.goods.entity;

import com.mo2ver.web.domain.goods.dto.request.GoodsReviewRequest;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.global.common.utils.BeanUtil;
import com.mo2ver.web.global.common.utils.JasyptUtil;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "GD_REVW",    // 상품리뷰
        indexes={
                @Index(
                        name="FK_GD_TO_GD_REVW",
                        columnList="GD_CD"
                )
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

    @ManyToOne(fetch = FetchType.LAZY)  // 지연로딩 (N+1 문제)
    @JoinColumn(
            name = "GD_CD",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(
                    name = "FK_GD_TO_GD_REVW",
                    foreignKeyDefinition = "FOREIGN KEY (GD_CD) REFERENCES GD(GD_CD) ON UPDATE RESTRICT ON DELETE RESTRICT"),
            columnDefinition = "CHAR(10) COMMENT '상품코드'"
    )
    private Goods goodsCode;

    @Column(name = "UPPR_REVW_NO", columnDefinition = "CHAR(10) COMMENT '상위상품리뷰번호'")
    private Long upperReviewNo;

    @Column(name = "IMG_ATT_FILE", columnDefinition = "BIGINT(20) COMMENT '이미지첨부파일'")
    private Integer imageAttachFile;

    @Column(name = "REVW_CONTS", columnDefinition = "VARCHAR(100) COMMENT '상품리뷰내용'")
    private String reviewContents;

    @Column(name = "RATING", columnDefinition = "INT(11) COMMENT '상품평점'")
    private Integer rating;

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

    private static String getDecryptor(String attachFile) {
        JasyptUtil jasyptUtil = BeanUtil.getBean(JasyptUtil.class);
        return jasyptUtil.decrypt(attachFile.replace(" ", "+"));
    }

    public Review(GoodsReviewRequest goodsReviewRequest, Goods goods, Member currentUser) {
        this.createOrUpdateReview(goodsReviewRequest, goods, currentUser);
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
        this.upperReviewNo = goodsReviewRequest.getUpperReviewNo();
        this.imageAttachFile = Integer.parseInt(getDecryptor(goodsReviewRequest.getReviewImg()));
        this.reviewContents = goodsReviewRequest.getReviewContents();
        this.rating = goodsReviewRequest.getRating();
        this.delYesNo = 'N';
        this.updater = currentUser.getMemberNo();
    }
}
