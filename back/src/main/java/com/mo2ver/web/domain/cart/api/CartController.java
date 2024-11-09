package com.mo2ver.web.domain.cart.api;

import com.mo2ver.web.domain.cart.dto.CartDto;
import com.mo2ver.web.domain.cart.service.CartService;
import com.mo2ver.web.domain.member.domain.CurrentUser;
import com.mo2ver.web.domain.member.domain.Member;
import com.mo2ver.web.global.common.dto.ResponseDto;
import com.mo2ver.web.global.error.dto.ErrorResponse;
import com.mo2ver.web.global.error.response.ErrorHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
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
            return new ResponseEntity(new ResponseDto(HttpStatus.OK.value(), "장바구니가 비어있습니다"), HttpStatus.OK);
        }
        return ResponseEntity.ok(cartService.getCartList(currentUser));
    }

    @PostMapping("/add")
    public ResponseEntity addCart(@RequestBody @Valid CartDto cartDto,
                                  @CurrentUser Member currentUser) {
        return ResponseEntity.ok(cartService.addCart(cartDto, currentUser));
    }

    @PutMapping("/update")
    public ResponseEntity updateCart(@RequestBody @Valid CartDto cartDto,
                                  @CurrentUser Member currentUser) {
        return ResponseEntity.ok(cartService.updateCart(cartDto, currentUser));
    }

    @DeleteMapping("/delete")
    public ResponseEntity deleteAllCart(@CurrentUser Member currentUser) {
        cartService.deleteCartList(currentUser);
        return new ResponseEntity(new ResponseDto(HttpStatus.OK.value(), "장바구니가 삭제되었습니다"), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{goodsCode}")
    public ResponseEntity deleteOneCart(@PathVariable String goodsCode, @CurrentUser Member currentUser) {
        if (cartService.isCartEmpty(currentUser)) {
            return new ResponseEntity(new ResponseDto(HttpStatus.OK.value(), "장바구니가 비어있습니다"), HttpStatus.OK);
        }
        cartService.deleteCart(goodsCode, currentUser);
        if (cartService.isCartEmpty(currentUser)) {
            cartService.deleteCartList(currentUser);
            return new ResponseEntity(new ResponseDto(HttpStatus.OK.value(), "장바구니가 비었습니다"), HttpStatus.OK);
        }
        return ResponseEntity.ok(cartService.getCartList(currentUser));
    }

    private ResponseEntity badRequest(ErrorResponse response) {
        return ResponseEntity.badRequest().body(response);
    }

    private ResponseEntity unprocessableEntity(ErrorResponse response) {
        return ResponseEntity.unprocessableEntity().body(response);
    }
}
