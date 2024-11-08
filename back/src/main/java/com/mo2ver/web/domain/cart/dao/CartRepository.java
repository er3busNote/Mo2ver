package com.mo2ver.web.domain.cart.dao;

import com.mo2ver.web.domain.cart.dto.CartDto;
import com.mo2ver.web.domain.cart.dto.CartListDto;
import com.mo2ver.web.domain.member.domain.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Repository
@CacheConfig(cacheNames = "cartList")
public class CartRepository {

    private final Map<String, CartListDto> userMap = new HashMap<>();

    @Cacheable(key = "#member.memberNo", unless = "#result == null")
    public CartListDto findByUser(Member member) {
        String memberNo = member.getMemberNo();
        if(userMap.containsKey(memberNo)){
            CartListDto cartList = userMap.get(memberNo);
            log.info("Repository findByUser {} => {}", member.getLoginId(), cartList);
            return cartList;
        }
        return new CartListDto();
    }

    @Caching(put = {
            @CachePut(key = "#cart.goodsCode"),
            @CachePut(key = "#member.memberNo")
    })
    @CacheEvict(key = "'all'")
    public CartListDto save(CartDto cart, Member member) {
        String memberNo = member.getMemberNo();
        CartListDto cartListDto;
        if(userMap.containsKey(memberNo)){
            cartListDto = userMap.get(memberNo);
            List<CartDto> cartList = cartListDto.getCartList();
            int cartTotal = cartListDto.getCartTotal();

            // 총액 계산
            cart.totalPriceCalc();

            if (cartList.isEmpty()) {  // [Case 1] : Session 에 저장된 장바구니 목록이 없을 시
                cartList.add(cart);
                cartTotal = cart.getTotalPrice();
            } else {                    // [Case 2] : Session 에 저장된 장바구니 목록이 있을 시
                cartTotal += cart.getTotalPrice();

                if (cartList.contains(cart)) {    // [Case 3] : 이미 장바구니에 추가된 메뉴 일때
                    int cartIndex = cartList.indexOf(cart);
                    int amount = cart.getAmount();

                    CartDto newCart = cartList.get(cartIndex);
                    int newAmount = newCart.getAmount() + amount;

                    newCart.setAmount(newAmount);
                    newCart.totalPriceCalc();
                    cartList.set(cartIndex, newCart);
                } else {                // [Case 4] : 장바구니에 추가 되어 있지 않은 메뉴 일때
                    cartList.add(cart);
                }
            }
            cartListDto = new CartListDto(cartList, cartTotal);
        } else {
            // 총액 계산
            cart.totalPriceCalc();

            List<CartDto> cartList = new ArrayList<>();
            cartList.add(cart);

            cartListDto = new CartListDto(cartList, cart.getTotalPrice());
        }
        userMap.put(memberNo, cartListDto);
        log.info("Repository save {} => {}", member.getLoginId(), cartListDto);
        return cartListDto;
    }

    @Caching(evict = {
            @CacheEvict(key = "'all'"),
            @CacheEvict(key = "#goodsCode"),
            @CacheEvict(key = "#member.memberNo")
    })
    public void delete(String goodsCode, Member member) {
        String memberNo = member.getMemberNo();
        if(userMap.containsKey(memberNo)){
            CartListDto cartListDto = userMap.get(memberNo);
            List<CartDto> cartList = cartListDto.getCartList();
            int cartTotal = cartListDto.getCartTotal();
            CartDto removeCart = cartList.stream().filter(cart -> cart.getGoodsCode().equals(goodsCode)).findAny().orElse(null);
            cartList.removeIf(cart -> cart.getGoodsCode().equals(goodsCode));
            int removeCartPrice = removeCart.getTotalPrice();
            cartTotal -= removeCartPrice;
            log.info("Repository delete {} => {}", member.getLoginId(), removeCart);
            cartListDto = new CartListDto(cartList, cartTotal);
            userMap.put(memberNo, cartListDto);
        }
    }

    @Caching(evict = {
            @CacheEvict(key = "'all'"),
            @CacheEvict(key = "#index"),
            @CacheEvict(key = "#member.memberNo")
    })
    public void delete(int index, Member member) {
        String memberNo = member.getMemberNo();
        if(userMap.containsKey(memberNo)){
            CartListDto cartListDto = userMap.get(memberNo);
            List<CartDto> cartList = cartListDto.getCartList();
            int cartTotal = cartListDto.getCartTotal();
            if (index >= 0 && index < cartList.size()) {
                CartDto removeCart = cartList.get(index);
                cartList.remove(index);     // [Case 5] : 특정 index 삭제
                int removeCartPrice = removeCart.getTotalPrice();
                cartTotal -= removeCartPrice;
                log.info("Repository delete One {} => {}", member.getLoginId(), removeCart);
                cartListDto = new CartListDto(cartList, cartTotal);
                userMap.put(memberNo, cartListDto);
            } else {
                throw new IndexOutOfBoundsException("Invalid index: " + index);
            }
        }
    }

    @Caching(evict = {
            @CacheEvict(key = "'all'"),
            @CacheEvict(key = "#member.memberNo")
    })
    public void deleteAll(Member member) {
        String memberNo = member.getMemberNo();
        if(userMap.containsKey(memberNo)){
            CartListDto cartList = userMap.get(memberNo);
            log.info("Repository delete {}", cartList);
            userMap.remove(memberNo);
        }
    }
}
