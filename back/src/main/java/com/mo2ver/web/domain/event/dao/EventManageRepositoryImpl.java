package com.mo2ver.web.domain.event.dao;

import com.mo2ver.web.domain.event.domain.EventManage;
import com.mo2ver.web.domain.event.dto.EventDetailDto;
import com.mo2ver.web.domain.event.dto.QEventDetailDto;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.data.support.PageableExecutionUtils;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import static com.mo2ver.web.domain.goods.domain.QGoods.goods;
import static com.mo2ver.web.domain.goods.domain.QGoodsImage.goodsImage;
import static com.mo2ver.web.domain.goods.domain.QPrice.price;
import static com.mo2ver.web.domain.event.domain.QEventManage.eventManage;
import static com.mo2ver.web.domain.event.domain.QEventProduct.eventProduct;
import static com.mo2ver.web.domain.event.domain.QEventImage.eventImage;

public class EventManageRepositoryImpl extends QuerydslRepositorySupport implements EventManageRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public EventManageRepositoryImpl(JPAQueryFactory queryFactory) {
        super(EventManage.class);
        this.queryFactory = queryFactory;
    }

    public Page<EventDetailDto> findById(Integer id, Pageable pageable) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(eventManage.eventManageNo.eq(Long.valueOf(id)));
        builder.and(goodsImage.basicImageYesNo.eq('Y'));

        Expression<BigDecimal> salePrice = new CaseBuilder()
                .when(price.salePeriodYesNo.eq('Y').and(price.saleStartDate.before(new Date()).and(price.saleEndDate.after(new Date())))).then(price.salePrice)
                .otherwise(price.supplyPrice);

        JPAQuery<EventDetailDto> query = queryFactory
                .select(new QEventDetailDto(
                        eventManage.subject,
                        eventManage.eventStartDate, eventManage.eventEndDate,
                        goodsImage.goodsImageAttachFile, goodsImage.goodsImageExtension,
                        goods.goodsCode, goods.goodsName, goods.goodsBrand,
                        goods.goodsGender, goods.goodsYear,
                        price.supplyPrice, salePrice,
                        eventProduct.sortSequence
                ))
                .from(eventManage)
                .innerJoin(eventManage.eventProductList, eventProduct)
                .innerJoin(goods).on(eventProduct.productCode.eq(goods.goodsCode))
                .innerJoin(price).on(goods.goodsCode.eq(price.goodsCode.goodsCode))
                .innerJoin(goodsImage).on(goods.goodsCode.eq(goodsImage.goodsCode.goodsCode))
                .where(builder);
        List<EventDetailDto> content = getQuerydsl().applyPagination(pageable, query).fetch();
        return PageableExecutionUtils.getPage(content, pageable, query::fetchCount);
    }

    public Page<EventManage> findByAll(Pageable pageable) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(eventManage.eventYesNo.eq('Y'));
        builder.and(eventManage.eventStartDate.before(new Date()));
        builder.and(eventManage.eventEndDate.after(new Date()));
        builder.and(eventImage.basicImageYesNo.eq('Y'));

        JPAQuery<EventManage> query = queryFactory.selectFrom(eventManage)
                .innerJoin(eventManage.eventImageList, eventImage)
                .where(builder);
        List<EventManage> content = getQuerydsl().applyPagination(pageable, query).fetch();
        return PageableExecutionUtils.getPage(content, pageable, query::fetchCount);
    }
}
