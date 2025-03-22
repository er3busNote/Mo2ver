package com.mo2ver.web.domain.goods.repository;

import com.mo2ver.web.domain.goods.entity.Discount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscountRepository extends JpaRepository<Discount, Long> {
}
