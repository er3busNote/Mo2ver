package com.mo2ver.web.domain.event.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventImageProductDto {

    private String goodsCode;
    private String goodsName;
    private Integer sortSequence;
}
