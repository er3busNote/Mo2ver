package com.mo2ver.web.domain.payment.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(
        name = "PAY_DTL", // 결제상세
        indexes={
                @Index(name="FK_PAY_TO_PAY_DTL", columnList="PAY_CD")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = "paymentDetailId")
@Builder @NoArgsConstructor @AllArgsConstructor
public class PaymentDetail {

    @Id
    @Column(name = "PAY_DTL_ID", columnDefinition = "BIGINT(20) COMMENT '결제상세관리번호'")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 생성을 데이터베이스에 위임 (AUTO_INCREMENT)
    private Long paymentDetailId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)  // 지연로딩 (N+1 문제)
    @JoinColumn(
            name = "PAY_CD",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_PAY_TO_PAY_DTL"),
            columnDefinition = "CHAR(10) COMMENT '결재코드'"
    )
    private Payment paymentCode;

    // 결제 승인 건
    @Column(name = "LST_TRN_KEY", columnDefinition = "VARCHAR(64) COMMENT '마지막거래키'")
    private String lastTransactionKey;

    @Column(name = "PAY_TYPE", columnDefinition = "CHAR(10) COMMENT '결제유형'")
    private String paymentType;

    @Column(name = "CURRENCY", columnDefinition = "CHAR(10) COMMENT '통화'")
    private String currency;

    @Column(name = "MTHD", columnDefinition = "VARCHAR(10) COMMENT '결제수단'")
    private String method;

    @Column(name = "TOT_AMT", columnDefinition = "INT(11) COMMENT '총 결제금액'")
    private Long totalAmount;

    @Column(name = "BLNC_AMT", columnDefinition = "INT(11) COMMENT '잔고금액'")
    private Long balanceAmount;

    @Column(name = "SUPY_AMT", columnDefinition = "INT(11) COMMENT '공급가액'")
    private Long suppliedAmount;

    @Column(name = "VAT", columnDefinition = "INT(11) COMMENT '부가세'")
    private Long vat;

    @Column(name = "TAX_FREE_AMT", columnDefinition = "INT(11) COMMENT '면세금액'")
    private Long taxFreeAmount;

    @Column(name = "TAX_EXMP_AMT", columnDefinition = "INT(11) COMMENT '과세 제외 금액'")
    private Long taxExemptionAmount;

    @Column(name = "STS", columnDefinition = "CHAR(10) COMMENT '결제응답상태'")
    private String sts;

    @Column(name = "REQ_DT", columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '요청일시'")
    private Date requestedDate;

    @Column(name = "APRV_DT", columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '승인일시'")
    private Date approvedDate;

    @Column(name = "ESC", columnDefinition = "CHAR(1) COMMENT '에스크로사용여부'")
    private Character useEscrow;

    @Column(name = "CARD_ISSUE_CD", columnDefinition = "CHAR(2) COMMENT '카드발급사 2자리코드'")
    private String cardIssuerCode;

    @Column(name = "CARD_ACQ_CD", columnDefinition = "CHAR(2) COMMENT '카드매입사 2자리코드'")
    private String cardAcquirerCode;

    @Column(name = "CARD_NUM", columnDefinition = "VARCHAR(20) COMMENT '카드번호'")
    private String cardNumber;

    @Column(name = "CARD_INS_MNT", columnDefinition = "INT(11) COMMENT '할부개월수'")
    private Integer cardInstallmentPlanMonths;

    @Column(name = "CARD_APRV_NO", columnDefinition = "CHAR(8) COMMENT '카드사승인번호'")
    private Integer cardApproveNo;

    @Column(name = "CARD_PNT_YN", columnDefinition = "CHAR(1) COMMENT '카드사포인트사용여부'")
    private Character useCardPoint;

    @Column(name = "CARD_TYPE", columnDefinition = "VARCHAR(5) COMMENT '카드종류'")
    private String cardType;

    @Column(name = "CARD_OWNER_TYPE", columnDefinition = "VARCHAR(4) COMMENT '카드소유자타입'")
    private String cardOwnerType;

    @Column(name = "CARD_ACQ_STS", columnDefinition = "CHAR(20) COMMENT '카드결재매입상태'")
    private String cardAcquireStatus;

    @Column(name = "CARD_INT_FREE_YN", columnDefinition = "CHAR(1) COMMENT '무이자할부적용여부'")
    private Character isInterestFree;

    @Column(name = "CARD_FAIL_CD", columnDefinition = "VARCHAR(100) COMMENT '결제승인오류타입코드'")
    private String cardFailureCode;

    @Column(name = "CARD_FAIL_MSG", columnDefinition = "VARCHAR(200) COMMENT '결제승인에러메시지'")
    private String cardFailureMessage;

    // 결제 취소 건
    @Column(name = "CNCL_TRN_KEY", columnDefinition = "VARCHAR(64) COMMENT '결제취소거래키'")
    private String cancelTransactionKey;

    @Column(name = "CNCL_AMT", columnDefinition = "INT(11) COMMENT '결제취소금액'")
    private Long cancelAmount;

    @Column(name = "CNCL_RSN", columnDefinition = "VARCHAR(200) COMMENT '결제취소사유'")
    private String cancelReason;

    @Column(name = "CNCL_TAX_FREE_AMT", columnDefinition = "INT(11) COMMENT '결제취소금액중면세금액'")
    private Long cancelTaxFreeAmount;

    @Column(name = "CNCL_TAX_EXMP_AMT", columnDefinition = "INT(11) COMMENT '결제취소금액중과세제외금액'")
    private Long cancelTaxExemptionAmount;

    @Column(name = "CNCL_RFN_AMT", columnDefinition = "INT(11) COMMENT '환불가능한금액'")
    private Long cancelRefundableAmount;

    @Column(name = "CNCL_DT", columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '결제취소일시'")
    private Date canceledDate;

    @Column(name = "CNCL_STS", columnDefinition = "CHAR(10) COMMENT '결제취소상태'")
    private String cancelSts;

    @Column(name = "CNCL_FAIL_CD", columnDefinition = "VARCHAR(100) COMMENT '결제취소오류타입코드'")
    private String cancelFailureCode;

    @Column(name = "CNCL_FAIL_MSG", columnDefinition = "VARCHAR(200) COMMENT '결제취소에러메시지'")
    private String cancelFailureMessage;
}
