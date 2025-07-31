package com.mo2ver.web.domain.point.service;

import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.member.repository.MemberRepository;
import com.mo2ver.web.domain.order.entity.Order;
import com.mo2ver.web.domain.order.repository.OrderRepository;
import com.mo2ver.web.domain.payment.dto.PaymentInfo;
import com.mo2ver.web.domain.point.dto.PointInfo;
import com.mo2ver.web.domain.point.dto.request.PointRequest;
import com.mo2ver.web.domain.point.entity.Point;
import com.mo2ver.web.domain.point.repository.PointRepository;
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
public class PointService {

    private final MemberRepository memberRepository;
    private final OrderRepository orderRepository;
    private final PointRepository pointRepository;

    @Transactional
    public String savePoint(PointRequest pointRequest, Member currentUser) {
        Member member = this.findMemberById(currentUser.getMemberNo());
        Point point = new Point(pointRequest, member);
        return this.pointRepository.save(point).getPointNo();
    }

    @Transactional
    public void usePointMemberSync(PaymentInfo paymentInfo, Member currentUser) {
        Member member = this.findMemberById(currentUser.getMemberNo());
        Order order = this.findOrderById(paymentInfo.getOrderId());
        List<PointInfo> pointInfos = this.pointRepository.findPointDetail(member);

        log.info(member.toString());
        log.info(order.toString());
        log.info(pointInfos.toString());
    }

    public Mono<Void> usePointMember(PaymentInfo paymentInfo, Member currentUser) {
        return Mono.fromRunnable(() -> this.usePointMemberSync(paymentInfo, currentUser));
    }

    private Member findMemberById(String memberNo) {
        return this.memberRepository.findById(memberNo)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 회원번호 입니다."));
    }

    private Order findOrderById(String orderId) {
        return this.orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 주문번호 입니다."));
    }

    private Point findPointById(String pointNo) {
        return this.pointRepository.findById(pointNo)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 포인트정보 입니다."));
    }
}
