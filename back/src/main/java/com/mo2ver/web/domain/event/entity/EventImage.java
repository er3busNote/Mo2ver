package com.mo2ver.web.domain.event.entity;

import com.mo2ver.web.domain.member.entity.Member;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "EVT_IMG",    // 상품이미지
        indexes={
                @Index(name="FK_EVT_MNG_TO_EVT_IMG", columnList="EVT_MNG_NO")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = "eventImageManageNo")
@Builder @NoArgsConstructor @AllArgsConstructor
public class EventImage {

    @Id
    @Column(name = "EVT_IMG_MNG_NO", columnDefinition = "BIGINT(20) COMMENT '이벤트이미지관리번호'")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 생성을 데이터베이스에 위임 (AUTO_INCREMENT)
    private Long eventImageManageNo;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)  // 지연로딩 (N+1 문제)
    @JoinColumn(
            name = "EVT_MNG_NO",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_EVT_MNG_TO_EVT_IMG"),
            columnDefinition = "BIGINT(20) COMMENT '이벤트관리번호'"
    )
    private EventManage eventManageNo;

    @Column(name = "GD_IMG_ATT_FILE", columnDefinition = "BIGINT(20) COMMENT '상품이미지첨부파일'")
    private Integer goodsImageAttachFile;

    @Column(name = "BSC_IMG_YN", columnDefinition = "CHAR(1) COMMENT '기본이미지여부'")
    private Character basicImageYesNo;

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

    public static EventImage from(EventManage eventManage) {
        return EventImage.builder()
                .eventManageNo(eventManage)
                .register(eventManage.getRegister())
                .updater(eventManage.getUpdater())
                .build();
    }

    public static EventImage of(EventManage eventManage, Integer goodsImageAttachFile, Character basicImageYesNo, Member currentUser) {
        return EventImage.builder()
                .eventManageNo(eventManage)
                .goodsImageAttachFile(goodsImageAttachFile)
                .basicImageYesNo(basicImageYesNo)
                .register(currentUser.getMemberNo())
                .updater(currentUser.getMemberNo())
                .build();
    }
}
