package com.mo2ver.web.domain.event.repository;

import com.mo2ver.web.domain.event.dto.response.EventProductResponse;
import com.mo2ver.web.domain.event.entity.EventManage;
import com.mo2ver.web.domain.event.dto.EventImageInfo;
import com.mo2ver.web.domain.event.dto.EventImageProductInfo;
import com.mo2ver.web.domain.event.dto.ImageInfo;
import com.mo2ver.web.domain.event.dto.QEventImageInfo;
import com.mo2ver.web.domain.event.dto.request.EventRequest;
import com.mo2ver.web.domain.event.dto.response.QEventProductResponse;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.member.entity.MemberRole;
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

import static com.mo2ver.web.domain.goods.entity.QGoods.goods;
import static com.mo2ver.web.domain.goods.entity.QGoodsImage.goodsImage;
import static com.mo2ver.web.domain.goods.entity.QPrice.price;
import static com.mo2ver.web.domain.event.entity.QEventManage.eventManage;
import static com.mo2ver.web.domain.event.entity.QEventProduct.eventProduct;
import static com.mo2ver.web.domain.event.entity.QEventImage.eventImage;
import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;

public class EventManageRepositoryImpl extends QuerydslRepositorySupport implements EventManageRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public EventManageRepositoryImpl(JPAQueryFactory queryFactory) {
        super(EventManage.class);
        this.queryFactory = queryFactory;
    }

    public Page<EventProductResponse> findById(Integer id, Pageable pageable) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(eventManage.eventManageNo.eq(Long.valueOf(id)));
        builder.and(goodsImage.basicImageYesNo.eq('Y'));

        Expression<BigDecimal> salePrice = new CaseBuilder()
                .when(price.salePeriodYesNo.eq('Y')
                        .and(Expressions.currentDate().between(price.saleStartDate, price.saleEndDate))
                )
                .then(price.salePrice)
                .otherwise(price.supplyPrice);

        JPAQuery<EventProductResponse> query = queryFactory
                .select(new QEventProductResponse(
                        eventManage.subject,
                        eventManage.eventStartDate, eventManage.eventEndDate,
                        goodsImage.goodsImageAttachFile, goodsImage.goodsImageExtension,
                        goods.goodsCode, goods.goodsName, goods.goodsBrand,
                        goods.goodsGender, goods.goodsYear,
                        price.supplyPrice, salePrice,
                        eventProduct.sortSequence,
                        goods.keyword
                ))
                .from(eventManage)
                .innerJoin(eventManage.eventProductList, eventProduct)
                .innerJoin(goods).on(eventProduct.productCode.eq(goods.goodsCode))
                .innerJoin(price).on(goods.goodsCode.eq(price.goodsCode.goodsCode))
                .innerJoin(goodsImage).on(goods.goodsCode.eq(goodsImage.goodsCode.goodsCode))
                .where(builder);
        List<EventProductResponse> content = getQuerydsl().applyPagination(pageable, query).fetch();
        return PageableExecutionUtils.getPage(content, pageable, query::fetchCount);
    }

    public Page<EventManage> findByAll(Pageable pageable, Member currentUser) {
        StringTemplate eventStartDate = Expressions.stringTemplate("DATE({0})", eventManage.eventStartDate);
        StringTemplate eventEndDate = Expressions.stringTemplate("DATE({0})", eventManage.eventEndDate);

        BooleanBuilder builder = new BooleanBuilder();
        builder.and(eventManage.eventYesNo.eq('Y'));
        if(currentUser.getRoles().contains(MemberRole.USER)) {
            builder.and(Expressions.currentDate().stringValue().between(eventStartDate, eventEndDate));
        }
        builder.and(eventImage.basicImageYesNo.eq('Y'));

        JPAQuery<EventManage> query = queryFactory.selectFrom(eventManage)
                .innerJoin(eventManage.eventImageList, eventImage)
                .where(builder);
        List<EventManage> content = getQuerydsl().applyPagination(pageable, query).fetch();
        return PageableExecutionUtils.getPage(content, pageable, query::fetchCount);
    }

    public EventImageInfo findEventDetail(EventRequest eventRequest) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(eventManage.eventManageNo.eq(eventRequest.getEventManageNo()));

        return queryFactory
                .selectFrom(eventManage)
                .leftJoin(eventManage.eventImageList, eventImage)
                .leftJoin(eventManage.eventProductList, eventProduct)
                .leftJoin(goods).on(eventProduct.productCode.eq(goods.goodsCode))
                .leftJoin(price).on(goods.goodsCode.eq(price.goodsCode.goodsCode))
                .where(builder)
                .transform(groupBy(eventManage.eventManageNo).list(
                        new QEventImageInfo(
                                eventManage.eventManageNo,
                                eventManage.subject,
                                eventManage.eventStartDate,
                                eventManage.eventEndDate,
                                list(Projections.constructor(ImageInfo.class,
                                        Expressions.constant(""),
                                        eventImage.goodsImageAttachFile,
                                        eventImage.basicImageYesNo
                                )),
                                eventManage.eventYesNo,
                                list(Projections.constructor(EventImageProductInfo.class,
                                        eventProduct.eventProductId,
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
