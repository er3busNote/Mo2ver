package com.mo2ver.web.domain.order.dto.request;

import com.mo2ver.web.domain.order.dto.OrderInfo;
import com.mo2ver.web.global.common.validation.MinListSize;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class OrderRequest {

    @MinListSize(value = 1, message = "상품 리스트는 최소 1개 이상의 항목을 포함해야 합니다.")
    private List<OrderInfo> goodsOrders;
}
