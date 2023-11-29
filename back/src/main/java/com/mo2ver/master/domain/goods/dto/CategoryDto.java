package com.mo2ver.master.domain.goods.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.SqlResultSetMapping;

@Data
public class CategoryDto {

    private String categoryCode;

    private String categoryName;

    private String upperCategoryCode;

    private Integer sortSequence;

    private Integer categoryLevel;

    private String sortOrdinal;

    private Character useYesNo;

    @QueryProjection
    public CategoryDto(String categoryCode, String categoryName, String upperCategoryCode, Integer sortSequence, Integer categoryLevel, String sortOrdinal, Character useYesNo) {
        this.categoryCode = categoryCode;
        this.categoryName = categoryName;
        this.upperCategoryCode = upperCategoryCode;
        this.sortSequence = sortSequence;
        this.categoryLevel = categoryLevel;
        this.sortOrdinal = sortOrdinal;
        this.useYesNo = useYesNo;
    }
}
