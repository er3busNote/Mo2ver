package com.mo2ver.web.domain.cart.service;

import com.mo2ver.web.domain.cart.dao.CartRepository;
import com.mo2ver.web.domain.cart.dto.CartDto;
import com.mo2ver.web.domain.cart.dto.response.CartResponse;
import com.mo2ver.web.domain.member.domain.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class CartService {

    @Autowired
    protected CartRepository cartRepository;

    public CartResponse addCart(CartDto cartDto, Member currentUser){
        return cartRepository.save(cartDto, currentUser);
    }

    public CartResponse updateCart(CartDto cartDto, Member currentUser){
        return cartRepository.update(cartDto, currentUser);
    }

    public CartResponse getCartList(Member currentUser) {
        return cartRepository.findByUser(currentUser);
    }

    public void deleteCart(String goodsCode, Member currentUser) {
        cartRepository.delete(goodsCode, currentUser);
    }

    public void deleteCart(int index, Member currentUser) {
        cartRepository.delete(index, currentUser);
    }

    public void deleteCartList(Member currentUser) {
        cartRepository.deleteAll(currentUser);
    }

    public boolean isCartEmpty(Member currentUser) {
        CartResponse cartResponse = this.getCartList(currentUser);
        return cartResponse.isEmpty();
    }
}
