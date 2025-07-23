package com.mo2ver.web.domain.display.repository;

import com.mo2ver.web.domain.display.dto.*;
import com.mo2ver.web.domain.display.dto.response.*;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

import static com.mo2ver.web.common.code.entity.QCode.code;
import static com.mo2ver.web.domain.display.entity.QBanner.banner;
import static com.mo2ver.web.domain.display.entity.QBannerDetail.bannerDetail;
import static com.mo2ver.web.domain.display.entity.QBannerProduct.bannerProduct;
import static com.mo2ver.web.domain.goods.entity.QGoods.goods;
import static com.mo2ver.web.domain.goods.entity.QGoodsImage.goodsImage;
import static com.mo2ver.web.domain.goods.entity.QPrice.price;
import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;

public class BannerRepositoryImpl implements BannerRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public BannerRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    public BannerImageInfo findBannerDetail(BannerInfo bannerInfo) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(banner.bannerNo.eq(bannerInfo.getBannerNo()));
        builder.and(banner.displayTemplateCode.eq(bannerInfo.getDisplayTemplateCode()));

        return queryFactory
                .selectFrom(banner)
                .leftJoin(banner.bannerDetails, bannerDetail)
                .where(builder)
                .transform(groupBy(banner.bannerNo).list(
                        new QBannerImageInfo(
                                banner.bannerNo,
                                banner.subject,
                                banner.displayStartDate,
                                banner.displayEndDate,
                                Expressions.constant(""),
                                banner.displayTemplateCode,
                                banner.displayConditionCode,
                                banner.displayYesNo,
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
        builder.and(banner.bannerNo.eq(bannerInfo.getBannerNo()));
        builder.and(banner.displayTemplateCode.eq(bannerInfo.getDisplayTemplateCode()));

        return queryFactory
                .selectFrom(banner)
                .leftJoin(banner.bannerProducts, bannerProduct)
                .leftJoin(goods).on(bannerProduct.productCode.eq(goods.goodsCode))
                .leftJoin(price).on(goods.goodsCode.eq(price.goods.goodsCode))
                .where(builder)
                .transform(groupBy(banner.bannerNo).list(
                        new QGoodsDisplayInfo(
                                banner.bannerNo,
                                banner.subject,
                                banner.displayStartDate,
                                banner.displayEndDate,
                                Expressions.constant(""),
                                banner.displayTemplateCode,
                                banner.displayConditionCode,
                                banner.displayYesNo,
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
        StringTemplate displayStartDate = Expressions.stringTemplate("DATE({0})", banner.displayStartDate);
        StringTemplate displayEndDate = Expressions.stringTemplate("DATE({0})", banner.displayEndDate);

        BooleanBuilder builder = new BooleanBuilder();
        builder.and(banner.displayYesNo.eq('Y'));
        builder.and(bannerDetail.useYesNo.eq('Y'));
        builder.and(Expressions.currentDate().stringValue().between(displayStartDate, displayEndDate));

        return convertCodeToCodeName(queryFactory
                .selectFrom(banner)
                .innerJoin(banner.bannerDetails, bannerDetail)
                .where(builder)
                .orderBy(banner.bannerNo.asc(), bannerDetail.sortSequence.asc())
                .transform(groupBy(banner.displayConditionCode).as(
                        list(new QBannerDetailResponse(
                                banner.displayStartDate,
                                banner.displayEndDate,
                                bannerDetail.imageAttachFile,
                                bannerDetail.connectUrl,
                                bannerDetail.bannerContents,
                                bannerDetail.sortSequence
                        )))
                ));
    }

    public Map<String, List<BannerProductResponse>> findGroupBannerProduct() {
        StringTemplate displayStartDate = Expressions.stringTemplate("DATE({0})", banner.displayStartDate);
        StringTemplate displayEndDate = Expressions.stringTemplate("DATE({0})", banner.displayEndDate);

        BooleanBuilder builder = new BooleanBuilder();
        builder.and(banner.displayYesNo.eq('Y'));
        builder.and(Expressions.currentDate().stringValue().between(displayStartDate, displayEndDate));
        builder.and(goodsImage.basicImageYesNo.eq('Y'));

        Expression<BigDecimal> salePrice = new CaseBuilder()
                .when(price.salePeriodYesNo.eq('Y')
                        .and(Expressions.currentDate().between(price.saleStartDate, price.saleEndDate))
                )
                .then(price.salePrice)
                .otherwise(price.supplyPrice);

        return convertCodeToCodeName(queryFactory
                .selectFrom(banner)
                .innerJoin(banner.bannerProducts, bannerProduct)
                .innerJoin(goods).on(bannerProduct.productCode.eq(goods.goodsCode))
                .innerJoin(price).on(goods.goodsCode.eq(price.goods.goodsCode))
                .innerJoin(goodsImage).on(goods.goodsCode.eq(goodsImage.goods.goodsCode))
                .where(builder)
                .orderBy(banner.bannerNo.asc(), bannerProduct.sortSequence.asc())
                .transform(groupBy(banner.displayConditionCode).as(
                        list(new QBannerProductResponse(
                                banner.displayStartDate,
                                banner.displayEndDate,
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

    public Map<String, List<BannerKeywordResponse>> findGroupBannerKeyword() {
        StringTemplate displayStartDate = Expressions.stringTemplate("DATE({0})", banner.displayStartDate);
        StringTemplate displayEndDate = Expressions.stringTemplate("DATE({0})", banner.displayEndDate);

        BooleanBuilder builder = new BooleanBuilder();
        builder.and(banner.displayYesNo.eq('Y'));
        builder.and(Expressions.currentDate().stringValue().between(displayStartDate, displayEndDate));
        builder.and(goods.keyword.isNotNull());

        return convertCodeToCodeName(processGroupKeywords(queryFactory
                .selectFrom(banner)
                .innerJoin(banner.bannerProducts, bannerProduct)
                .innerJoin(goods).on(bannerProduct.productCode.eq(goods.goodsCode))
                .where(builder)
                .orderBy(banner.bannerNo.asc(), bannerProduct.sortSequence.asc())
                .transform(groupBy(banner.displayConditionCode).as(
                        list(goods.keyword))
                )));
    }

    private Map<String, List<BannerKeywordResponse>> processGroupKeywords(Map<String, List<String>> groupKeywords) {
        return groupKeywords.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> processKeywords(entry.getValue())
                ));
    }

    private List<BannerKeywordResponse> processKeywords(List<String> keywords) {
        return keywords.stream()
                .flatMap(keyword -> Arrays.stream(keyword.split("#")))  // # 기준 으로 분리
                .filter(keyword -> keyword != null && !keyword.trim().isEmpty())    // 빈 값 제거
                .collect(Collectors.groupingBy(keyword -> keyword, Collectors.summingInt(x -> 1))) // 개수 카운트
                .entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue(Comparator.reverseOrder())) // 내림차순 정렬
                .map(entry -> BannerKeywordResponse.of(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
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
