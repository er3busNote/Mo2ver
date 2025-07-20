package com.mo2ver.web.domain.coupon.repository;

import com.mo2ver.web.domain.coupon.entity.CouponMember;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CouponMemberRepository extends JpaRepository<CouponMember, UUID> {
    Optional<CouponMember> findByCouponCode(String couponCode);
    List<CouponMember> findByOrder(Order order);
    List<CouponMember> findByCouponCodeInAndMember(List<String> couponCodes, Member member);
}
