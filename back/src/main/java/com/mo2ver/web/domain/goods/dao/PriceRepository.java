package com.mo2ver.web.domain.goods.dao;

import com.mo2ver.web.domain.goods.domain.Price;
import com.mo2ver.web.domain.goods.domain.PriceId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PriceRepository extends JpaRepository<Price, PriceId> {
}
