package com.mo2ver.web.domain.event.dto.response;

import com.mo2ver.web.domain.event.domain.EventManage;
import com.mo2ver.web.domain.event.dto.ImageInfo;
import lombok.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class EventResponse {

    private Long eventManageNo;
    private String subject;
    private Date eventStartDate;
    private Date eventEndDate;
    private Character eventYesNo;
    private String register;
    private Date registerDate;
    private List<ImageInfo> imageList;

    public static EventResponse of(EventManage eventManage) {
        return EventResponse.builder()
                .eventManageNo(eventManage.getEventManageNo())
                .subject(eventManage.getSubject())
                .eventStartDate(eventManage.getEventStartDate())
                .eventEndDate(eventManage.getEventEndDate())
                .eventYesNo(eventManage.getEventYesNo())
                .register(eventManage.getRegister())
                .registerDate(Timestamp.valueOf(eventManage.getRegisterDate()))
                .imageList(eventManage.getEventImageList().stream()
                        .filter(image -> image.getBasicImageYesNo() == 'Y')
                        .map(ImageInfo::of)
                        .collect(Collectors.toList()))
                .build();
    }
}
