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

    @PostMapping("/add")
    public ResponseEntity addCart(@RequestBody @Valid CartDto cartDto,
                                  @CurrentUser Member currentUser) {
        return ResponseEntity.ok(cartService.addCart(cartDto));
    }

    @GetMapping("/list")
    public ResponseEntity listCart(@CurrentUser Member currentUser) {
        if (cartService.isCartEmpty()) {
            return new ResponseEntity(new ResponseDto(HttpStatus.OK.value(), "장바구니가 비어있습니다"), HttpStatus.OK);
        }
        return ResponseEntity.ok(cartService.getCartList());
    }

    @DeleteMapping("/delete")
    public ResponseEntity deleteAllCart(@CurrentUser Member currentUser) {
        cartService.deleteCartList();
        return new ResponseEntity(new ResponseDto(HttpStatus.OK.value(), "장바구니가 삭제되었습니다"), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{index}")
    public ResponseEntity deleteOneCart(@PathVariable int index, @CurrentUser Member currentUser) {
        if (cartService.isCartEmpty()) {
            return new ResponseEntity(new ResponseDto(HttpStatus.OK.value(), "장바구니가 비어있습니다"), HttpStatus.OK);
        }
        cartService.deleteCart(index);
        if (cartService.isCartEmpty()) {
            cartService.deleteCartList();
            return new ResponseEntity(new ResponseDto(HttpStatus.OK.value(), "장바구니가 비었습니다"), HttpStatus.OK);
        }
        return ResponseEntity.ok(cartService.getCartList());
    }

    private ResponseEntity badRequest(ErrorResponse response) {
        return ResponseEntity.badRequest().body(response);
    }

    private ResponseEntity unprocessableEntity(ErrorResponse response) {
        return ResponseEntity.unprocessableEntity().body(response);
    }
}
