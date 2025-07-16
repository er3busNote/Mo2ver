package com.mo2ver.web.domain.coupon.repository;

import com.mo2ver.web.domain.coupon.entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CouponRepository extends JpaRepository<Coupon, String> {
}
