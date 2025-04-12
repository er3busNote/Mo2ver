package com.mo2ver.web.domain.event.dto;

import com.mo2ver.web.global.common.utils.ObjectUtil;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.groups.Default;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class EventImageInfo {

    @NotNull(groups = Update.class)
    private Long eventNo;

    @NotBlank(message = "제목이 존재하지 않습니다")
    private String title;

    @NotNull(message = "이벤트시작일자가 존재하지 않습니다")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date startDate;

    @NotNull(message = "이벤트종료일자가 존재하지 않습니다")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date endDate;

    @NotBlank(message = "첨부파일이 존재하질 않습니다")
    private String displayFile;

    @NotBlank(message = "첨부파일이 존재하질 않습니다")
    private String eventFile;

    @NotNull(message = "이벤트진행여부가 존재하지 않습니다")
    private Character useyn;

    private List<EventImageProductInfo> goods;

    public interface Update extends Default {}

    @QueryProjection
    public EventImageInfo(Long eventNo, String title, Date startDate, Date endDate, List<ImageInfo> images, Character useyn, List<EventImageProductInfo> goods) {
        this.eventNo = eventNo;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.displayFile = images.stream().filter(it -> it.getBasicImageYesNo() == 'Y').findFirst().map(ImageInfo::from).orElse("");
        this.eventFile = images.stream().filter(it -> it.getBasicImageYesNo() == 'N').findFirst().map(ImageInfo::from).orElse("");
        this.useyn = useyn;
        this.goods = goods.stream().filter(ObjectUtil::nonAllFieldsNull).collect(Collectors.toList());
    }
}
