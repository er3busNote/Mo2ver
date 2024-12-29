package com.mo2ver.web.domain.goods.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;
import java.util.Date;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class GoodsImageDto {

    @NotBlank(message = "상품명이 존재하지 않습니다")
    private String goodsName;

    @NotBlank(message = "대카테고리코드가 존재하지 않습니다")
    private String largeCategoryCode;

    @NotBlank(message = "중카테고리코드가 존재하지 않습니다")
    private String mediumCategoryCode;

    @NotBlank(message = "소카테고리코드가 존재하지 않습니다")
    private String smallCategoryCode;

    @NotBlank(message = "성별이 존재하지 않습니다")
    private String goodsGender;

    @NotBlank(message = "브랜드가 존재하지 않습니다")
    private String goodsBrand;

    @NotBlank(message = "제조일자가 존재하지 않습니다")
    private String goodsYear;

    private String keyword;

    private String summaryInfo;

    @NotNull(message = "구매제한여부가 존재하지 않습니다")
    private Character buyLimitYesNo;

    @NotBlank(message = "구매제한조건이 존재하지 않습니다")
    private String buyLimitCondition;

    @NotNull(message = "판매기간여부가 존재하지 않습니다")
    private Character salePeriodYesNo;

    @NotNull(message = "판매시작일시가 존재하지 않습니다")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date saleStartDate;

    @NotNull(message = "판매종료일시가 존재하지 않습니다")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date saleEndDate;

    @NotNull(message="공급가를 입력해 주세요.")
    @Positive
    private BigDecimal supplyPrice;

    @NotNull(message="판매가를 입력해 주세요.")
    @Positive
    private BigDecimal salePrice;

    @NotNull(message="최대구매수량을 입력해 주세요.")
    private Integer maxBuyQuantity;

    @Positive
    private BigDecimal discountPrice;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date discountStartDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date discountEndDate;

    private Character rateYesNo;

    private Character maxLimitYesNo;

    private BigDecimal maxLimitAmount;
}
