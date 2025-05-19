package com.mo2ver.web.domain.event.entity;

import com.mo2ver.web.domain.event.dto.EventImageProductInfo;
import com.mo2ver.web.domain.member.entity.Member;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "EVT_PRD",   // 전시배너상품
        indexes={
                @Index(name = "FK_EVT_TO_EVT_PRD", columnList = "EVT_MNG_NO")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = "eventProductId")
@Builder @NoArgsConstructor @AllArgsConstructor
public class EventProduct {

    @Id
    @Column(name = "EVT_PRD_ID", columnDefinition = "BIGINT(20) COMMENT '이벤트전시관리번호'")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 생성을 데이터베이스에 위임 (AUTO_INCREMENT)
    private Long eventProductId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)  // 지연로딩 (N+1 문제)
    @JoinColumn(
            name = "EVT_MNG_NO",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_EVT_TO_EVT_PRD"),
            columnDefinition = "BIGINT(20) COMMENT '이벤트관리번호'"
    )
    private Event eventManageNo;

    @Column(name = "PRD_CD", columnDefinition = "CHAR(10) COMMENT '상품코드'")
    private String productCode;

    @Column(name = "PRD_NM", columnDefinition = "VARCHAR(50) COMMENT '상품명'")
    private String productName;

    @Column(name= "SORT_SEQ", columnDefinition = "INT(11) COMMENT '정렬순서'")
    private Integer sortSequence;

//    @ManyToOne(fetch = FetchType.LAZY)  // 지연로딩 (N+1 문제)
//    @JoinColumn(name = "PRD_CD", referencedColumnName = "GD_CD", insertable = false, updatable = false)
//    private Goods goods;

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

    public static EventProduct from(Event event) {
        return EventProduct.builder()
                .eventManageNo(event)
                .register(event.getRegister())
                .updater(event.getUpdater())
                .build();
    }

    public static EventProduct of(Event event, EventImageProductInfo eventImageProductInfo, Member currentUser) {
        return EventProduct.builder()
                .eventManageNo(event)
                .productCode(eventImageProductInfo.getGoodsCode())
                .productName(eventImageProductInfo.getGoodsName())
                .sortSequence(eventImageProductInfo.getSortSequence())
                .register(currentUser.getMemberNo())
                .updater(currentUser.getMemberNo())
                .build();
    }
}
