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

    private static final int MIN_PRICE = 0;
    private static final int MAX_PRICE = 2000000;

    @NotBlank(message = "키워드를 입력해주세요")
    private String keyword;

    private String memberNo;

    @Min(value = MIN_PRICE, message = "할인 가격은 0원 이상 이어야 합니다.")
    private Integer minPrice;

    @Max(value = MAX_PRICE, message = "할인 가격은 2,000,000 이하 여야 합니다.")
    private Integer maxPrice;

    public void update() {
        if (this.minPrice == null) this.minPrice = MIN_PRICE;
        if (this.maxPrice == null) this.maxPrice = MAX_PRICE;
    }
}
