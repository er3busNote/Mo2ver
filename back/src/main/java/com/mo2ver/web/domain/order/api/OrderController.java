package com.mo2ver.web.domain.order.api;

import com.mo2ver.web.domain.inventory.service.InventoryService;
import com.mo2ver.web.domain.member.entity.CurrentUser;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.order.dto.request.OrderRequest;
import com.mo2ver.web.domain.order.service.OrderService;
import com.mo2ver.web.global.common.dto.response.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/order")
public class OrderController {

    private final OrderService orderService;
    private final InventoryService inventoryService;

    @PostMapping("/create")
    public ResponseEntity<ResponseHandler> createOrder(
            @RequestBody @Valid OrderRequest orderRequest,
            @CurrentUser Member currentUser
    ) {
        UUID orderId = orderService.saveOrder(orderRequest, currentUser);
        inventoryService.validate(orderId);
        inventoryService.update(orderId);
        return ResponseEntity.created(URI.create("/create/" + orderId))
                .body(ResponseHandler.builder()
                        .status(HttpStatus.CREATED.value())
                        .message("주문정보가 저장되었습니다")
                        .build());
    }

}
