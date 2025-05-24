package com.mo2ver.web.domain.delivery.entity;

import com.mo2ver.web.domain.member.entity.Member;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "DLV",   // 배송관리
        indexes={
                @Index(name="FK_MBR_TO_DLV", columnList="MBR_NO")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = "deliveryCode")
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Delivery {

    @Id
    @GeneratedValue(generator = "deliveryCode")
    @GenericGenerator(name = "deliveryCode", strategy = "com.mo2ver.web.domain.delivery.entity.DeliveryGenerator")
    @Column(name = "DLV_CD", columnDefinition = "CHAR(10) COMMENT '배송코드'")
    private String deliveryCode;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(
            name = "MBR_NO",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_MBR_TO_DLV"),
            columnDefinition = "CHAR(10) COMMENT '회원번호'"
    )
    private Member member;

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
