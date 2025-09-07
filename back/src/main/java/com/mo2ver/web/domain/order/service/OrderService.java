package com.mo2ver.web.domain.order.service;

import com.mo2ver.web.domain.coupon.entity.CouponMember;
import com.mo2ver.web.domain.coupon.repository.CouponMemberRepository;
import com.mo2ver.web.domain.goods.entity.Goods;
import com.mo2ver.web.domain.goods.repository.GoodsRepository;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.member.repository.MemberRepository;
import com.mo2ver.web.domain.order.dto.request.OrderCouponRequest;
import com.mo2ver.web.domain.order.dto.request.OrderPointRequest;
import com.mo2ver.web.domain.order.dto.request.OrderRequest;
import com.mo2ver.web.domain.order.dto.response.OrderGoodsResponse;
import com.mo2ver.web.domain.order.entity.Order;
import com.mo2ver.web.domain.order.entity.OrderCoupon;
import com.mo2ver.web.domain.order.repository.OrderRepository;
import com.mo2ver.web.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {

    private final MemberRepository memberRepository;
    private final GoodsRepository goodsRepository;
    private final OrderRepository orderRepository;
    private final CouponMemberRepository couponMemberRepository;

    public List<OrderGoodsResponse> findOrder(String orderId) {
        Order order = this.findOrderById(orderId);
        return order.getOrderDetails().stream().map(OrderGoodsResponse::of).collect(Collectors.toList());
    }

    @Transactional
    public String saveOrder(OrderRequest orderRequest, Member currentUser) {
        Member member = this.findMemberById(currentUser.getMemberNo());
        List<Goods> goodsList = orderRequest.getGoodsOrders().stream().map(orderInfo -> this.findGoodsById(orderInfo.getGoodsCode())).collect(Collectors.toList());
        Order order = new Order(orderRequest, goodsList, member);
        return this.orderRepository.save(order).getOrderId();
    }

    @Transactional
    public void updateOrderCoupon(OrderCouponRequest orderCouponRequest, Member currentUser) {
        Order order = this.findOrderById(orderCouponRequest.getOrderId());
        Integer totalAmount = orderCouponRequest.getTotalAmount();
        List<CouponMember> couponMembers = this.getCouponMembers(orderCouponRequest, currentUser);
        this.validate(totalAmount, couponMembers);
        order.update(couponMembers);
        this.updateCouponMember(order);
    }

    @Transactional
    public void applyOrderCoupon(OrderCouponRequest orderCouponRequest, Member currentUser) {
        Order order = this.findOrderById(orderCouponRequest.getOrderId());
        Integer totalAmount = orderCouponRequest.getTotalAmount();
        Integer amount = orderCouponRequest.getCouponAmount();
        List<CouponMember> couponMembers = this.getCouponMembers(orderCouponRequest, currentUser);
        this.validate(totalAmount, couponMembers);
        for (CouponMember couponMember : couponMembers) {
            int discountAmount = couponMember.getCoupon().getDiscountAmount().intValue();
            if(amount > discountAmount) {
                amount -= discountAmount;
                order.update(couponMember, discountAmount);
            } else {
                order.update(couponMember, amount);
                amount = 0;
            }
        }
    }

    @Transactional
    public void updateOrderPoint(OrderPointRequest orderPointRequest, Member currentUser) {
        Order order = this.findOrderById(orderPointRequest.getOrderId());
        Integer pointAmount = orderPointRequest.getPointAmount();
    }

    @Transactional
    public void updateCouponMember(Order order) {
        List<CouponMember> couponMembers = order.getOrderCoupons().stream().map(OrderCoupon::getCouponMember).collect(Collectors.toList());
        List<String> couponIds = couponMembers.stream().map(CouponMember::getCouponId).collect(Collectors.toList());
        this.couponMemberRepository.updateOrderClear(order);
        this.couponMemberRepository.updateOrderByCouponIds(order, couponIds);
    }

    @Transactional
    private List<CouponMember> getCouponMembers(OrderCouponRequest orderCouponRequest, Member currentUser) {
        List<String> couponCodes = orderCouponRequest.getCouponCodes();
        return this.findCouponMemberByCouponCodes(couponCodes, currentUser);
    }

    private void validate(Integer totalAmount, List<CouponMember> couponMembers) {
        for (CouponMember couponMember : couponMembers) {
            int minOrderAmount = couponMember.getCoupon().getMinOrderAmount().intValue();
            if (totalAmount < minOrderAmount) {
                throw new IllegalArgumentException("해당 쿠폰은 최소 주문 금액이 " + minOrderAmount + "원 이상이어야 합니다.");
            }
        }
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
    
    private List<CouponMember> findCouponMemberByCouponCodes(List<String> couponCodes, Member currentUser) {
        return this.couponMemberRepository.findByCouponCodeInAndMember(couponCodes, currentUser);
    }
}
