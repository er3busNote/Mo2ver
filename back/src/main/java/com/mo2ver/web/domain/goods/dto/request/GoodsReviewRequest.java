package com.mo2ver.web.domain.goods.dto.request;

import lombok.*;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.groups.Default;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class GoodsReviewRequest {

    @NotNull(groups = Update.class)
    private Long reviewNo;

    @NotBlank(message = "상품코드가 존재하지 않습니다")
    private String goodsCode;

    private Long upperReviewNo;

    private String reviewImg;

    @NotBlank(message = "상품리뷰내용이 존재하지 않습니다")
    private String reviewContents;

    @NotNull
    @Min(value = 0, message = "리뷰 평점은 0점 이상 이어야 합니다.")
    @Max(value = 10, message = "리뷰 평점은 10 이하 여야 합니다.")
    private Integer rating;

    public interface Update extends Default {}
}