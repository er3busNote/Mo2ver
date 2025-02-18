package com.mo2ver.web.domain.goods.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

@Data
public class CategoryResponse {

    private String categoryCode;
    private String categoryName;
    private String upperCategoryCode;
    private Integer sortSequence;
    private Integer categoryLevel;
    private String sortOrdinal;
    private Character useYesNo;

    @QueryProjection
    public CategoryResponse(String categoryCode, String categoryName, String upperCategoryCode, Integer sortSequence, Integer categoryLevel, String sortOrdinal, Character useYesNo) {
        this.categoryCode = categoryCode;
        this.categoryName = categoryName;
        this.upperCategoryCode = upperCategoryCode;
        this.sortSequence = sortSequence;
        this.categoryLevel = categoryLevel;
        this.sortOrdinal = sortOrdinal;
        this.useYesNo = useYesNo;
    }
}
