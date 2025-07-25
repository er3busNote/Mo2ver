package com.mo2ver.web.domain.member.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "LOGIN_HIS")  // 로그인이력
@Getter @Setter
@EqualsAndHashCode(of = "loginHistoryNo")
@Builder @NoArgsConstructor @AllArgsConstructor
public class LoginHistory {

    @Id
    @Column(name = "LOGIN_HIS_NO", columnDefinition = "BIGINT(20) COMMENT '로그인이력번호'")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 생성을 데이터베이스에 위임 (AUTO_INCREMENT)
    private Long loginHistoryNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "MBR_NO",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_MBR_NO_TO_LOGIN_HIS"),
            columnDefinition = "CHAR(10) COMMENT '회원번호'"
    )
    private Member member;

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
