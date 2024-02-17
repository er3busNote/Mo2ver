package com.mo2ver.web.domain.event.dto;

import com.mo2ver.web.domain.event.domain.EventManage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventDto {

    private Long eventManageNo;

    private String subject;

    private Date eventStartDate;

    private Date eventEndDate;

    private List<ImageDto> imageList;

    public static EventDto toDTO(EventManage eventManage) {
        return EventDto.builder()
                .eventManageNo(eventManage.getEventManageNo())
                .subject(eventManage.getSubject())
                .eventStartDate(eventManage.getEventStartDate())
                .eventEndDate(eventManage.getEventEndDate())
                .imageList(eventManage.getEventImageList().stream()
                        .filter(image -> image.getBasicImageYesNo() == 'Y')
                        .map(ImageDto::toDTO)
                        .collect(Collectors.toList()))
                .build();
    }
}
