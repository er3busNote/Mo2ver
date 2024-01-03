package com.mo2ver.batch.domain.goods.dao;

import com.mo2ver.batch.domain.goods.domain.Price;
import com.mo2ver.batch.domain.goods.domain.PriceCompositeKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PriceRepository extends JpaRepository<Price, PriceCompositeKey> {
}
