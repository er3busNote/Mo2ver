package com.mo2ver.web.domain.event.domain;

import com.mo2ver.web.domain.event.dto.request.EventImageRequest;
import com.mo2ver.web.domain.member.domain.Member;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "EVT_MNG")    // 이벤트 관리
@Getter @Setter
@EqualsAndHashCode(of = "eventManageNo")
@Builder @NoArgsConstructor @AllArgsConstructor
public class EventManage {

    @Id
    @Column(name = "EVT_MNG_NO", columnDefinition = "BIGINT(20) COMMENT '이벤트관리번호'")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 생성을 데이터베이스에 위임 (AUTO_INCREMENT)
    private Long eventManageNo;

    @Column(name = "SUBJ", columnDefinition = "VARCHAR(255) COMMENT '제목'")
    private String subject;

    @Column(name = "EVT_STRT_DE", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '이벤트시작일자'")
    private Date eventStartDate;

    @Column(name = "EVT_END_DE", updatable = false, nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '이벤트종료일자'")
    private Date eventEndDate;

    @Column(name = "EVT_YN", columnDefinition = "CHAR(1) COMMENT '이벤트진행여부'")
    private Character eventYesNo;

    @OneToMany(mappedBy = "eventManageNo", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EventProduct> eventProductList;

    @OneToMany(mappedBy = "eventManageNo", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EventImage> eventImageList;

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

    public static EventManage of(EventImageRequest eventImageRequest, Member currentUser) {
        EventManage eventManage = EventManage.builder()
                .subject(eventImageRequest.getTitle())
                .eventStartDate(eventImageRequest.getStartDate())
                .eventEndDate(eventImageRequest.getEndDate())
                .eventYesNo(eventImageRequest.getUseyn())
                .register(currentUser.getMemberNo())
                .updater(currentUser.getMemberNo())
                .build();
        eventManage.setEventProductList(eventImageRequest.getGoods().stream()
                .map(data -> EventProduct.of(eventManage, data, currentUser))
                .collect(Collectors.toList()));
        return eventManage;
    }
}
