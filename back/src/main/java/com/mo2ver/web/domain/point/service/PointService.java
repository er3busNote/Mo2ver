package com.mo2ver.web.domain.point.service;

import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.member.repository.MemberRepository;
import com.mo2ver.web.domain.order.entity.Order;
import com.mo2ver.web.domain.order.repository.OrderRepository;
import com.mo2ver.web.domain.payment.dto.PaymentInfo;
import com.mo2ver.web.domain.point.entity.Point;
import com.mo2ver.web.domain.point.repository.PointRepository;
import com.mo2ver.web.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class PointService {

    private final MemberRepository memberRepository;
    private final OrderRepository orderRepository;
    private final PointRepository pointRepository;

    @Transactional
    private void usePointMemberSync(PaymentInfo paymentInfo) {
        Order order = this.findOrderById(paymentInfo.getOrderId());

    }

    public Mono<Void> usePointMember(PaymentInfo paymentInfo) {
        return Mono.fromRunnable(() -> this.usePointMemberSync(paymentInfo));
    }

    private Member findMemberById(String memberNo) {
        return this.memberRepository.findById(memberNo)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 회원번호 입니다."));
    }

    private Order findOrderById(String orderId) {
        return this.orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 주문번호 입니다."));
    }

    private Point findPointById(Long pointManageNo) {
        return this.pointRepository.findById(pointManageNo)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 포인트정보 입니다."));
    }
}
