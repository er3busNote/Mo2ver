package com.mo2ver.master.domain.auth.domain;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(
        name = "Auth",
        indexes={
                @Index(
                        name="uk_username",
                        columnList="username",
                        unique = true
                )
        }
)
@Getter @Setter
@EqualsAndHashCode(of = "id")
@Builder @NoArgsConstructor @AllArgsConstructor
public class Auth {

    @Id
    @Column(columnDefinition = "BIGINT(20) COMMENT 'SID'")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 생성을 데이터베이스에 위임
    private int id;

    @Column(nullable = false, columnDefinition = "VARCHAR(50) COMMENT '사용자명'")
    @NotBlank
    private String username;

    @Column(nullable = false, columnDefinition = "VARCHAR(120) COMMENT '비밀번호'")
    @NotBlank
    private String password;

    @Column(columnDefinition = "VARCHAR(100) COMMENT '이메일'")
    @NotBlank
    private String email;

    @Column(columnDefinition = "VARCHAR(50) COMMENT '접속IP'")
    @NotBlank
    private String address;

    @ElementCollection(fetch = FetchType.EAGER) // OneToMany (1:N 관계)
    @Enumerated(EnumType.STRING)
    @JoinColumn(foreignKey = @ForeignKey(name="fk_auth_role_id"))
    @Column(name = "role", nullable = false, columnDefinition = "VARCHAR(12) COMMENT '사용자권한'")
    private Set<AuthRole> roles;

    @Column(updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '생성일시'")
    @CreationTimestamp  // INSERT 시 자동으로 값을 채워줌
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '수정일시'")
    @UpdateTimestamp    // UPDATE 시 자동으로 값을 채워줌
    private LocalDateTime updatedAt = LocalDateTime.now();
}
