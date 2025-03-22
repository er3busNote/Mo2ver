package com.mo2ver.web.domain.cart.api;

import com.mo2ver.web.domain.cart.dto.CartInfo;
import com.mo2ver.web.domain.cart.dto.response.CartResponse;
import com.mo2ver.web.domain.cart.service.CartService;
import com.mo2ver.web.domain.member.entity.CurrentUser;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.global.common.dto.response.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/cart")
public class CartController {

    private final CartService cartService;

    @GetMapping("/list")
    public ResponseEntity listCart(@CurrentUser Member currentUser) {
        if (cartService.isCartEmpty(currentUser)) {
            return ResponseEntity.ok().body(ResponseHandler.builder()
                            .status(HttpStatus.OK.value())
                            .message("장바구니가 비어있습니다")
                            .build());
        }
        return ResponseEntity.ok().body(cartService.getCartList(currentUser));
    }

    @PostMapping("/add")
    public ResponseEntity<CartResponse> addCart(
            @RequestBody @Valid CartInfo cartInfo,
            @CurrentUser Member currentUser
    ) {
        return ResponseEntity.ok().body(cartService.addCart(cartInfo, currentUser));
    }

    @PutMapping("/update")
    public ResponseEntity<CartResponse> updateCart(
            @RequestBody @Valid CartInfo cartInfo,
            @CurrentUser Member currentUser
    ) {
        return ResponseEntity.ok().body(cartService.updateCart(cartInfo, currentUser));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<ResponseHandler> deleteAllCart(@CurrentUser Member currentUser) {
        cartService.deleteCartList(currentUser);
        return ResponseEntity.ok().body(ResponseHandler.builder()
                .status(HttpStatus.OK.value())
                .message("장바구니가 삭제되었습니다")
                .build());
    }

    @DeleteMapping("/delete/{goodsCode}")
    public ResponseEntity deleteOneCart(@PathVariable String goodsCode, @CurrentUser Member currentUser) {
        if (cartService.isCartEmpty(currentUser)) {
            return ResponseEntity.ok().body(ResponseHandler.builder()
                    .status(HttpStatus.OK.value())
                    .message("장바구니가 비어있습니다")
                    .build());
        }
        cartService.deleteCart(goodsCode, currentUser);
        if (cartService.isCartEmpty(currentUser)) {
            cartService.deleteCartList(currentUser);
            return ResponseEntity.ok().body(ResponseHandler.builder()
                    .status(HttpStatus.OK.value())
                    .message("장바구니가 비었습니다")
                    .build());
        }
        return ResponseEntity.ok().body(cartService.getCartList(currentUser));
    }
}
