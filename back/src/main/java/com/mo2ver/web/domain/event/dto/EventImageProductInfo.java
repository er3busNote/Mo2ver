package com.mo2ver.web.domain.event.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class EventImageProductInfo {

    private String goodsCode;
    private String goodsName;
    private Integer sortSequence;
}
