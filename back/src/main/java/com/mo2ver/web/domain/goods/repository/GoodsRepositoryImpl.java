package com.mo2ver.web.domain.goods.repository;

import com.mo2ver.web.common.file.dto.FileInfo;
import com.mo2ver.web.domain.goods.dto.ImageInfo;
import com.mo2ver.web.domain.goods.dto.response.GoodsDetailResponse;
import com.mo2ver.web.domain.goods.dto.response.QGoodsDetailResponse;
import com.mo2ver.web.domain.goods.entity.Goods;
import com.mo2ver.web.domain.goods.dto.request.GoodsSearchRequest;
import com.mo2ver.web.domain.goods.type.CategoryType;
import com.mo2ver.web.domain.goods.type.OptionsType;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static com.mo2ver.web.common.file.entity.QFile.file;
import static com.mo2ver.web.domain.goods.entity.QGoods.goods;
import static com.mo2ver.web.domain.goods.entity.QPrice.price;
import static com.mo2ver.web.domain.goods.entity.QDiscount.discount;
import static com.mo2ver.web.domain.goods.entity.QGoodsImage.goodsImage;
import static com.mo2ver.web.domain.goods.entity.QReview.review;
import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;

public class GoodsRepositoryImpl extends QuerydslRepositorySupport implements GoodsRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public GoodsRepositoryImpl(JPAQueryFactory queryFactory) {
        super(Goods.class);
        this.queryFactory = queryFactory;
    }

    public Optional<GoodsDetailResponse> findGoodsById(String goodsCode) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(price.options.optionsType.eq(OptionsType.BASIC));
        builder.and(goodsImage.useYesNo.eq('Y'));
        builder.and(goods.goodsCode.eq(goodsCode));

        GoodsDetailResponse result = queryFactory
                .from(goods)
                .innerJoin(goods.goodsPrices, price)
                .leftJoin(goods.goodsDiscounts, discount)
                .leftJoin(goods.goodsImages, goodsImage)
                .leftJoin(file).on(goodsImage.goodsImageAttachFile.eq(file.fileCode.intValue()))
                .where(builder)
                .transform(groupBy(goods.goodsCode).list(
                        new QGoodsDetailResponse(
                                goods.goodsCode,
                                goods.goodsName,
                                goods.goodsBrand,
                                goods.goodsGender,
                                goods.goodsYear,
                                goods.keyword,
                                list(Projections.constructor(ImageInfo.class,
                                        goodsImage.goodsImageAttachFile,
                                        goodsImage.goodsImageExtension,
                                        goodsImage.basicImageYesNo,
                                        goodsImage.sortSequence,
                                        goodsImage.useYesNo
                                )),
                                list(Projections.constructor(FileInfo.class,
                                        file.fileCode,
                                        file.fileName,
                                        file.filePath,
                                        file.fileType,
                                        file.fileSize
                                )),
                                goods.summaryInfo,
                                goods.largeCategoryCode,
                                goods.mediumCategoryCode,
                                goods.smallCategoryCode,
                                price.buyLimitYesNo,
                                price.salePeriodYesNo,
                                price.saleStartDate,
                                price.saleEndDate,
                                price.supplyPrice,
                                price.salePrice,
                                price.maxBuyQuantity,
                                discount.discountPrice,
                                discount.startDate,
                                discount.endDate,
                                JPAExpressions.select(review.rating.avg())
                                        .from(review)
                                        .where(review.goods.goodsCode.eq(goods.goodsCode))
                                        .where(review.delYesNo.eq('N')),
                                JPAExpressions.select(review.count())
                                        .from(review)
                                        .where(review.goods.goodsCode.eq(goods.goodsCode))
                                        .where(review.delYesNo.eq('N'))
                        )
                )).stream().findFirst().orElse(null);
        return Optional.ofNullable(result);
    }

    public Page<Goods> findByGoodsName(Pageable pageable, GoodsSearchRequest goodsSearchRequest) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(goods.goodsName.contains(goodsSearchRequest.getGoodsName()));
        builder.and(goods.largeCategoryCode.eq(goodsSearchRequest.getLargeCategoryCode()));
        builder.and(goods.mediumCategoryCode.eq(goodsSearchRequest.getMediumCategoryCode()));
        builder.and(goods.smallCategoryCode.eq(goodsSearchRequest.getSmallCategoryCode()));
        builder.and(price.options.optionsType.eq(OptionsType.BASIC));

        JPAQuery<Goods> query = queryFactory.selectFrom(goods)
                .innerJoin(goods.goodsPrices, price)
                .where(builder);
        List<Goods> content = Objects.requireNonNull(getQuerydsl()).applyPagination(pageable, query).fetch();
        return PageableExecutionUtils.getPage(content, pageable, query::fetchCount);
    }

    public Page<Goods> findByCategoryCode(Pageable pageable, String categoryCode, CategoryType categoryType) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(price.options.optionsType.eq(OptionsType.BASIC));
        builder.and(goodsImage.basicImageYesNo.eq('Y')); // → innerJoin으로 처음에 가져오고 나서, imageList에 대해서 한번 더 쿼리조회를 하는 방식이기 때문에, ImageDto에서 2차적으로 걸러야함

        switch (categoryType) {
            case LARGE:
                builder.and(goods.largeCategoryCode.eq(categoryCode));
                break;
            case MEDIUM:
                builder.and(goods.mediumCategoryCode.eq(categoryCode));
                break;
            case SMALL:
                builder.and(goods.smallCategoryCode.eq(categoryCode));
                break;
            default:
                break;
        }

        JPAQuery<Goods> query = queryFactory.selectFrom(goods)
                .innerJoin(goods.goodsPrices, price)
                .innerJoin(goods.goodsImages, goodsImage)
                .where(builder);
        List<Goods> content = Objects.requireNonNull(getQuerydsl()).applyPagination(pageable, query).fetch();
        return PageableExecutionUtils.getPage(content, pageable, query::fetchCount);
    }

    public List<Goods> findByGoodsRank(Integer count) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(price.options.optionsType.eq(OptionsType.BASIC));
        builder.and(goodsImage.basicImageYesNo.eq('Y'));
        return queryFactory.selectFrom(goods)
                .innerJoin(goods.goodsPrices, price)
                .innerJoin(goods.goodsImages, goodsImage)
                .where(builder)
                .orderBy(goods.viewCount.desc())
                .limit(count)
                .fetch();
    }
}
