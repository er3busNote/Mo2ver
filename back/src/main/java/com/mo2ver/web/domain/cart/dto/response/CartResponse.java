package com.mo2ver.web.domain.cart.dto.response;

import com.mo2ver.web.domain.cart.dto.CartInfo;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.IntStream;

@Data
@Component
@SessionScope
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class CartResponse {

    private List<CartInfo> cartList = new ArrayList<>();

    private int cartTotal = 0;

    public static CartResponse from() {
        return new CartResponse();
    }

    public void addCart(CartInfo cart) {

        // 총액 계산
        cart.totalPriceCalc();

        if (cartList.isEmpty()) {  // [Case 1] : Session 에 저장된 장바구니 목록이 없을 시
            cartList.add(cart);
            cartTotal = cart.getTotalPrice();
        } else {                    // [Case 2] : Session 에 저장된 장바구니 목록이 있을 시
            cartTotal += cart.getTotalPrice();

            String goodsCode = cart.getGoodsCode();
            boolean cartExists = this.isExist(goodsCode);
            if (cartExists) {    // [Case 3] : 이미 장바구니에 추가된 메뉴 일때
                int cartIndex = this.findCartIndex(goodsCode);
                int amount = cart.getAmount();

                CartInfo newCart = cartList.get(cartIndex);
                int newAmount = newCart.getAmount() + amount;

                newCart.setAmount(newAmount);
                newCart.totalPriceCalc();
                cartList.set(cartIndex, newCart);
            } else {                // [Case 4] : 장바구니에 추가 되어 있지 않은 메뉴 일때
                cartList.add(cart);
            }
        }
    }

    public CartInfo updateCart(CartInfo cart) {
        int cartIndex = this.findCartIndex(cart.getGoodsCode());
        int amount = cart.getAmount();
        boolean check = cart.isCheck();

        boolean isUpdate = false;

        CartInfo updateCart = cartList.get(cartIndex);
        if(updateCart.getAmount() != amount){
            updateCart.setAmount(amount);
            updateCart.totalPriceCalc();
            isUpdate = true;
        }

        if(updateCart.isCheck() != check){
            updateCart.setCheck(check);
            isUpdate = true;
        }

        if(isUpdate){
            cartList.set(cartIndex, updateCart);
            this.calcTotalCart();   // 총합 재계산
        }

        return updateCart;
    }

    public CartInfo deleteCart(String goodsCode) {
        CartInfo removeCart = this.findCart(goodsCode);
        cartList.removeIf(cart -> cart.getGoodsCode().equals(goodsCode));   // [Case 5.1] : 특정 index 삭제
        cartTotal -= removeCart.getTotalPrice();
        return removeCart;
    }

    public CartInfo deleteCart(int index) {
        if (index >= 0 && index < cartList.size()) {
            CartInfo removeCart = cartList.get(index);
            cartTotal -= removeCart.getTotalPrice();
            cartList.remove(index);     // [Case 5.2] : 특정 index 삭제
            return removeCart;
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

    public boolean isExist(String goodsCode) {
        return cartList.stream().anyMatch(cart -> cart.getGoodsCode().equals(goodsCode));
    }

    public CartInfo findCart(String goodsCode) {
        return cartList.stream().filter(cart -> cart.getGoodsCode().equals(goodsCode)).findAny().orElseThrow(() -> new NoSuchElementException("상품코드가 " + goodsCode + "인 장바구니 내역을 찾을 수 없습니다."));
    }

    public int findCartIndex(String goodsCode) {
        return IntStream.range(0, cartList.size()).filter(i -> cartList.get(i).getGoodsCode().equals(goodsCode)).findFirst().orElseThrow(() -> new NoSuchElementException("상품코드가 " + goodsCode + "인 장바구니 내역을 찾을 수 없습니다."));
    }
    
    public void calcTotalCart() {
        cartTotal = 0;
        for(CartInfo cart : cartList){
            if(cart.isCheck()){
                cartTotal += cart.getTotalPrice();
            }
        }
    }
}
