package com.mo2ver.web.domain.order.api;

import com.mo2ver.web.domain.inventory.service.InventoryService;
import com.mo2ver.web.domain.member.entity.CurrentUser;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.order.dto.request.OrderCouponRequest;
import com.mo2ver.web.domain.order.dto.request.OrderPointRequest;
import com.mo2ver.web.domain.order.dto.request.OrderRequest;
import com.mo2ver.web.domain.order.dto.response.OrderGoodsResponse;
import com.mo2ver.web.domain.order.service.OrderService;
import com.mo2ver.web.domain.point.service.PointService;
import com.mo2ver.web.global.common.dto.response.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/order")
public class OrderController {

    private final OrderService orderService;
    private final PointService pointService;
    private final InventoryService inventoryService;

    @GetMapping("/info/{id}")
    public ResponseEntity<List<OrderGoodsResponse>> infoOrder(
            @PathVariable String id,
            @CurrentUser Member currentUser
    ) {
        List<OrderGoodsResponse> listOrderGoodsResponse = orderService.findOrder(id);
        return ResponseEntity.ok().body(listOrderGoodsResponse);
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseHandler> createOrder(
            @RequestBody @Valid OrderRequest orderRequest,
            @CurrentUser Member currentUser
    ) {
        String orderId = orderService.saveOrder(orderRequest, currentUser);
        inventoryService.validate(orderId);
        inventoryService.update(orderId);
        return ResponseEntity.created(URI.create("/create/" + orderId))
                .body(ResponseHandler.builder()
                        .status(HttpStatus.CREATED.value())
                        .message("주문정보가 저장되었습니다")
                        .build());
    }

    @PatchMapping("/update/coupon")
    public ResponseEntity<ResponseHandler> updateCouponOrder(
            @RequestBody @Validated(OrderCouponRequest.Update.class) OrderCouponRequest orderCouponRequest,
            @CurrentUser Member currentUser
    ) {
        orderService.updateOrderCoupon(orderCouponRequest, currentUser);
        return ResponseEntity.ok()
                .body(ResponseHandler.builder()
                        .status(HttpStatus.CREATED.value())
                        .message("쿠폰정보가 저장되었습니다")
                        .build());
    }

    @PatchMapping("/update/point")
    public ResponseEntity<ResponseHandler> updatePointOrder(
            @RequestBody @Validated(OrderPointRequest.Update.class) OrderPointRequest orderPointRequest,
            @CurrentUser Member currentUser
    ) {
        pointService.validate(orderPointRequest, currentUser);
        orderService.updateOrderPoint(orderPointRequest, currentUser);
        return ResponseEntity.ok()
                .body(ResponseHandler.builder()
                        .status(HttpStatus.CREATED.value())
                        .message("포인트정보가 저장되었습니다")
                        .build());
    }

}
