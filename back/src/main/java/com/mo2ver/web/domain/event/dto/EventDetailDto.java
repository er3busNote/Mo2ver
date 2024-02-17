package com.mo2ver.web.domain.event.dto;

import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.Date;
import java.util.List;

@Data
public class EventDetailDto {

    private Long eventManageNo;

    private String subject;

    private Date eventStartDate;

    private Date eventEndDate;

    private Page<GoodsDto> goodsList;

    private List<ImageDto> imageList;
}
