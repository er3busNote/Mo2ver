package com.mo2ver.web.domain.goods.repository;

import com.mo2ver.web.domain.goods.dto.response.QReviewResponse;
import com.mo2ver.web.domain.goods.dto.response.ReviewResponse;
import com.mo2ver.web.domain.goods.entity.Review;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;

import static com.mo2ver.web.domain.goods.entity.QReview.review;

public class ReviewRepositoryImpl extends QuerydslRepositorySupport implements ReviewRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public ReviewRepositoryImpl(JPAQueryFactory queryFactory) {
        super(Review.class);
        this.queryFactory = queryFactory;
    }

    public Page<ReviewResponse> findByGoodsCode(String goodCode, Pageable pageable) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(review.goodsCode.goodsCode.eq(goodCode));
        builder.and(review.delYesNo.eq('N'));

        JPAQuery<ReviewResponse> query = queryFactory
                .select(new QReviewResponse(
                        review.goodsReviewNo,
                        review.imageAttachFile,
                        review.reviewContents,
                        review.rating,
                        review.updater,
                        review.reviewList
                ))
                .from(review)
                .groupBy(review.goodsReviewNo)
                .where(builder);
        List<ReviewResponse> content = getQuerydsl().applyPagination(pageable, query).fetch();
        return PageableExecutionUtils.getPage(content, pageable, query::fetchCount);
    }
}
