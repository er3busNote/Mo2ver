package com.mo2ver.batch.domain.goods.repository;

import com.mo2ver.batch.domain.goods.entity.Discount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscountRepository extends JpaRepository<Discount, Long> {
}
