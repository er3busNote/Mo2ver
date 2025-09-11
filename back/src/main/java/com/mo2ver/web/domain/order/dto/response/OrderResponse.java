package com.mo2ver.web.domain.order.dto.response;

import com.mo2ver.web.domain.order.dto.OrderGoodsInfo;
import com.mo2ver.web.domain.order.entity.Order;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class OrderResponse {

    private Long totalAmount;
    private List<OrderGoodsInfo> goods;

    public static OrderResponse of(Order order) {
        return OrderResponse.builder()
                .totalAmount(order.getAmount())
                .goods(order.getOrderDetails().stream().map(OrderGoodsInfo::of).collect(Collectors.toList()))
                .build();
    }
}
