package com.mo2ver.web.domain.coupon.repository;

import com.mo2ver.web.domain.coupon.entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CouponRepository extends JpaRepository<Coupon, String> {

    Optional<Coupon> findByCouponCode(String couponCode);
}
