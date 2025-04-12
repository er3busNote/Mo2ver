package com.mo2ver.web.domain.goods.dto.response;

import com.mo2ver.web.global.common.utils.BeanUtil;
import com.mo2ver.web.global.common.utils.JasyptUtil;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

@Data
public class ReviewResponse {

    private Long goodsReviewNo;
    private Long upperReviewNo;
    private String imageAttachFile;
    private String reviewContents;
    private Integer rating;
    private String memberName;

    private static String getEncryptor(Integer id) {
        JasyptUtil jasyptUtil = BeanUtil.getBean(JasyptUtil.class);
        return jasyptUtil.encrypt(String.valueOf(id));
    }

    @QueryProjection
    public ReviewResponse(Long goodsReviewNo, Long upperReviewNo, Integer imageAttachFile, String reviewContents, Integer rating, String memberName) {
        this.goodsReviewNo = goodsReviewNo;
        this.upperReviewNo = upperReviewNo;
        this.imageAttachFile = getEncryptor(imageAttachFile);
        this.reviewContents = reviewContents;
        this.rating = rating;
        this.memberName = memberName;
    }
}
