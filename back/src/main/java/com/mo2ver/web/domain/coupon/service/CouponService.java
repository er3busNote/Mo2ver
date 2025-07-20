package com.mo2ver.web.domain.coupon.service;

import com.mo2ver.web.domain.coupon.dto.request.CouponRequest;
import com.mo2ver.web.domain.coupon.dto.response.CouponResponse;
import com.mo2ver.web.domain.coupon.entity.Coupon;
import com.mo2ver.web.domain.coupon.entity.CouponMember;
import com.mo2ver.web.domain.coupon.repository.CouponRepository;
import com.mo2ver.web.domain.coupon.repository.CouponMemberRepository;
import com.mo2ver.web.domain.goods.entity.Goods;
import com.mo2ver.web.domain.goods.repository.GoodsRepository;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.member.repository.MemberRepository;
import com.mo2ver.web.domain.order.entity.Order;
import com.mo2ver.web.domain.order.repository.OrderRepository;
import com.mo2ver.web.domain.payment.dto.PaymentInfo;
import com.mo2ver.web.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import javax.transaction.Transactional;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CouponService {

    private final MemberRepository memberRepository;
    private final GoodsRepository goodsRepository;
    private final OrderRepository orderRepository;
    private final CouponRepository couponRepository;
    private final CouponMemberRepository couponMemberRepository;

    public CouponResponse findCoupon(String couponCode) {
        CouponMember couponMember = this.findCouponByCode(couponCode);
        return CouponResponse.of(couponMember);
    }

    @Transactional
    public String saveCoupon(CouponRequest couponRequest, Member currentUser) {
        Member member = this.findMemberById(currentUser.getMemberNo());
        Goods goods = this.findGoodsById(couponRequest.getGoodsCode());
        Coupon coupon = new Coupon(couponRequest, goods, member);
        return this.couponRepository.save(coupon).getCouponNo();
    }

    @Transactional
    public void updateCoupon(CouponRequest couponRequest, Member currentUser) {
        Coupon coupon = this.findCouponById(couponRequest.getCouponNo());
        coupon.update(couponRequest, currentUser);
    }

    @Transactional
    public String saveCouponMember(String couponNo, Member currentUser) {
        Member member = this.findMemberById(currentUser.getMemberNo());
        Coupon coupon = this.findCouponById(couponNo);
        CouponMember couponMember = new CouponMember(coupon, member);
        coupon.update();    // 현재 발급한 갯수 증가
        return this.couponMemberRepository.save(couponMember).getCouponId();
    }

    @Transactional
    private void useCouponMemberSync(PaymentInfo paymentInfo) {
        Order order = this.findOrderById(paymentInfo.getOrderId());
        List<CouponMember> couponMembers = this.couponMemberRepository.findByOrder(order);
        for(CouponMember couponMember : couponMembers) {
            couponMember.update();
            this.couponMemberRepository.save(couponMember);
        }
    }

    public Mono<Void> useCouponMember(PaymentInfo paymentInfo) {
        return Mono.fromRunnable(() -> this.useCouponMemberSync(paymentInfo));
    }

    private Member findMemberById(String memberNo) {
        return this.memberRepository.findById(memberNo)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 회원번호 입니다."));
    }

    private Goods findGoodsById(String goodsCode) {
        return this.goodsRepository.findById(goodsCode)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 상품코드 입니다."));
    }

    private Order findOrderById(String orderId) {
        return this.orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 주문번호 입니다."));
    }

    private Coupon findCouponById(String couponNo) {
        return this.couponRepository.findById(couponNo)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 쿠폰번호 입니다."));
    }

    private CouponMember findCouponByCode(String couponCode) {
        return this.couponMemberRepository.findByCouponCode(couponCode)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 쿠폰코드 입니다."));
    }
}
