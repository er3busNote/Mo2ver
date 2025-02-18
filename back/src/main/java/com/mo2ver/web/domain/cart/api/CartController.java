package com.mo2ver.web.domain.cart.api;

import com.mo2ver.web.domain.cart.dto.CartDto;
import com.mo2ver.web.domain.cart.dto.response.CartResponse;
import com.mo2ver.web.domain.cart.service.CartService;
import com.mo2ver.web.domain.member.domain.CurrentUser;
import com.mo2ver.web.domain.member.domain.Member;
import com.mo2ver.web.global.common.dto.response.ResponseHandler;
import com.mo2ver.web.global.error.dto.response.ErrorResponse;
import com.mo2ver.web.global.error.dto.response.ErrorHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/cart")
public class CartController {

    private final CartService cartService;
    private final ErrorHandler errorHandler;

    public CartController(CartService cartService, ErrorHandler errorHandler) {
        this.cartService = cartService;
        this.errorHandler = errorHandler;
    }

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
    public ResponseEntity<CartResponse> addCart(@RequestBody @Valid CartDto cartDto,
                                                @CurrentUser Member currentUser) {
        return ResponseEntity.ok().body(cartService.addCart(cartDto, currentUser));
    }

    @PutMapping("/update")
    public ResponseEntity<CartResponse> updateCart(@RequestBody @Valid CartDto cartDto,
                                                   @CurrentUser Member currentUser) {
        return ResponseEntity.ok().body(cartService.updateCart(cartDto, currentUser));
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

    private ResponseEntity<ErrorResponse> badRequest(ErrorResponse response) {
        return ResponseEntity.badRequest().body(response);
    }

    private ResponseEntity<ErrorResponse> unprocessableEntity(ErrorResponse response) {
        return ResponseEntity.unprocessableEntity().body(response);
    }
}
