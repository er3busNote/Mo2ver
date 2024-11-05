package com.mo2ver.web.domain.cart.service;

import com.mo2ver.web.domain.cart.dto.CartDto;
import com.mo2ver.web.domain.cart.dto.CartListDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class CartService {

    protected final HttpSession session;

    public CartService(HttpSession session) {
        this.session = session;
    }

    public CartListDto addCart(CartDto cartDto){
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
        return cartListDto;
    }

    public CartListDto getCartList() {
        return (CartListDto) session.getAttribute("cartList");
    }

    public void deleteCartList() {
        session.removeAttribute("cartList");
    }
}
