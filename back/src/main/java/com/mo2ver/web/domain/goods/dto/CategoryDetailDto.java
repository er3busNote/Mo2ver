package com.mo2ver.web.domain.goods.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDetailDto {

    @NotBlank(message = "카테고리 코드가 존재하지 않습니다")
    private String categoryCode;

    @NotBlank(message = "카테고리 명이 존재하지 않습니다")
    private String categoryName;

    private String upperCategoryCode;

    @NotNull(message = "카테고리 레벨이 존재하지 않습니다")
    @Range(min = 1)
    private Integer categoryLevel;

    @NotNull(message = "사용여부가 존재하지 않습니다")
    private Character useYesNo;

    @NotNull(message = "정렬순서가 존재하지 않습니다")
    @Range(min = 1)
    private Integer sortSequence;

    private String connectUrl;
}
