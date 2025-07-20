package com.mo2ver.web.domain.coupon.repository;

import com.mo2ver.web.domain.coupon.entity.CouponMember;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CouponMemberRepository extends JpaRepository<CouponMember, String> {
    Optional<CouponMember> findByCouponCode(String couponCode);
    List<CouponMember> findByOrder(Order order);
    List<CouponMember> findByCouponCodeInAndMember(List<String> couponCodes, Member member);

    @Modifying
    @Query("UPDATE CouponMember cm SET cm.order = NULL WHERE cm.order = :order")
    void updateOrderClear(@Param("order") Order order);

    @Modifying
    @Query("UPDATE CouponMember cm SET cm.order = :order WHERE cm.couponId IN :couponIds")
    void updateOrderByCouponIds(@Param("order") Order order, @Param("couponIds") List<String> couponIds);

    @Modifying
    @Query("UPDATE CouponMember cm SET cm.useYesNo = 'Y' WHERE cm.order = :order")
    void updateUseYesNoByOrder(@Param("order") Order order);
}
