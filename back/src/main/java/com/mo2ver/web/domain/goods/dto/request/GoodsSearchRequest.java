package com.mo2ver.web.domain.goods.dto.request;

import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class GoodsSearchRequest {

    private String goodsName;
    private String largeCategoryCode;
    private String mediumCategoryCode;
    private String smallCategoryCode;
}
