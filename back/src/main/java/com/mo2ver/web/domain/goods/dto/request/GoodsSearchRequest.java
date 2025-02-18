package com.mo2ver.web.domain.goods.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoodsSearchRequest {

    private String goodsName;
    private String largeCategoryCode;
    private String mediumCategoryCode;
    private String smallCategoryCode;
}
