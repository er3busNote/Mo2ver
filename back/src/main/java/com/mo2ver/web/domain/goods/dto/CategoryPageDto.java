package com.mo2ver.web.domain.goods.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryPageDto {

    @NotBlank(message = "카테고리 코드가 존재하지 않습니다")
    private String categoryCode;

    @NotNull(message = "카테고리 타입이 존재하지 않습니다")
    private Character categoryType;
}
