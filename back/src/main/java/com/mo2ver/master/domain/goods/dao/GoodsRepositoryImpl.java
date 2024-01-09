package com.mo2ver.master.domain.goods.dao;

import com.mo2ver.master.domain.goods.domain.Goods;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;

import static com.mo2ver.master.domain.goods.domain.QGoods.goods;
import static com.mo2ver.master.domain.goods.domain.QPrice.price;
import static com.mo2ver.master.domain.goods.domain.QImage.image;

public class GoodsRepositoryImpl extends QuerydslRepositorySupport implements GoodsRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public GoodsRepositoryImpl(JPAQueryFactory queryFactory) {
        super(Goods.class);
        this.queryFactory = queryFactory;
    }

    public Page<Goods> findByCategoryCode(Pageable pageable, String categoryCode, Character categoryType) {
        BooleanBuilder builder = new BooleanBuilder();

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
                .innerJoin(goods.imageList, image)
                .where(builder);
        List<Goods> content = getQuerydsl().applyPagination(pageable, query).fetch();
        return PageableExecutionUtils.getPage(content, pageable, query::fetchCount);
    }
}
