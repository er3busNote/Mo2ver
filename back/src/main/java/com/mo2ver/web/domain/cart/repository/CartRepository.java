package com.mo2ver.web.domain.cart.repository;

import com.mo2ver.web.domain.cart.dto.CartInfo;
import com.mo2ver.web.domain.cart.dto.response.CartResponse;
import com.mo2ver.web.domain.member.entity.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Repository
@CacheConfig(cacheNames = "cartList")
public class CartRepository {

    private final Map<String, CartResponse> userMap = new HashMap<>();

    @Cacheable(key = "#member?.memberNo", condition = "#member != null", unless = "#result == null")
    public CartResponse findByUser(Member member) {
        String memberNo = member.getMemberNo();
        if(userMap.containsKey(memberNo)){
            CartResponse cartList = userMap.get(memberNo);
            log.info("Repository findByUser {} => {}", member.getLoginId(), cartList);
            return cartList;
        }
        return CartResponse.from();
    }

    @Caching(put = {
            @CachePut(key = "#cart.goodsCode"),
            @CachePut(key = "#member.memberNo")
    })
    @CacheEvict(key = "'all'")
    public CartResponse save(CartInfo cart, Member member) {
        String memberNo = member.getMemberNo();
        CartResponse cartResponse = CartResponse.from();
        if(userMap.containsKey(memberNo)){
            cartResponse = userMap.get(memberNo);
        }
        cartResponse.addCart(cart);
        log.info("Repository save {} => {}", member.getLoginId(), cartResponse);
        userMap.put(memberNo, cartResponse);
        return cartResponse;
    }

    @Caching(put = {
            @CachePut(key = "#cart.goodsCode"),
            @CachePut(key = "#member.memberNo")
    })
    @CacheEvict(key = "'all'")
    public CartResponse update(CartInfo cart, Member member) {
        String memberNo = member.getMemberNo();
        if(userMap.containsKey(memberNo)){
            CartResponse cartResponse = userMap.get(memberNo);
            CartInfo updateCart = cartResponse.updateCart(cart);
            log.info("Repository update {} => {}", member.getLoginId(), updateCart);
            userMap.put(memberNo, cartResponse);
            return cartResponse;
        }
        return CartResponse.from();
    }

    @Caching(evict = {
            @CacheEvict(key = "'all'"),
            @CacheEvict(key = "#goodsCode"),
            @CacheEvict(key = "#member.memberNo")
    })
    public void delete(String goodsCode, Member member) {
        String memberNo = member.getMemberNo();
        if(userMap.containsKey(memberNo)){
            CartResponse cartResponse = userMap.get(memberNo);
            CartInfo removeCart = cartResponse.deleteCart(goodsCode);
            log.info("Repository delete {} => {}", member.getLoginId(), removeCart);
            userMap.put(memberNo, cartResponse);
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
            CartResponse cartResponse = userMap.get(memberNo);
            CartInfo removeCart = cartResponse.deleteCart(index);
            log.info("Repository delete One {} => {}", member.getLoginId(), removeCart);
            userMap.put(memberNo, cartResponse);
        }
    }

    @Caching(evict = {
            @CacheEvict(key = "'all'"),
            @CacheEvict(key = "#member.memberNo")
    })
    public void deleteAll(Member member) {
        String memberNo = member.getMemberNo();
        if(userMap.containsKey(memberNo)){
            CartResponse cartList = userMap.get(memberNo);
            log.info("Repository delete {}", cartList);
            userMap.remove(memberNo);
        }
    }
}
