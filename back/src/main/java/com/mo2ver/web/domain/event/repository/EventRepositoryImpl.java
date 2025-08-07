package com.mo2ver.web.domain.event.repository;

import com.mo2ver.web.domain.event.dto.response.EventProductResponse;
import com.mo2ver.web.domain.event.entity.Event;
import com.mo2ver.web.domain.event.dto.EventImageInfo;
import com.mo2ver.web.domain.event.dto.EventImageProductInfo;
import com.mo2ver.web.domain.event.dto.ImageInfo;
import com.mo2ver.web.domain.event.dto.QEventImageInfo;
import com.mo2ver.web.domain.event.dto.request.EventRequest;
import com.mo2ver.web.domain.event.dto.response.QEventProductResponse;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.global.common.auth.AuthManager;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.data.support.PageableExecutionUtils;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

import static com.mo2ver.web.domain.goods.entity.QGoods.goods;
import static com.mo2ver.web.domain.goods.entity.QGoodsImage.goodsImage;
import static com.mo2ver.web.domain.goods.entity.QPrice.price;
import static com.mo2ver.web.domain.event.entity.QEvent.event;
import static com.mo2ver.web.domain.event.entity.QEventProduct.eventProduct;
import static com.mo2ver.web.domain.event.entity.QEventImage.eventImage;
import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;

public class EventRepositoryImpl extends QuerydslRepositorySupport implements EventRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public EventRepositoryImpl(JPAQueryFactory queryFactory) {
        super(Event.class);
        this.queryFactory = queryFactory;
    }

    public Page<EventProductResponse> findById(String eventNo, Pageable pageable) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(event.eventNo.eq(eventNo));
        builder.and(goodsImage.basicImageYesNo.eq('Y'));

        Expression<BigDecimal> salePrice = new CaseBuilder()
                .when(price.salePeriodYesNo.eq('Y')
                        .and(Expressions.currentDate().between(price.saleStartDate, price.saleEndDate))
                )
                .then(price.salePrice)
                .otherwise(price.supplyPrice);

        JPAQuery<EventProductResponse> query = queryFactory
                .select(new QEventProductResponse(
                        event.subject,
                        event.eventStartDate, event.eventEndDate,
                        goodsImage.goodsImageAttachFile, goodsImage.goodsImageExtension,
                        goods.goodsCode, goods.goodsName, goods.goodsBrand,
                        goods.goodsGender, goods.goodsYear,
                        price.supplyPrice, salePrice,
                        eventProduct.sortSequence,
                        goods.keyword
                ))
                .from(event)
                .innerJoin(event.eventProducts, eventProduct)
                .innerJoin(goods).on(eventProduct.productCode.eq(goods.goodsCode))
                .innerJoin(price).on(goods.goodsCode.eq(price.goods.goodsCode))
                .innerJoin(goodsImage).on(goods.goodsCode.eq(goodsImage.goods.goodsCode))
                .where(builder);
        List<EventProductResponse> content = Objects.requireNonNull(getQuerydsl()).applyPagination(pageable, query).fetch();
        return PageableExecutionUtils.getPage(content, pageable, query::fetchCount);
    }

    public Page<Event> findByAll(Pageable pageable, Member currentUser) {
        StringTemplate eventStartDate = Expressions.stringTemplate("DATE({0})", event.eventStartDate);
        StringTemplate eventEndDate = Expressions.stringTemplate("DATE({0})", event.eventEndDate);

        BooleanBuilder builder = new BooleanBuilder();
        builder.and(event.eventYesNo.eq('Y'));
        if(AuthManager.isUser(currentUser.getRoles())) {
            builder.and(Expressions.currentDate().stringValue().between(eventStartDate, eventEndDate));
        }
        builder.and(eventImage.basicImageYesNo.eq('Y'));

        JPAQuery<Event> query = queryFactory.selectFrom(event)
                .innerJoin(event.eventImages, eventImage)
                .where(builder);
        List<Event> content = Objects.requireNonNull(getQuerydsl()).applyPagination(pageable, query).fetch();
        return PageableExecutionUtils.getPage(content, pageable, query::fetchCount);
    }

    public EventImageInfo findEventDetail(EventRequest eventRequest) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(event.eventNo.eq(eventRequest.getEventNo()));

        return queryFactory
                .selectFrom(event)
                .leftJoin(event.eventImages, eventImage)
                .leftJoin(event.eventProducts, eventProduct)
                .leftJoin(goods).on(eventProduct.productCode.eq(goods.goodsCode))
                .leftJoin(price).on(goods.goodsCode.eq(price.goods.goodsCode))
                .where(builder)
                .transform(groupBy(event.eventNo).list(
                        new QEventImageInfo(
                                event.eventNo,
                                event.subject,
                                event.eventStartDate,
                                event.eventEndDate,
                                list(Projections.constructor(ImageInfo.class,
                                        Expressions.constant(""),
                                        eventImage.goodsImageAttachFile,
                                        eventImage.basicImageYesNo
                                )),
                                event.eventYesNo,
                                list(Projections.constructor(EventImageProductInfo.class,
                                        eventProduct.detailSequence,
                                        eventProduct.productCode,
                                        eventProduct.productName,
                                        price.supplyPrice,
                                        price.salePrice,
                                        eventProduct.sortSequence
                                ))
                        ))
                ).stream().findFirst().orElse(null);
    }
}
