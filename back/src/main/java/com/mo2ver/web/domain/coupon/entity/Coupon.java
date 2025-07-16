package com.mo2ver.web.domain.coupon.entity;

import com.mo2ver.web.domain.coupon.dto.request.CouponRequest;
import com.mo2ver.web.domain.goods.entity.Goods;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.order.entity.Order;
import com.mo2ver.web.global.common.utils.DateUtil;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Random;

@Entity
@Table(
        name = "CPN",   // 쿠폰
        indexes={
                @Index(name="FK_GD_TO_CPN", columnList="GD_CD"),
                @Index(name="FK_ODR_TO_CPN", columnList="ODR_ID"),
                @Index(name="FK_MBR_TO_CPN", columnList="MBR_NO")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = "couponNo")
@Builder @NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Coupon {

    @Id
    @GeneratedValue(generator = "couponNo")
    @GenericGenerator(name = "couponNo", strategy = "com.mo2ver.web.domain.member.entity.AddressGenerator")
    @Column(name = "CPN_NO", columnDefinition = "CHAR(10) COMMENT '쿠폰번호'")
    private String couponNo;

    @Column(name = "CPN_CD", columnDefinition = "VARCHAR(30) COMMENT '쿠폰코드'", updatable = false, nullable = false)
    private String couponCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "GD_CD",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_GD_TO_CPN"),
            columnDefinition = "CHAR(10) COMMENT '상품코드'"
    )
    private Goods goods;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "ODR_ID",
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_ODR_TO_CPN"),
            columnDefinition = "CHAR(36) COMMENT '주문번호'"
    )
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "MBR_NO",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_MBR_TO_CPN"),
            columnDefinition = "CHAR(10) COMMENT '회원번호'"
    )
    private Member member;

    @Column(name = "ISSUE_DT", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '발급일시'")
    private LocalDateTime issueDate;

    @Column(name = "USE_DT", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '사용일시'")
    private LocalDateTime useDate;

    @Column(name = "EXPIRE_DT", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '만료일시'")
    private LocalDateTime expireDate;

    @Column(name = "USE_YN", columnDefinition = "CHAR(1) COMMENT '사용여부'")
    private Character useYesNo;

    @OneToOne(mappedBy = "coupon", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private CouponDetail couponDetail;

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

    @PrePersist
    public void prePersist() {
        if (this.couponCode == null) {
            this.couponCode = this.generateCouponCode("CPN", 6);
        }
    }

    public Coupon(CouponRequest couponRequest, Goods goods, Member currentUser) {
        this.createOrUpdateCoupon(currentUser);
        this.goods = goods;
        this.member = currentUser;
        this.issueDate = LocalDateTime.now();
        this.register = currentUser.getMemberNo();
        this.useYesNo = 'N';

        this.couponDetail = this.createCouponDetail(couponRequest, currentUser);
    }

    private void createOrUpdateCoupon(Member currentUser) {
        this.updater = currentUser.getMemberNo();
    }

    private CouponDetail createCouponDetail(CouponRequest couponRequest, Member currentUser) {
        return CouponDetail.of(this, couponRequest, currentUser);
    }

    public String generateCouponCode(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder code = new StringBuilder();
        Random random = new SecureRandom(); // 예측 불가능하게

        for (int i = 0; i < length; i++) {
            code.append(characters.charAt(random.nextInt(characters.length())));
        }

        return code.toString();
    }

    public String generateCouponCode(String prefix, int length) {
        String currentDate = DateUtil.getCurrentDate().substring(2, 8);
        String randomPart = generateCouponCode(length);
        return String.format("%s-%s-%s", prefix, currentDate, randomPart);
    }
}
