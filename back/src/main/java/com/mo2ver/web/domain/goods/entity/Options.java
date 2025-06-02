package com.mo2ver.web.domain.goods.entity;

import com.mo2ver.web.domain.goods.type.OptionsType;
import com.mo2ver.web.domain.member.entity.Member;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "GD_OPT",    // 상품옵션
        indexes={
                @Index(name="FK_MBR_TO_GD_OPT", columnList="MBR_NO")
        }
)
@Getter
@Setter
@EqualsAndHashCode(of = "goodsOptionNo")
@Builder @NoArgsConstructor @AllArgsConstructor
public class Options {

    @Id
    @Column(name = "GD_OPT_NO", columnDefinition = "BIGINT(20) COMMENT '상품옵션관리번호'")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 생성을 데이터베이스에 위임 (AUTO_INCREMENT)
    private Long goodsOptionNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "MBR_NO",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_MBR_TO_GD_OPT"),
            columnDefinition = "CHAR(10) COMMENT '회원번호'"
    )
    private Member member;

    @Enumerated(EnumType.STRING)
    @Column(name = "OPT_TYPE", columnDefinition = "CHAR(10) COMMENT '상품유형'")
    private OptionsType optionsType;

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

    public static Options of(Member currentUser) {
        return Options.builder()
                .member(currentUser)
                .optionsType(OptionsType.BASIC)
                .register(currentUser.getMemberNo())
                .updater(currentUser.getMemberNo())
                .build();
    }
}
