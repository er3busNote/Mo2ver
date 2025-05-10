package com.mo2ver.web.domain.search.dto.request;

import com.mo2ver.web.global.common.dto.PageInfo;
import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class SearchPageGoodsRequest {
    private PageInfo pageInfo;
    private SearchGoodsRequest searchGoodsRequest;
}
