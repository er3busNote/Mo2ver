package com.mo2ver.web.domain.coupon.entity;

import com.mo2ver.web.domain.goods.entity.Goods;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.order.entity.Order;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.UUID;

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
@EqualsAndHashCode(of = "couponId")
@Builder @NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Coupon {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Type(type = "uuid-char")
    @Column(name = "CPN_ID", columnDefinition = "CHAR(36) COMMENT '쿠폰번호'", updatable = false, nullable = false)
    private UUID couponId;

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

    public Coupon(Goods goods, Member currentUser) {
        this.createOrUpdateCoupon(currentUser);
        this.goods = goods;
        this.member = currentUser;
        this.issueDate = LocalDateTime.now();
        this.register = currentUser.getMemberNo();
        this.useYesNo = 'N';
    }

    private void createOrUpdateCoupon(Member currentUser) {
        this.updater = currentUser.getMemberNo();
    }
}
