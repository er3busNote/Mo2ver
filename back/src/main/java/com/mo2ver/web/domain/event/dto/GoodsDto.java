package com.mo2ver.web.domain.event.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoodsDto {

    private String goodsCode;

    private String goodsName;

    private String goodsBrand;

    private String goodsGender;

    private String goodsYear;

    private BigDecimal supplyPrice;

    private BigDecimal salePrice;

    private List<ImageDto> imageList;

    private Integer sortSequence;
}
