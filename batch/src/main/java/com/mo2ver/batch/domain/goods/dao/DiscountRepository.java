package com.mo2ver.batch.domain.goods.dao;

import com.mo2ver.batch.domain.goods.domain.Discount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscountRepository extends JpaRepository<Discount, Long> {
}
