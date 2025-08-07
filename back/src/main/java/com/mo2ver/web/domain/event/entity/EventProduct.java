package com.mo2ver.web.domain.event.entity;

import com.mo2ver.web.domain.event.dto.EventImageProductInfo;
import com.mo2ver.web.domain.member.entity.Member;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "EVT_PRD",   // 전시배너상품
        indexes={
                @Index(name = "FK_EVT_TO_EVT_PRD", columnList = "EVT_NO")
        }
)
@Getter @Setter
@EqualsAndHashCode(of = {"event", "detailSequence"})
@Builder @NoArgsConstructor @AllArgsConstructor
public class EventProduct implements Serializable {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "EVT_NO",
            nullable = false,
            updatable = false,
            foreignKey = @ForeignKey(name = "FK_EVT_TO_EVT_PRD"),
            columnDefinition = "CHAR(10) COMMENT '이벤트번호'"
    )
    private Event event;

    @Id
    @Column(name= "DTL_SEQ", columnDefinition = "INT(11) COMMENT '상세순서'")
    private Integer detailSequence;

    @Column(name = "PRD_CD", columnDefinition = "CHAR(10) COMMENT '상품코드'")
    private String productCode;

    @Column(name = "PRD_NM", columnDefinition = "VARCHAR(50) COMMENT '상품명'")
    private String productName;

    @Column(name= "SORT_SEQ", columnDefinition = "INT(11) COMMENT '정렬순서'")
    private Integer sortSequence;

//    @ManyToOne(fetch = FetchType.LAZY)
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
                .event(event)
                .register(event.getRegister())
                .updater(event.getUpdater())
                .build();
    }

    public static EventProduct of(Event event, EventImageProductInfo eventImageProductInfo, Member currentUser) {
        return EventProduct.builder()
                .event(event)
                .productCode(eventImageProductInfo.getGoodsCode())
                .productName(eventImageProductInfo.getGoodsName())
                .sortSequence(eventImageProductInfo.getSortSequence())
                .register(currentUser.getMemberNo())
                .updater(currentUser.getMemberNo())
                .build();
    }
}
