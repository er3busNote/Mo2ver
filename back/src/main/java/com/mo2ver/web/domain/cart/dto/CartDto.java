package com.mo2ver.web.domain.cart.dto;

import com.mo2ver.web.domain.goods.dto.ImageDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Objects;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartDto {

    private String goodsCode;
    private String goodsName;
    private String goodsBrand;
    private String goodsGender;
    private String goodsYear;
    private BigDecimal supplyPrice;
    private BigDecimal salePrice;
    private ImageDto image;

    private int amount;
    private int totalPrice;

    private String[] optionName;
    private int[] optionPrice;
    private long[] optionId;

    private boolean check = true;

    public void totalPriceCalc() {
        int temp_Price = 0;
        if(optionPrice != null) {
            for(int price : optionPrice) {
                temp_Price += price;
            }
        }
        this.totalPrice = (temp_Price + salePrice.intValue()) * amount;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + Arrays.hashCode(optionId);
        result = prime * result + Arrays.hashCode(optionName);
        result = prime * result + Arrays.hashCode(optionPrice);
        result = prime * result + Objects.hash(goodsCode, goodsName, salePrice);
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        CartDto other = (CartDto) obj;
        return goodsCode == other.goodsCode && Objects.equals(goodsName, other.goodsName) && salePrice == other.salePrice
                && Arrays.equals(optionId, other.optionId) && Arrays.equals(optionName, other.optionName)
                && Arrays.equals(optionPrice, other.optionPrice);
    }
}
