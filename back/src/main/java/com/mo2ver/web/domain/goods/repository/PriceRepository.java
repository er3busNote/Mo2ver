package com.mo2ver.web.domain.goods.repository;

import com.mo2ver.web.domain.goods.entity.Price;
import com.mo2ver.web.domain.goods.entity.PriceId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PriceRepository extends JpaRepository<Price, PriceId> {
}
