package com.mo2ver.web.domain.event.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventDto {

    private Long eventManageNo;

    private String subject;

    private Date eventStartDate;

    private Date eventEndDate;
}
