package com.mo2ver.web.domain.goods.dto.response;

import com.mo2ver.web.domain.goods.entity.Review;
import com.mo2ver.web.global.common.utils.BeanUtil;
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
    private String imageAttachFile;
    private String reviewContents;
    private Integer rating;
    private String memberName;
    private List<ReviewResponse> reviewResponseList;

    private static String getEncryptor(Integer id) {
        JasyptUtil jasyptUtil = BeanUtil.getBean(JasyptUtil.class);
        return jasyptUtil.encrypt(String.valueOf(id));
    }

    public static ReviewResponse of(Review review) {
        return ReviewResponse.builder()
                .goodsReviewNo(review.getGoodsReviewNo())
                .imageAttachFile(getEncryptor(review.getImageAttachFile()))
                .reviewContents(review.getReviewContents())
                .rating(review.getRating())
                .memberName(review.getUpdater().getMemberName())
                .reviewResponseList(
                        review.getReviewList().stream()
                                .map(ReviewResponse::of)
                                .collect(Collectors.toList())
                )
                .build();
    }

    public static ReviewResponse of(Review review, Map<Long, List<Review>> childrenMap) {
        return ReviewResponse.builder()
                .goodsReviewNo(review.getGoodsReviewNo())
                .imageAttachFile(getEncryptor(review.getImageAttachFile()))
                .reviewContents(review.getReviewContents())
                .rating(review.getRating())
                .memberName(review.getUpdater().getMemberName())
                .reviewResponseList(childrenMap.getOrDefault(review.getGoodsReviewNo(), Collections.emptyList()).stream()
                        .map(r -> ReviewResponse.of(r, childrenMap))
                        .collect(Collectors.toList()))
                .build();
    }
}
