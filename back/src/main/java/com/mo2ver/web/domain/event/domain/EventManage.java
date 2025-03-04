package com.mo2ver.web.domain.event.domain;

import com.mo2ver.web.domain.event.dto.EventImageInfo;
import com.mo2ver.web.domain.event.dto.EventImageProductInfo;
import com.mo2ver.web.domain.member.domain.Member;
import com.mo2ver.web.global.common.util.BeanUtil;
import com.mo2ver.web.global.common.util.JasyptUtil;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
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

    @Column(name = "EVT_STRT_DE", nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '이벤트시작일자'")
    private Date eventStartDate;

    @Column(name = "EVT_END_DE", nullable = false, columnDefinition = "TIMESTAMP DEFAULT current_timestamp() COMMENT '이벤트종료일자'")
    private Date eventEndDate;

    @Column(name = "EVT_YN", columnDefinition = "CHAR(1) COMMENT '이벤트진행여부'")
    private Character eventYesNo;

    @OneToMany(mappedBy = "eventManageNo", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EventProduct> eventProductList = new ArrayList<>();

    @OneToMany(mappedBy = "eventManageNo", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EventImage> eventImageList = new ArrayList<>();

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

    private static String getDecryptor(String attachFile) {
        JasyptUtil jasyptUtil = BeanUtil.getBean(JasyptUtil.class);
        return jasyptUtil.decrypt(attachFile.replace(" ", "+"));
    }

    public EventManage(EventImageInfo eventImageInfo, Member currentUser) {
        this.createOrUpdateEventManage(eventImageInfo, currentUser);
        this.register = currentUser.getMemberNo();

        this.eventImageList.add(this.createEventImage(eventImageInfo.getDisplayFile(), 'Y', currentUser));
        this.eventImageList.add(this.createEventImage(eventImageInfo.getEventFile(), 'N', currentUser));

        this.eventProductList.addAll(this.createEventProductList(eventImageInfo.getGoods(), currentUser));

        this.sortEventProductList();
    }

    public void update(EventImageInfo eventImageInfo, Member currentUser) {
        this.createOrUpdateEventManage(eventImageInfo, currentUser);

        int oldImageSize = this.eventImageList.size();
        this.eventImageList.add(this.updateEventImage(eventImageInfo.getDisplayFile(), 'Y'));
        this.eventImageList.add(this.updateEventImage(eventImageInfo.getEventFile(), 'N'));
        this.eventImageList.subList(0, oldImageSize).clear();

        int oldProductSize = this.eventProductList.size();
        this.eventProductList.addAll(this.updateEventProductList(eventImageInfo.getGoods()));
        this.eventProductList.subList(0, oldProductSize).clear();

        this.sortEventProductList();
    }

    private void createOrUpdateEventManage(EventImageInfo eventImageInfo, Member currentUser) {
        this.subject = eventImageInfo.getTitle();
        this.eventStartDate = eventImageInfo.getStartDate();
        this.eventEndDate = eventImageInfo.getEndDate();
        this.eventYesNo = eventImageInfo.getUseyn();
        this.updater = currentUser.getMemberNo();
    }

    private EventImage createEventImage(String attachFile, Character basicImageYesNo, Member currentUser) {
        return EventImage.of(this, Integer.parseInt(getDecryptor(attachFile)), basicImageYesNo, currentUser);
    }

    private List<EventProduct> createEventProductList(List<EventImageProductInfo> eventImageProductInfoList, Member currentUser) {
        return eventImageProductInfoList.stream()
                .map(info -> EventProduct.of(this, info, currentUser))
                .collect(Collectors.toList());
    }

    private EventImage updateEventImage(String attachFile, Character basicImageYesNo) {
        EventImage eventImage = this.eventImageList.stream()
                .filter(it -> it.getBasicImageYesNo() == basicImageYesNo)
                .findFirst()
                .orElseGet(() -> EventImage.from(this));
        eventImage.setGoodsImageAttachFile(Integer.parseInt(getDecryptor(attachFile)));
        if(basicImageYesNo != eventImage.getBasicImageYesNo()) eventImage.setBasicImageYesNo(basicImageYesNo);
        return eventImage;
    }

    private List<EventProduct> updateEventProductList(List<EventImageProductInfo> eventImageProductInfoList) {
        return eventImageProductInfoList.stream()
                .map(this::createOrUpdateEventProduct)
                .collect(Collectors.toList());
    }

    private EventProduct createOrUpdateEventProduct(EventImageProductInfo eventImageProductInfo) {
        EventProduct eventProduct = this.eventProductList.stream()
                .filter(it -> it.getEventProductId().equals(eventImageProductInfo.getId()))
                .findFirst()
                .orElseGet(() -> EventProduct.from(this));
        eventProduct.setProductCode(eventImageProductInfo.getGoodsCode());
        eventProduct.setProductName(eventImageProductInfo.getGoodsName());
        eventProduct.setUpdater(this.updater);
        return eventProduct;
    }

    private void sortEventProductList() {
        int index = 1;
        for (EventProduct eventProduct: this.eventProductList) {
            eventProduct.setSortSequence(index++);
        }
    }
}
