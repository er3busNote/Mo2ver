package com.mo2ver.web.domain.order.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class OrderInfo {

    @NotBlank(message="상품코드가 존재하지 않습니다.")
    private String goodsCode;

    @NotNull(message="구매수량이 존재하지 않습니다.")
    private Integer quantity;

    public static OrderInfo from(String goodsCode, int amount) {
        return new OrderInfo(goodsCode, amount);
    }
}
