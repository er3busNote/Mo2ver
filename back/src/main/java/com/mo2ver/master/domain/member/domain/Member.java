package com.mo2ver.master.domain.member.domain;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

@Entity
@Table(
        name = "MEMBER",
        indexes={
                @Index(
                        name="UK_LOGIN_ID",
                        columnList="LOGIN_ID",
                        unique = true
                )
        }
)
@Getter @Setter
@EqualsAndHashCode(of = "memberNo")
@Builder @NoArgsConstructor @AllArgsConstructor
public class Member {

    @Id
    @Column(name = "MBR_NO", columnDefinition = "CHAR(10) COMMENT '회원번호'")
    private String memberNo;

    @ElementCollection(fetch = FetchType.EAGER) // OneToMany (1:N 관계)
    @Enumerated(EnumType.STRING)
    @JoinColumn(foreignKey = @ForeignKey(name="FK_MEMBER_ROLE_ID"))
    @Column(name = "ROLE", nullable = false, columnDefinition = "VARCHAR(12) COMMENT '사용자권한'")
    private Set<MemberRole> roles;

    @Column(name = "LOGIN_ID", nullable = false, columnDefinition = "VARCHAR(40) COMMENT '로그인ID'")
    @NotBlank
    private String loginId;

    @Column(name = "MBR_NM", nullable = false, columnDefinition = "VARCHAR(50) COMMENT '회원명'")
    @NotBlank
    private String memberName;

    @Column(name = "PWD", nullable = false, columnDefinition = "VARCHAR(255) COMMENT '비밀번호'")
    @NotBlank
    private String password;

    @Column(name = "PWD_CHG_DT", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '비밀번호변경일시'")
    private LocalDateTime passwordChangeDate;

    @Column(name = "TMP_PWD_ISSU_DT", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '임시비밀번호발급일시'")
    private LocalDateTime TempPasswordIssueDate;

    @Column(name= "LOGIN_FAIL_CNT", columnDefinition = "INT(11) COMMENT '로그인실패횟수'")
    private Integer loginFailCount;

    @Column(name = "LOGIN_FAIL_DT", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '로그인실패일시'")
    private LocalDateTime loginFailDate;

    @Column(name = "MBR_CND_CD", columnDefinition = "CHAR(5) COMMENT '회원상태코드'")
    private String memberConditionCode;

    @Column(name = "MBR_GRD_CD", columnDefinition = "CHAR(5) COMMENT '회원등급코드'")
    private String memberGradeCode;

    @Column(name = "CP_NO", nullable = false, columnDefinition = "VARCHAR(12) COMMENT '핸드폰번호'")
    @NotBlank
    private String cellPhoneNumber;

    @Column(name = "EMAIL", nullable = false, columnDefinition = "VARCHAR(40) COMMENT '이메일'")
    @NotBlank
    private String email;

    @Column(name = "ZIPCODE", columnDefinition = "CHAR(5) COMMENT '우편번호'")
    private String zipcode;

    @Column(name = "ROAD_NM_BSC_ADDR", columnDefinition = "VARCHAR(255) COMMENT '도로명기본주소'")
    private String roadNameBasicAddress;

    @Column(name = "EMAIL_RCP_YN", columnDefinition = "CHAR(1) COMMENT '이메일수신여부'")
    private Character emailReceptionYesNo;

    @Column(name = "SMS_RCP_YN", columnDefinition = "CHAR(1) COMMENT '문자수신여부'")
    private Character snsReceptionYesNo;

    @Column(name = "ROAD_NM_DTL_ADDR", columnDefinition = "VARCHAR(255) COMMENT '도로명상세주소'")
    private String roadNameDetailAddress;

    @Column(name = "JOIN_DT", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '가입일시'")
    private LocalDateTime joinDate;

    @Column(name = "LAST_ORD_DT", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '최종주문일시'")
    private LocalDateTime lastOrderDate;

    @Column(name = "LAST_LOGIN_DT", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '최종로그인일시'")
    private LocalDateTime lastloginDate;

    @Column(name = "SLEEP_YN", columnDefinition = "CHAR(1) COMMENT '휴먼여부'")
    private Character sleepYesNo;

    @Column(name = "SLEEP_DE", columnDefinition = "DATE COMMENT '휴먼일자'")
    private Date sleepDate;

    @Column(name = "WTHD_YN", columnDefinition = "CHAR(1) COMMENT '탈퇴여부'")
    private Character withdrawalYesNo;

    @Column(name = "WTHD_DE", columnDefinition = "DATE COMMENT '탈퇴일자'")
    private Date withdrawalDate;

    @Column(name = "WTHD_RSN_CD", columnDefinition = "CHAR(5) COMMENT '탈퇴사유코드'")
    private String withdrawalReasonCode;

    @Column(name = "WTHD_RSN", columnDefinition = "VARCHAR(100) COMMENT '탈퇴사유'")
    private String withdrawalReason;

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
