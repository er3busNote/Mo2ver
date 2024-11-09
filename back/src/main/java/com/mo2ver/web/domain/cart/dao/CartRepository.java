package com.mo2ver.web.domain.cart.dao;

import com.mo2ver.web.domain.cart.dto.CartDto;
import com.mo2ver.web.domain.cart.dto.CartListDto;
import com.mo2ver.web.domain.member.domain.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
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
        CartListDto cartListDto = new CartListDto();
        if(userMap.containsKey(memberNo)){
            cartListDto = userMap.get(memberNo);
        }
        cartListDto.addCart(cart);
        log.info("Repository save {} => {}", member.getLoginId(), cartListDto);
        userMap.put(memberNo, cartListDto);
        return cartListDto;
    }

    @Caching(put = {
            @CachePut(key = "#cart.goodsCode"),
            @CachePut(key = "#member.memberNo")
    })
    @CacheEvict(key = "'all'")
    public CartListDto update(CartDto cart, Member member) {
        String memberNo = member.getMemberNo();
        if(userMap.containsKey(memberNo)){
            CartListDto cartListDto = userMap.get(memberNo);
            CartDto updateCart = cartListDto.updateCart(cart);
            log.info("Repository update {} => {}", member.getLoginId(), updateCart);
            userMap.put(memberNo, cartListDto);
            return cartListDto;
        }
        return new CartListDto();
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
            CartDto removeCart = cartListDto.deleteCart(goodsCode);
            log.info("Repository delete {} => {}", member.getLoginId(), removeCart);
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
            CartDto removeCart = cartListDto.deleteCart(index);
            log.info("Repository delete One {} => {}", member.getLoginId(), removeCart);
            userMap.put(memberNo, cartListDto);
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
