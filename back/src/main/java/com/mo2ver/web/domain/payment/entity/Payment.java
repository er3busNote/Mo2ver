package com.mo2ver.web.domain.payment.entity;

import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.payment.dto.PaymentInfo;
import com.mo2ver.web.domain.payment.type.PaymentType;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "PAY",   // 결재관리
        indexes={
                @Index(name="FK_MBR_TO_PAY", columnList="MBR_NO")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = "paymentCode")
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Payment {

    @Id
    @GeneratedValue(generator = "paymentCode")
    @GenericGenerator(name = "paymentCode", strategy = "com.mo2ver.web.domain.payment.entity.PaymentGenerator")
    @Column(name = "PAY_CD", columnDefinition = "CHAR(10) COMMENT '결재코드'")
    private String paymentCode;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(
            name = "MBR_NO",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_MBR_TO_PAY"),
            columnDefinition = "CHAR(10) COMMENT '회원번호'"
    )
    private Member memberNo;

    @Column(name = "PAY_KEY", columnDefinition = "VARCHAR(200) COMMENT '결재인증키'")
    private String paymentKey;

    @Column(name = "OD_ID", columnDefinition = "VARCHAR(64) COMMENT '주문번호'")
    private String orderId;

    @Column(name = "AMT", columnDefinition = "INT(11) COMMENT '결재금액'")
    private Long amount;

    @Column(name = "PAY_CND", columnDefinition = "CHAR(10) COMMENT '결재상태'")
    private String paymentCondition;

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

    public Payment(PaymentInfo paymentInfo, Member currentUser) {
        this.createOrUpdatePayment(paymentInfo, currentUser);
        this.orderId = paymentInfo.getOrderId();
        this.amount = paymentInfo.getAmount();
        this.paymentCondition = PaymentType.PROCESS.toString();
        this.memberNo = currentUser;
        this.register = currentUser.getMemberNo();
    }

    public void confirm(PaymentInfo paymentInfo, Member currentUser) {
        this.createOrUpdatePayment(paymentInfo, currentUser);
        this.paymentKey = paymentInfo.getPaymentKey();
        this.paymentCondition = PaymentType.CONFIRM.toString();
    }

    public void cancel(PaymentInfo paymentInfo, Member currentUser) {
        this.createOrUpdatePayment(paymentInfo, currentUser);
        this.paymentCondition = PaymentType.CANCEL.toString();
    }

    private void createOrUpdatePayment(PaymentInfo paymentInfo, Member currentUser) {
        this.updater = currentUser.getMemberNo();
    }
}
