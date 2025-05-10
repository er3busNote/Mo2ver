package com.mo2ver.web.domain.goods.dto.request;

import com.mo2ver.web.domain.goods.type.CategoryType;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CategoryPageRequest {

    @NotBlank(message = "카테고리 코드가 존재하지 않습니다")
    private String categoryCode;

    @NotNull(message = "카테고리 타입이 존재하지 않습니다")
    private CategoryType categoryType;
}
