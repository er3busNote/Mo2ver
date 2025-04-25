package com.mo2ver.web.domain.goods.dto.response;

import com.mo2ver.web.domain.goods.entity.Review;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.global.common.utils.BeanUtil;
import com.mo2ver.web.global.common.utils.JasyptUtil;
import com.mo2ver.web.global.common.utils.ObjectUtil;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.util.List;
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

    @QueryProjection
    public ReviewResponse(Long goodsReviewNo, Integer imageAttachFile, String reviewContents, Integer rating, Member updator, List<Review> reviewList) {
        this.goodsReviewNo = goodsReviewNo;
        this.imageAttachFile = getEncryptor(imageAttachFile);
        this.reviewContents = reviewContents;
        this.rating = rating;
        this.memberName = updator.getMemberName();
        this.reviewResponseList = reviewList.stream().filter(ObjectUtil::nonAllFieldsNull).map(ReviewResponse::of).collect(Collectors.toList());
    }

    private static ReviewResponse of(Review review) {
        return ReviewResponse.builder()
                .goodsReviewNo(review.getGoodsReviewNo())
                .imageAttachFile(getEncryptor(review.getImageAttachFile()))
                .reviewContents(review.getReviewContents())
                .rating(review.getRating())
                .memberName(review.getUpdater().getMemberName())
                .reviewResponseList(review.getReviewList().stream()
                        .map(ReviewResponse::of)
                        .collect(Collectors.toList()))
                .build();
    }
}
