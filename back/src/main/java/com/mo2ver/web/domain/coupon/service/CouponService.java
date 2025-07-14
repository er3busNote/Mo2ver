package com.mo2ver.web.domain.coupon.service;

import com.mo2ver.web.domain.coupon.dto.request.CouponRequest;
import com.mo2ver.web.domain.coupon.dto.response.CouponResponse;
import com.mo2ver.web.domain.coupon.entity.Coupon;
import com.mo2ver.web.domain.coupon.repository.CouponRepository;
import com.mo2ver.web.domain.goods.entity.Goods;
import com.mo2ver.web.domain.goods.repository.GoodsRepository;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.member.repository.MemberRepository;
import com.mo2ver.web.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class CouponService {

    private final MemberRepository memberRepository;
    private final GoodsRepository goodsRepository;
    private final CouponRepository couponRepository;

    public CouponResponse findCoupon(String uuid) {
        Coupon coupon = this.findCouponById(uuid);
        return CouponResponse.of(coupon);
    }

    public UUID saveCoupon(CouponRequest couponRequest, Member currentUser) {
        Member member = this.findMemberById(currentUser.getMemberNo());
        Goods goods = this.findGoodsById(couponRequest.getGoodsCode());
        Coupon coupon = new Coupon(goods, member);
        return this.couponRepository.save(coupon).getCouponId();
    }

    private Member findMemberById(String memberNo) {
        return this.memberRepository.findById(memberNo)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 회원번호 입니다."));
    }

    private Goods findGoodsById(String goodsCode) {
        return this.goodsRepository.findById(goodsCode)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 상품코드 입니다."));
    }

    private Coupon findCouponById(String uuid) {
        return this.couponRepository.findById(UUID.fromString(uuid))
                .orElseThrow(() -> new NotFoundException("존재하지 않는 쿠폰번호 입니다."));
    }
}
