package com.mo2ver.web.domain.goods.dto.response;

import com.mo2ver.web.domain.goods.entity.Review;
import com.mo2ver.web.global.common.utils.JasyptUtil;
import lombok.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ReviewResponse {

    private Long goodsReviewNo;
    private String goodsCode;
    private String imageAttachFile;
    private String reviewContents;
    private Integer rating;
    private String memberName;
    private List<ReviewResponse> reviewResponseList;

    public static ReviewResponse of(Review review) {
        return ReviewResponse.builder()
                .goodsReviewNo(review.getGoodsReviewNo())
                .goodsCode(review.getGoodsCode().getGoodsCode())
                .imageAttachFile(JasyptUtil.getEncryptor(review.getImageAttachFile()))
                .reviewContents(review.getReviewContents())
                .rating(review.getRating())
                .memberName(review.getMember().getMemberName())
                .reviewResponseList(
                        review.getReviews().stream()
                                .map(ReviewResponse::of)
                                .collect(Collectors.toList())
                )
                .build();
    }

    public static ReviewResponse of(Review review, Map<Long, List<Review>> childrenMap) {
        return ReviewResponse.builder()
                .goodsReviewNo(review.getGoodsReviewNo())
                .imageAttachFile(JasyptUtil.getEncryptor(review.getImageAttachFile()))
                .reviewContents(review.getReviewContents())
                .rating(review.getRating())
                .memberName(review.getMember().getMemberName())
                .reviewResponseList(childrenMap.getOrDefault(review.getGoodsReviewNo(), Collections.emptyList()).stream()
                        .map(r -> ReviewResponse.of(r, childrenMap))
                        .collect(Collectors.toList()))
                .build();
    }
}
