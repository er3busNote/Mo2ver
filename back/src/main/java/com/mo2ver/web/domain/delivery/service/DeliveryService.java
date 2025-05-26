package com.mo2ver.web.domain.delivery.service;

import com.mo2ver.web.domain.delivery.entity.Delivery;
import com.mo2ver.web.domain.delivery.repository.DeliveryRepository;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.member.repository.MemberRepository;
import com.mo2ver.web.domain.order.entity.Order;
import com.mo2ver.web.domain.order.repository.OrderRepository;
import com.mo2ver.web.domain.payment.dto.PaymentInfo;
import com.mo2ver.web.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class DeliveryService {

    private final MemberRepository memberRepository;
    private final OrderRepository orderRepository;
    private final DeliveryRepository deliveryRepository;

    public void saveDelivery(PaymentInfo paymentInfo, Member currentUser) {
        Member member = this.findMemberById(currentUser.getMemberNo());
        Order order = this.findOrderById(paymentInfo.getOrderId());
        Delivery delivery = new Delivery(order, member);
        this.deliveryRepository.save(delivery);
    }

    private Member findMemberById(String memberNo) {
        return this.memberRepository.findById(memberNo)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 회원번호 입니다."));
    }

    private Order findOrderById(UUID orderId) {
        return this.orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 주문번호 입니다."));
    }
}
