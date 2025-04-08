package com.mo2ver.web.domain.search.dto.request;

import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class SearchGoodsRequest {

    private String name;
    private Integer minPrice;
    private Integer maxPrice;
}
