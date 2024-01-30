package com.mo2ver.web.domain.goods.dao;

import com.mo2ver.web.domain.goods.domain.Discount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscountRepository extends JpaRepository<Discount, Long> {
}
