package com.mo2ver.web.domain.order.service;

import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.member.repository.MemberRepository;
import com.mo2ver.web.domain.order.repository.OrderRepository;
import com.mo2ver.web.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {

    private final MemberRepository memberRepository;
    private final OrderRepository orderRepository;

    private Member findMemberById(String memberNo) {
        return this.memberRepository.findById(memberNo)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 회원번호 입니다."));
    }
}
