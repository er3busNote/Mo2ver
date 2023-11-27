package com.mo2ver.master.domain.member.domain;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "LOGIN_HISTORY")
@Getter @Setter
@EqualsAndHashCode(of = "loginHistoryManageNo")
@Builder @NoArgsConstructor @AllArgsConstructor
public class LoginHistory {

    @Id
    @Column(name = "LOGIN_HIS_MNG_NO", columnDefinition = "BIGINT(20) COMMENT '로그인이력관리번호'")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 생성을 데이터베이스에 위임 (AUTO_INCREMENT)
    private Long loginHistoryManageNo;

    @ManyToOne(fetch = FetchType.LAZY)  // 지연로딩 (N+1 문제)
    @JoinColumn(
            name = "MBR_NO",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(
                    name = "FK_MBR_NO_TO_LOGIN_HISTORY",
                    foreignKeyDefinition = "FOREIGN KEY (MBR_NO) REFERENCES MEMBER(MBR_NO) ON UPDATE RESTRICT ON DELETE RESTRICT"),
            columnDefinition = "CHAR(10) COMMENT '회원번호'"
    )
    private Member memberNo;

    @Column(name = "IP_ADDR", nullable = false, columnDefinition = "VARCHAR(30) COMMENT '아이피주소'")
    @NotBlank
    private String ipAddress;

    @Column(name = "SESN_ID", nullable = false, columnDefinition = "VARCHAR(255) COMMENT '세션ID'")
    @NotBlank
    private String sessionId;

    @Column(name = "REGR", nullable = false, columnDefinition = "VARCHAR(30) COMMENT '등록자'")
    @NotBlank
    private String register;

    @Builder.Default
    @Column(name = "REG_DT", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '등록일시'")
    @CreationTimestamp  // INSERT 시 자동으로 값을 채워줌
    private LocalDateTime registerDate = LocalDateTime.now();
}
