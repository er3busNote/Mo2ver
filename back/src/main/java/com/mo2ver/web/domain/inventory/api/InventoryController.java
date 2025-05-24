package com.mo2ver.web.domain.inventory.api;

import com.mo2ver.web.domain.inventory.service.InventoryService;
import com.mo2ver.web.domain.member.entity.CurrentUser;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.global.common.dto.response.ResponseHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    /**
     * 결재한 코드에 대해서 ① 에러가 나거나, ② 10분 안에 해당 결재를 승인하지 않으면, rollback api 호출
     * @param orderId 주문번호
     * @param currentUser 현재 사용자
     * @return 상품 목록
     */
    @GetMapping("/rollback/{orderId}")
    public ResponseEntity<ResponseHandler> rollbackInventory(
            @PathVariable String orderId,
            @CurrentUser Member currentUser
    ) {
        inventoryService.rollback(orderId);
        return ResponseEntity.ok()
                .body(ResponseHandler.builder()
                        .status(HttpStatus.OK.value())
                        .message("상품정보가 수정되었습니다")
                        .build());
    }
}
