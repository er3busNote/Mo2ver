package com.mo2ver.web.domain.goods.repository;

import com.mo2ver.web.domain.goods.entity.Goods;
import com.mo2ver.web.domain.goods.dto.request.GoodsSearchRequest;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;
import java.util.Optional;

import static com.mo2ver.web.domain.goods.entity.QGoods.goods;
import static com.mo2ver.web.domain.goods.entity.QPrice.price;
import static com.mo2ver.web.domain.goods.entity.QDiscount.discount;
import static com.mo2ver.web.domain.goods.entity.QGoodsImage.goodsImage;

public class GoodsRepositoryImpl extends QuerydslRepositorySupport implements GoodsRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public GoodsRepositoryImpl(JPAQueryFactory queryFactory) {
        super(Goods.class);
        this.queryFactory = queryFactory;
    }

    public Optional<Goods> findByGoodsCode(String goodsCode) {
        Goods result = queryFactory.selectFrom(goods)
                .leftJoin(goods.price, price)
                .leftJoin(goods.goodsDiscounts, discount).fetchJoin()
                .leftJoin(goods.goodsImages, goodsImage)
                .where(goods.goodsCode.eq(goodsCode))
                .fetchOne();
        return Optional.ofNullable(result);
    }

    public Page<Goods> findByGoodsName(Pageable pageable, GoodsSearchRequest goodsSearchRequest) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(goods.goodsName.contains(goodsSearchRequest.getGoodsName()));
        builder.and(goods.largeCategoryCode.eq(goodsSearchRequest.getLargeCategoryCode()));
        builder.and(goods.mediumCategoryCode.eq(goodsSearchRequest.getMediumCategoryCode()));
        builder.and(goods.smallCategoryCode.eq(goodsSearchRequest.getSmallCategoryCode()));

        JPAQuery<Goods> query = queryFactory.selectFrom(goods)
                .innerJoin(goods.price, price)
                .where(builder);
        List<Goods> content = getQuerydsl().applyPagination(pageable, query).fetch();
        return PageableExecutionUtils.getPage(content, pageable, query::fetchCount);
    }

    public Page<Goods> findByCategoryCode(Pageable pageable, String categoryCode, Character categoryType) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(goodsImage.basicImageYesNo.eq('Y')); // → innerJoin으로 처음에 가져오고 나서, imageList에 대해서 한번 더 쿼리조회를 하는 방식이기 때문에, ImageDto에서 2차적으로 걸러야함

        switch (categoryType) {
            case 'L':
                builder.and(goods.largeCategoryCode.eq(categoryCode));
                break;
            case 'M':
                builder.and(goods.mediumCategoryCode.eq(categoryCode));
                break;
            case 'S':
                builder.and(goods.smallCategoryCode.eq(categoryCode));
                break;
            default:
                break;
        }

        JPAQuery<Goods> query = queryFactory.selectFrom(goods)
                .innerJoin(goods.price, price)
                .innerJoin(goods.goodsImages, goodsImage)
                .where(builder);
        List<Goods> content = getQuerydsl().applyPagination(pageable, query).fetch();
        return PageableExecutionUtils.getPage(content, pageable, query::fetchCount);
    }

    public List<Goods> findByGoodsRank(Integer count) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(goodsImage.basicImageYesNo.eq('Y'));
        return queryFactory.selectFrom(goods)
                .innerJoin(goods.price, price)
                .innerJoin(goods.goodsImages, goodsImage)
                .where(builder)
                .orderBy(goods.viewCount.desc())
                .limit(count)
                .fetch();
    }
}
