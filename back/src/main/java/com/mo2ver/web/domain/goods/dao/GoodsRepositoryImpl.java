package com.mo2ver.web.domain.goods.dao;

import com.mo2ver.web.domain.goods.domain.Goods;
import com.mo2ver.web.domain.goods.dto.GoodsSearchDto;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;

import static com.mo2ver.web.domain.goods.domain.QGoods.goods;
import static com.mo2ver.web.domain.goods.domain.QPrice.price;
import static com.mo2ver.web.domain.goods.domain.QGoodsImage.goodsImage;

public class GoodsRepositoryImpl extends QuerydslRepositorySupport implements GoodsRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public GoodsRepositoryImpl(JPAQueryFactory queryFactory) {
        super(Goods.class);
        this.queryFactory = queryFactory;
    }

    public Page<Goods> findByGoodsName(Pageable pageable, GoodsSearchDto goodsSearchDto) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(goods.goodsName.contains(goodsSearchDto.getGoodsName()));
        builder.and(goods.largeCategoryCode.eq(goodsSearchDto.getLargeCategoryCode()));
        builder.and(goods.mediumCategoryCode.eq(goodsSearchDto.getMediumCategoryCode()));
        builder.and(goods.smallCategoryCode.eq(goodsSearchDto.getSmallCategoryCode()));

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
                .innerJoin(goods.goodsImageList, goodsImage)
                .where(builder);
        List<Goods> content = getQuerydsl().applyPagination(pageable, query).fetch();
        return PageableExecutionUtils.getPage(content, pageable, query::fetchCount);
    }

    public List<Goods> findByGoodsRank(Integer count) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(goodsImage.basicImageYesNo.eq('Y'));
        return queryFactory.selectFrom(goods)
                .innerJoin(goods.price, price)
                .innerJoin(goods.goodsImageList, goodsImage)
                .where(builder)
                .orderBy(goods.reviewCount.desc())
                .limit(count)
                .fetch();
    }
}
