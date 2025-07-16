package com.mo2ver.web.domain.coupon.repository;

import com.mo2ver.web.domain.coupon.entity.CouponMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CouponMemberRepository extends JpaRepository<CouponMember, UUID> {

    Optional<CouponMember> findByCouponCode(String couponCode);
}
