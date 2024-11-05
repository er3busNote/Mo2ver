package com.mo2ver.web.domain.cart.service;

import com.mo2ver.web.domain.cart.dao.CartRepository;
import com.mo2ver.web.domain.cart.dto.CartDto;
import com.mo2ver.web.domain.cart.dto.CartListDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class CartService {

    @Autowired
    protected CartRepository cartRepository;

    public CartListDto addCart(CartDto cartDto){
        return cartRepository.save(cartDto);
    }

    public CartListDto getCartList() {
        return cartRepository.findAll();
    }

    public void deleteCart(String goodsCode) {
        cartRepository.delete(goodsCode);
    }

    public void deleteCart(int index) {
        cartRepository.delete(index);
    }

    public void deleteCartList() {
        cartRepository.deleteAll();
    }

    public boolean isCartEmpty() {
        CartListDto cartListDto = cartRepository.findAll();
        return cartListDto.isEmpty();
    }
}
