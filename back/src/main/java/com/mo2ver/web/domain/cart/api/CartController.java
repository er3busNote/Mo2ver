package com.mo2ver.web.domain.cart.api;

import com.mo2ver.web.domain.cart.dto.CartDto;
import com.mo2ver.web.domain.cart.dto.CartListDto;
import com.mo2ver.web.domain.member.domain.CurrentUser;
import com.mo2ver.web.domain.member.domain.Member;
import com.mo2ver.web.global.common.dto.ResponseDto;
import com.mo2ver.web.global.error.dto.ErrorResponse;
import com.mo2ver.web.global.error.response.ErrorHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping(value = "/cart")
public class CartController {

    private final ErrorHandler errorHandler;

    public CartController(ErrorHandler errorHandler) {
        this.errorHandler = errorHandler;
    }

    @PostMapping("/add")
    public ResponseEntity addCart(@RequestBody @Valid CartDto cartDto,
                                  @CurrentUser Member currentUser,
                                  HttpSession session) {
        CartListDto cartListDto = (CartListDto) session.getAttribute("cartList");
        cartDto.totalPriceCalc();   // 총액 계산
        if (cartListDto == null) {  // Session에 저장된 장바구니 목록이 없을시
            List<CartDto> newCart = new ArrayList<>();
            newCart.add(cartDto);
            cartListDto = new CartListDto(cartDto.getTotalPrice(), newCart);
        } else {    // Session에 저장된 장바구니 목록이 있을시
            List<CartDto> prevCart = cartListDto.getCartDto();
            int prevCartTotal = cartListDto.getCartTotal();
            cartListDto.setCartTotal(prevCartTotal + cartDto.getTotalPrice());

            if (prevCart.contains(cartDto)) {    // 이미 장바구니에 추가된 메뉴일때
                int cartIndex = prevCart.indexOf(cartDto);
                int amount = cartDto.getAmount();

                CartDto newCart = prevCart.get(cartIndex);
                int newAmount = newCart.getAmount() + amount;

                newCart.setAmount(newAmount);
                newCart.totalPriceCalc();
                prevCart.set(cartIndex, newCart);
            } else {    // 장바구니에 추가되어 있지 않은 메뉴일때
                prevCart.add(cartDto);
            }
        }
        session.setAttribute("cartList", cartListDto);
        return ResponseEntity.ok(cartListDto);
    }

    @GetMapping("/list")
    public ResponseEntity listCart(HttpSession session) {
        CartListDto cartListDto = (CartListDto) session.getAttribute("cartList");
        if (cartListDto != null) {
            return ResponseEntity.ok(cartListDto);
        }
        return new ResponseEntity(new ResponseDto(HttpStatus.OK.value(), "장바구니가 비어있습니다"), HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity deleteAllCart(HttpSession session) {
        session.removeAttribute("cartList");
        return new ResponseEntity(new ResponseDto(HttpStatus.OK.value(), "장바구니가 삭제되었습니다"), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{index}")
    public ResponseEntity deleteOneCart(@PathVariable int index, HttpSession session) {
        CartListDto cartListDto = (CartListDto) session.getAttribute("cartList");
        if (cartListDto == null) {
            return new ResponseEntity(new ResponseDto(HttpStatus.OK.value(), "장바구니가 비어있습니다"), HttpStatus.OK);
        }
        int cartTotal = cartListDto.getCartTotal();
        List<CartDto> cart = cartListDto.getCartDto();
        int removeCartPrice = cart.get(index).getTotalPrice();
        cart.remove(index);
        if (cart.size() == 0) {
            session.removeAttribute("cartList");
            return new ResponseEntity(new ResponseDto(HttpStatus.OK.value(), "장바구니가 비었습니다"), HttpStatus.OK);
        }
        cartTotal -= removeCartPrice;
        cartListDto.setCartTotal(cartTotal);
        return ResponseEntity.ok(cartListDto);
    }

    private ResponseEntity badRequest(ErrorResponse response) {
        return ResponseEntity.badRequest().body(response);
    }

    private ResponseEntity unprocessableEntity(ErrorResponse response) {
        return ResponseEntity.unprocessableEntity().body(response);
    }
}
