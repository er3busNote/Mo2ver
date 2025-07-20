package com.mo2ver.web.domain.delivery.service;

import com.mo2ver.web.domain.delivery.entity.Delivery;
import com.mo2ver.web.domain.delivery.repository.DeliveryRepository;
import com.mo2ver.web.domain.member.entity.Address;
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

@Slf4j
@Service
@RequiredArgsConstructor
public class DeliveryService {

    private final MemberRepository memberRepository;
    private final OrderRepository orderRepository;
    private final DeliveryRepository deliveryRepository;

    @Transactional
    private void saveDeliverySync(PaymentInfo paymentInfo, Member currentUser) {
        Member member = this.findMemberById(currentUser.getMemberNo());
        Address address = this.findAddressById(member, paymentInfo.getAddressNo());
        Order order = this.findOrderById(paymentInfo.getOrderId());
        Delivery delivery = new Delivery(order, address, member);
        this.deliveryRepository.save(delivery);
    }

    public Mono<Void> saveDelivery(PaymentInfo paymentInfo, Member currentUser) {
        return Mono.fromRunnable(() -> this.saveDeliverySync(paymentInfo, currentUser));
    }

    private Member findMemberById(String memberNo) {
        return this.memberRepository.findById(memberNo)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 회원번호 입니다."));
    }

    private Order findOrderById(String orderId) {
        return this.orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 주문번호 입니다."));
    }

    private Address findAddressById(Member member, String addressNo) {
        return member.getAddresses().stream()
                .filter(it -> it.getAddressNo().equals(addressNo))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("존재하지 않는 배송지주소번호 입니다."));
    }
}
