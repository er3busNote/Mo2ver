package com.mo2ver.web.domain.order.service;

import com.mo2ver.web.domain.coupon.entity.CouponMember;
import com.mo2ver.web.domain.coupon.repository.CouponMemberRepository;
import com.mo2ver.web.domain.goods.entity.Goods;
import com.mo2ver.web.domain.goods.repository.GoodsRepository;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.member.repository.MemberRepository;
import com.mo2ver.web.domain.order.dto.request.OrderCouponRequest;
import com.mo2ver.web.domain.order.dto.request.OrderRequest;
import com.mo2ver.web.domain.order.dto.response.OrderGoodsResponse;
import com.mo2ver.web.domain.order.entity.Order;
import com.mo2ver.web.domain.order.repository.OrderRepository;
import com.mo2ver.web.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {

    private final MemberRepository memberRepository;
    private final GoodsRepository goodsRepository;
    private final OrderRepository orderRepository;
    private final CouponMemberRepository couponMemberRepository;

    public List<OrderGoodsResponse> findOrder(String uuid) {
        Order order = this.findOrderById(uuid);
        return order.getOrderDetails().stream().map(OrderGoodsResponse::of).collect(Collectors.toList());
    }

    @Transactional
    public UUID saveOrder(OrderRequest orderRequest, Member currentUser) {
        Member member = this.findMemberById(currentUser.getMemberNo());
        List<Goods> goodsList = orderRequest.getGoodsOrders().stream().map(orderInfo -> this.findGoodsById(orderInfo.getGoodsCode())).collect(Collectors.toList());
        Order order = new Order(orderRequest, goodsList, member);
        return this.orderRepository.save(order).getOrderId();
    }

    @Transactional
    public void updateOrderCoupon(OrderCouponRequest orderCouponRequest, Member currentUser) {
        Order order = this.findOrderById(orderCouponRequest.getOrderId());
        List<String> couponCodes = orderCouponRequest.getCouponCodes();
        List<CouponMember> couponMembers = this.findCouponMemberByCouponCodes(couponCodes, order, currentUser);
        order.update(couponMembers);
        for(CouponMember couponMember : couponMembers) {
            couponMember.update(order);
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

    private Order findOrderById(String uuid) {
        return this.orderRepository.findById(UUID.fromString(uuid))
                .orElseThrow(() -> new NotFoundException("존재하지 않는 주문번호 입니다."));
    }
    
    private List<CouponMember> findCouponMemberByCouponCodes(List<String> couponCodes, Order order, Member currentUser) {
        List<CouponMember> listCouponMember = this.couponMemberRepository.findByOrder(order);
        for(CouponMember couponMember : listCouponMember) {
            couponMember.setCoupon(null);
        }
        return this.couponMemberRepository.findByCouponCodeInAndMember(couponCodes, currentUser);
    }
}
