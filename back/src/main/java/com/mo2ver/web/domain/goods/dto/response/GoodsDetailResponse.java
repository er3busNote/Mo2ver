package com.mo2ver.web.domain.goods.dto.response;

import com.mo2ver.web.common.file.dto.FileAttachInfo;
import com.mo2ver.web.common.file.dto.FileInfo;
import com.mo2ver.web.domain.goods.dto.ImageInfo;
import com.mo2ver.web.domain.goods.entity.Goods;
import com.mo2ver.web.global.common.utils.ObjectUtil;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GoodsDetailResponse extends GoodsResponse {

    private static final SimpleDateFormat simpleformatter = new SimpleDateFormat("yyyy-MM-dd");
    private static final DateTimeFormatter dateformatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    private List<FileAttachInfo> goodsimageList;
    private String summaryInfo;
    private String largeCategoryCode;
    private String mediumCategoryCode;
    private String smallCategoryCode;
    private Integer maxBuyQuantity;
    private Character buyLimitYesNo;
    private Character salePeriodYesNo;
    private String saleStartDate;
    private String saleEndDate;
    private BigDecimal discountPrice;
    private String discountStartDate;
    private String discountEndDate;
    private Double averageRating;
    private Integer reviewCount;

    @QueryProjection
    public GoodsDetailResponse(
            String goodsCode, String goodsName, String goodsBrand, String goodsGender, String goodsYear,
            String keyword, List<ImageInfo> imageList, List<FileInfo> fileInfoList,
            String summaryInfo, String largeCategoryCode, String mediumCategoryCode, String smallCategoryCode,
            Character buyLimitYesNo, Character salePeriodYesNo, Date saleStartDate, Date saleEndDate, BigDecimal supplyPrice, BigDecimal salePrice, Integer maxBuyQuantity,
            BigDecimal discountPrice, LocalDateTime discountStartDate, LocalDateTime discountEndDate,
            Double averageRating, Long reviewCount) {
        this.goodsCode = goodsCode;
        this.goodsName = goodsName;
        this.goodsBrand = goodsBrand;
        this.goodsGender = goodsGender;
        this.goodsYear = goodsYear;
        this.keywordList = getKeywordList(keyword);
        this.imageList = imageList;
        this.goodsimageList = fileInfoList.stream().filter(ObjectUtil::nonAllFieldsNull).map(FileAttachInfo::of).collect(Collectors.toList());
        this.summaryInfo = summaryInfo;
        this.largeCategoryCode = largeCategoryCode;
        this.mediumCategoryCode = mediumCategoryCode;
        this.smallCategoryCode = smallCategoryCode;
        this.buyLimitYesNo = buyLimitYesNo;
        this.salePeriodYesNo = salePeriodYesNo;
        this.saleStartDate = Optional.ofNullable(saleStartDate).map(simpleformatter::format).orElse("");
        this.saleEndDate = Optional.ofNullable(saleEndDate).map(simpleformatter::format).orElse("");
        this.maxBuyQuantity = maxBuyQuantity;
        this.supplyPrice = supplyPrice;
        this.salePrice = salePrice;
        this.discountPrice = discountPrice;
        this.discountStartDate = Optional.ofNullable(discountStartDate).map(dateformatter::format).orElse("");
        this.discountEndDate = Optional.ofNullable(discountEndDate).map(dateformatter::format).orElse("");
        this.averageRating = Optional.ofNullable(averageRating).orElse(0.0);
        this.reviewCount = reviewCount.intValue();
    }

    public static GoodsDetailResponse of(Goods goods) {
        GoodsResponse goodsResponse = GoodsResponse.of(goods);
        return GoodsDetailResponse.builder()
                .goodsCode(goodsResponse.getGoodsCode())
                .goodsName(goodsResponse.getGoodsName())
                .goodsBrand(goodsResponse.getGoodsBrand())
                .goodsGender(goodsResponse.getGoodsGender())
                .goodsYear(goodsResponse.getGoodsYear())
                .supplyPrice(goodsResponse.getSupplyPrice())
                .salePrice(goodsResponse.getSalePrice())
                .imageList(goodsResponse.getImageList())
                .keywordList(goodsResponse.getKeywordList())
//                .averageRating(goods.getGoodsReviews().stream()
//                        .filter(r -> r.getRating() != null)
//                        .mapToInt(Review::getRating)
//                        .average()
//                        .orElse(0.0))
//                .reviewCount(goods.getGoodsReviews().size())
                .build();
    }
}
