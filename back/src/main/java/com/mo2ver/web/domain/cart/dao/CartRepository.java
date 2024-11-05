package com.mo2ver.web.domain.cart.dao;

import com.mo2ver.web.domain.cart.dto.CartDto;
import com.mo2ver.web.domain.cart.dto.CartListDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Repository
@CacheConfig(cacheNames = "cartList")
public class CartRepository {

    private final List<CartDto> cartList = new ArrayList<>();

    private int cartTotal = 0;

    @Cacheable(key = "'all'")
    public CartListDto findAll() {
        log.info("Repository findAll {}", cartList);
        return new CartListDto(cartList, cartTotal);
    }

    @CachePut(key = "#cartDto.goodsCode")
    @CacheEvict(key = "'all'")
    public CartListDto save(CartDto cartDto) {
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
        return new CartListDto(cartList, cartTotal);
    }

    @Caching(evict = {
            @CacheEvict(key = "'all'"),
            @CacheEvict(key = "#goodsCode")
    })
    public void delete(String goodsCode) {
        cartList.removeIf(cart -> cart.getGoodsCode().equals(goodsCode));
    }

    @Caching(evict = {
            @CacheEvict(key = "'all'"),
            @CacheEvict(key = "#index")
    })
    public void delete(int index) {
        if (index >= 0 && index < cartList.size()) {
            CartDto removeCart = cartList.get(index);
            log.info("Repository delete One {}", removeCart);
            int removeCartPrice = removeCart.getTotalPrice();
            cartTotal -= removeCartPrice;
            cartList.remove(index);     // [Case 5] : 특정 index 삭제
        } else {
            throw new IndexOutOfBoundsException("Invalid index: " + index);
        }
    }

    @Caching(evict = {
            @CacheEvict(key = "'all'")
    })
    public void deleteAll() {
        log.info("Repository delete {}", cartList);
        cartList.clear();
        cartTotal = 0;
    }
}
