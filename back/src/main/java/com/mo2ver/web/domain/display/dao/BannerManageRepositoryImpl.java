package com.mo2ver.web.domain.display.dao;

import com.mo2ver.web.domain.display.dto.BannerDetailDto;
import com.mo2ver.web.domain.display.dto.BannerProductDto;
import com.mo2ver.web.domain.display.dto.QBannerDetailDto;
import com.mo2ver.web.domain.display.dto.QBannerProductDto;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import static com.mo2ver.web.domain.display.domain.QBannerDetail.bannerDetail;
import static com.mo2ver.web.domain.display.domain.QBannerManage.bannerManage;
import static com.mo2ver.web.domain.display.domain.QBannerProduct.bannerProduct;
import static com.mo2ver.web.domain.event.domain.QEventManage.eventManage;
import static com.mo2ver.web.domain.goods.domain.QGoods.goods;
import static com.mo2ver.web.domain.goods.domain.QGoodsImage.goodsImage;
import static com.mo2ver.web.domain.goods.domain.QPrice.price;
import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;

public class BannerManageRepositoryImpl implements BannerManageRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public BannerManageRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    public Map<String, List<BannerDetailDto>> findGroupBannerDetail() {
        StringTemplate displayStartDate = Expressions.stringTemplate("DATE({0})", bannerManage.displayStartDate);
        StringTemplate displayEndDate = Expressions.stringTemplate("DATE({0})", bannerManage.displayEndDate);

        BooleanBuilder builder = new BooleanBuilder();
        builder.and(bannerManage.displayYesNo.eq('Y'));
        builder.and(bannerDetail.useYesNo.eq('Y'));

        return queryFactory
                .selectFrom(bannerManage)
                .innerJoin(bannerManage.bannerDetailList, bannerDetail)
                .where(builder)
                .where(Expressions.currentDate().stringValue().between(displayStartDate, displayEndDate))
                .orderBy(bannerManage.bannerManageNo.asc(), bannerDetail.detailSequence.asc(), bannerDetail.sortSequence.asc())
                .transform(groupBy(bannerManage.displayConditionCode).as(
                        list(new QBannerDetailDto(
                                bannerManage.displayStartDate,
                                bannerManage.displayEndDate,
                                bannerDetail.imageAttachFile,
                                bannerDetail.connectUrl,
                                bannerDetail.bannerContents,
                                bannerDetail.sortSequence
                        )))
                );
    }

    public Map<String, List<BannerProductDto>> findGroupBannerProduct() {
        StringTemplate displayStartDate = Expressions.stringTemplate("DATE({0})", bannerManage.displayStartDate);
        StringTemplate displayEndDate = Expressions.stringTemplate("DATE({0})", bannerManage.displayEndDate);

        BooleanBuilder builder = new BooleanBuilder();
        builder.and(bannerManage.displayYesNo.eq('Y'));
        builder.and(Expressions.currentDate().stringValue().between(displayStartDate, displayEndDate));
        builder.and(goodsImage.basicImageYesNo.eq('Y'));

        Expression<BigDecimal> salePrice = new CaseBuilder()
                .when(price.salePeriodYesNo.eq('Y')
                        .and(Expressions.currentDate().between(price.saleStartDate, price.saleEndDate))
                )
                .then(price.salePrice)
                .otherwise(price.supplyPrice);

        return queryFactory
                .selectFrom(bannerManage)
                .innerJoin(bannerManage.bannerProductList, bannerProduct)
                .innerJoin(goods).on(bannerProduct.productCode.eq(goods.goodsCode))
                .innerJoin(price).on(goods.goodsCode.eq(price.goodsCode.goodsCode))
                .innerJoin(goodsImage).on(goods.goodsCode.eq(goodsImage.goodsCode.goodsCode))
                .where(builder)
                .orderBy(bannerManage.bannerManageNo.asc(), bannerProduct.sortSequence.asc())
                .transform(groupBy(bannerManage.displayConditionCode).as(
                        list(new QBannerProductDto(
                                bannerManage.displayStartDate,
                                bannerManage.displayEndDate,
                                goodsImage.goodsImageAttachFile,
                                goodsImage.goodsImageExtension,
                                goods.goodsCode,
                                goods.goodsName,
                                goods.goodsBrand,
                                goods.goodsGender,
                                goods.goodsYear,
                                price.supplyPrice,
                                salePrice,
                                bannerProduct.sortSequence
                        )))
                );
    }
}
