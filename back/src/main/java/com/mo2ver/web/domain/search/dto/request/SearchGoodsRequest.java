package com.mo2ver.web.domain.search.dto.request;

import lombok.*;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class SearchGoodsRequest {

    @NotBlank(message = "키워드를 입력해주세요")
    private String keyword;
    
    @Min(value = 0, message = "할인 가격은 0원 이상 이어야 합니다.")
    private Integer minPrice;
    
    @Max(value = 2000000, message = "할인 가격은 2,000,000 이하 여야 합니다.")
    private Integer maxPrice;
}
