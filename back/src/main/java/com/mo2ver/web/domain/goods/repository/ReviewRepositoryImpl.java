package com.mo2ver.web.domain.goods.repository;

import com.mo2ver.web.domain.goods.dto.response.ReviewResponse;
import com.mo2ver.web.domain.goods.entity.Review;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.mo2ver.web.domain.goods.entity.QReview.review;

public class ReviewRepositoryImpl implements ReviewRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public ReviewRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    public Page<ReviewResponse> findByGoodsCode(String goodCode, Pageable pageable) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(review.goodsCode.goodsCode.eq(goodCode));
        builder.and(review.delYesNo.eq('N'));

        JPAQuery<Review> topReviewsQuery = queryFactory
                .selectFrom(review)
                .where(review.upperReviewNo.goodsReviewNo.isNull())
                .where(builder)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize());

        // 1. 페이징된 데이터와 전체 결과 수를 함께 가져옴
        QueryResults<Review> results = topReviewsQuery.fetchResults();

        // 2. 전체 리뷰 수 구하기
        long totalCount = results.getTotal();

        // 3. 페이징된 상위 리뷰 목록
        List<Review> topReviews = results.getResults();

        // 4. 하위 리뷰들 조회
        List<Review> allChildren = queryFactory
                .selectFrom(review)
                .where(review.upperReviewNo.goodsReviewNo.isNotNull())
                .where(builder)
                .fetch();

        // 5. 하위 리뷰들을 상위 리뷰에 맞게 매핑
        Map<Long, List<Review>> childrenMap = allChildren.stream()
                .collect(Collectors.groupingBy(
                        review -> review.getUpperReviewNo().getGoodsReviewNo()
                ));

        // 6. 상위 리뷰에 하위 리뷰들을 매핑
        List<ReviewResponse> reviewResponses = topReviews.stream()
                .map(review -> ReviewResponse.of(review, childrenMap))
                .collect(Collectors.toList());

        return new PageImpl<>(reviewResponses, pageable, totalCount);
    }
}
