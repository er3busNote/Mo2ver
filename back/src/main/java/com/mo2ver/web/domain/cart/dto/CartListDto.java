package com.mo2ver.web.domain.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import java.util.ArrayList;
import java.util.List;

@Data
@Component
@SessionScope
@NoArgsConstructor
@AllArgsConstructor
public class CartListDto {

    private List<CartDto> cartList = new ArrayList<>();

    private int cartTotal = 0;

    public void addCart(CartDto cartDto) {

        // 총액 계산
        cartDto.totalPriceCalc();

        if (cartList.isEmpty()) {  // [Case 1] : Session 에 저장된 장바구니 목록이 없을 시
            cartList.add(cartDto);
            cartTotal = cartDto.getTotalPrice();
        } else {                    // [Case 2] : Session 에 저장된 장바구니 목록이 있을 시
            cartTotal += cartDto.getTotalPrice();

            if (cartList.contains(cartDto)) {    // [Case 3] : 이미 장바구니에 추가된 메뉴 일때
                int cartIndex = cartList.indexOf(cartDto);
                int amount = cartDto.getAmount();

                CartDto newCart = cartList.get(cartIndex);
                int newAmount = newCart.getAmount() + amount;

                newCart.setAmount(newAmount);
                newCart.totalPriceCalc();
                cartList.set(cartIndex, newCart);
            } else {                // [Case 4] : 장바구니에 추가 되어 있지 않은 메뉴 일때
                cartList.add(cartDto);
            }
        }
    }

    public void deleteCart(String goodsCode) {
        cartList.removeIf(cart -> cart.getGoodsCode().equals(goodsCode));
    }

    public void deleteCart(int index) {
        if (index >= 0 && index < cartList.size()) {
            CartDto removeCart = cartList.get(index);
            int removeCartPrice = removeCart.getTotalPrice();
            cartTotal -= removeCartPrice;
            cartList.remove(index);     // [Case 5] : 특정 index 삭제
        } else {
            throw new IndexOutOfBoundsException("Invalid index: " + index);
        }
    }

    public void deleteCartList() {
        cartList.clear();
    }

    public boolean isEmpty() {
        return cartList.isEmpty();
    }
}
