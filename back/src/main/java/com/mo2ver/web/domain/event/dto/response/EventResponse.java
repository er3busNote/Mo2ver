package com.mo2ver.web.domain.event.dto.response;

import com.mo2ver.web.domain.event.entity.Event;
import com.mo2ver.web.domain.event.dto.ImageInfo;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class EventResponse {

    private String eventNo;
    private String subject;
    private Date eventStartDate;
    private Date eventEndDate;
    private Character eventYesNo;
    private String register;
    private Date registerDate;
    private List<ImageInfo> imageList;

    public static EventResponse of(Event event) {
        return EventResponse.builder()
                .eventNo(event.getEventNo())
                .subject(event.getSubject())
                .eventStartDate(event.getEventStartDate())
                .eventEndDate(event.getEventEndDate())
                .eventYesNo(event.getEventYesNo())
                .register(event.getRegister())
                .registerDate(Timestamp.valueOf(event.getRegisterDate()))
                .imageList(event.getEventImages().stream()
                        .filter(image -> image.getBasicImageYesNo() == 'Y')
                        .map(ImageInfo::of)
                        .collect(Collectors.toList()))
                .build();
    }
}
