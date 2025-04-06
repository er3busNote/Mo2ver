package com.mo2ver.batch.domain.goods.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoodsDto {

    private String goodsCode;

    private String goodsName;

    private String largeCategoryCode;

    private String mediumCategoryCode;

    private String smallCategoryCode;

    private String goodsCondition;

    private String goodsGender;

    private String goodsBrand;

    private String goodsYear;

    private String register;

    private String updater;

    public static GoodsDto of(
            DataDto dataDto, String goodsName, String brandName,
            String largeCategoryCode, String mediumCategoryCode, String smallCategoryCode
    ) {
        String goodsCode = '1' + String.format("%09d", Integer.parseInt(dataDto.getId()));
        return GoodsDto.builder()
                .goodsCode(goodsCode)
                .goodsName(goodsName)
                .largeCategoryCode(largeCategoryCode)
                .mediumCategoryCode(mediumCategoryCode)
                .smallCategoryCode(smallCategoryCode)
                .goodsCondition("40")
                .goodsGender(dataDto.getGender())
                .goodsBrand(brandName)
                .goodsYear(dataDto.getYear())
                .register("SYSTEM")
                .updater("SYSTEM")
                .build();
    }
}
