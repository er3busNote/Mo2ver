package com.mo2ver.web.domain.display.repository;

import com.mo2ver.web.domain.display.dto.*;
import com.mo2ver.web.domain.display.dto.response.BannerDetailResponse;
import com.mo2ver.web.domain.display.dto.response.BannerProductResponse;
import com.mo2ver.web.domain.display.dto.response.QBannerDetailResponse;
import com.mo2ver.web.domain.display.dto.response.QBannerProductResponse;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.math.BigDecimal;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.mo2ver.web.common.code.entity.QCode.code;
import static com.mo2ver.web.domain.display.entity.QBannerDetail.bannerDetail;
import static com.mo2ver.web.domain.display.entity.QBannerManage.bannerManage;
import static com.mo2ver.web.domain.display.entity.QBannerProduct.bannerProduct;
import static com.mo2ver.web.domain.goods.entity.QGoods.goods;
import static com.mo2ver.web.domain.goods.entity.QGoodsImage.goodsImage;
import static com.mo2ver.web.domain.goods.entity.QPrice.price;
import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;

public class BannerManageRepositoryImpl implements BannerManageRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public BannerManageRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    public BannerImageInfo findBannerDetail(BannerInfo bannerInfo) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(bannerManage.bannerManageNo.eq(bannerInfo.getBannerManageNo()));
        builder.and(bannerManage.displayTemplateCode.eq(bannerInfo.getDisplayTemplateCode()));

        return queryFactory
                .selectFrom(bannerManage)
                .leftJoin(bannerManage.bannerDetailList, bannerDetail)
                .where(builder)
                .transform(groupBy(bannerManage.bannerManageNo).list(
                        new QBannerImageInfo(
                                bannerManage.bannerManageNo,
                                bannerManage.subject,
                                bannerManage.displayStartDate,
                                bannerManage.displayEndDate,
                                Expressions.constant(""),
                                bannerManage.displayTemplateCode,
                                bannerManage.displayConditionCode,
                                bannerManage.displayYesNo,
                                list(Projections.constructor(BannerImageDetailInfo.class,
                                        bannerDetail.bannerDetailId,
                                        bannerDetail.bannerContents,
                                        bannerDetail.connectUrl,
                                        bannerDetail.imageAttachFile,
                                        bannerDetail.useYesNo
                                ))
                        ))
                ).stream().findFirst().orElse(null);
    }

    public GoodsDisplayInfo findBannerProduct(BannerInfo bannerInfo) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(bannerManage.bannerManageNo.eq(bannerInfo.getBannerManageNo()));
        builder.and(bannerManage.displayTemplateCode.eq(bannerInfo.getDisplayTemplateCode()));

        return queryFactory
                .selectFrom(bannerManage)
                .leftJoin(bannerManage.bannerProductList, bannerProduct)
                .leftJoin(goods).on(bannerProduct.productCode.eq(goods.goodsCode))
                .leftJoin(price).on(goods.goodsCode.eq(price.goodsCode.goodsCode))
                .where(builder)
                .transform(groupBy(bannerManage.bannerManageNo).list(
                        new QGoodsDisplayInfo(
                                bannerManage.bannerManageNo,
                                bannerManage.subject,
                                bannerManage.displayStartDate,
                                bannerManage.displayEndDate,
                                Expressions.constant(""),
                                bannerManage.displayTemplateCode,
                                bannerManage.displayConditionCode,
                                bannerManage.displayYesNo,
                                list(Projections.constructor(GoodsDisplayProductInfo.class,
                                        bannerProduct.bannerProductId,
                                        bannerProduct.productCode,
                                        bannerProduct.productName,
                                        price.supplyPrice,
                                        price.salePrice,
                                        bannerProduct.sortSequence
                                ))
                        ))
                ).stream().findFirst().orElse(null);
    }

    public Map<String, List<BannerDetailResponse>> findGroupBannerDetail() {
        StringTemplate displayStartDate = Expressions.stringTemplate("DATE({0})", bannerManage.displayStartDate);
        StringTemplate displayEndDate = Expressions.stringTemplate("DATE({0})", bannerManage.displayEndDate);

        BooleanBuilder builder = new BooleanBuilder();
        builder.and(bannerManage.displayYesNo.eq('Y'));
        builder.and(bannerDetail.useYesNo.eq('Y'));
        builder.and(Expressions.currentDate().stringValue().between(displayStartDate, displayEndDate));

        return convertCodeToCodeName(queryFactory
                .selectFrom(bannerManage)
                .innerJoin(bannerManage.bannerDetailList, bannerDetail)
                .where(builder)
                .orderBy(bannerManage.bannerManageNo.asc(), bannerDetail.detailSequence.asc(), bannerDetail.sortSequence.asc())
                .transform(groupBy(bannerManage.displayConditionCode).as(
                        list(new QBannerDetailResponse(
                                bannerManage.displayStartDate,
                                bannerManage.displayEndDate,
                                bannerDetail.imageAttachFile,
                                bannerDetail.connectUrl,
                                bannerDetail.bannerContents,
                                bannerDetail.sortSequence
                        )))
                ));
    }

    public Map<String, List<BannerProductResponse>> findGroupBannerProduct() {
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

        return convertCodeToCodeName(queryFactory
                .selectFrom(bannerManage)
                .innerJoin(bannerManage.bannerProductList, bannerProduct)
                .innerJoin(goods).on(bannerProduct.productCode.eq(goods.goodsCode))
                .innerJoin(price).on(goods.goodsCode.eq(price.goodsCode.goodsCode))
                .innerJoin(goodsImage).on(goods.goodsCode.eq(goodsImage.goodsCode.goodsCode))
                .where(builder)
                .orderBy(bannerManage.bannerManageNo.asc(), bannerProduct.sortSequence.asc())
                .transform(groupBy(bannerManage.displayConditionCode).as(
                        list(new QBannerProductResponse(
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
                ));
    }

    private <T> Map<String, List<T>> convertCodeToCodeName(Map<String, List<T>> finalResult) {
        return finalResult.entrySet().stream()
                .collect(Collectors.toMap(
                        entry -> { // Key 변환: code.commonCode → code.commonCodeName
                            String commonCode = entry.getKey();
                            return queryFactory
                                    .select(code.commonCodeName)
                                    .from(code)
                                    .where(code.commonCode.eq(commonCode))
                                    .fetchOne();
                        },
                        Map.Entry::getValue, // Value는 변경 없이 유지
                        (existing, replacement) -> existing, // Key 충돌 시 기존 값 유지
                        LinkedHashMap::new // 순서를 유지하기 위해 LinkedHashMap 사용
                ));
    }
}
