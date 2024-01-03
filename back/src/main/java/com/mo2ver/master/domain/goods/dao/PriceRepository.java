package com.mo2ver.master.domain.goods.dao;

import com.mo2ver.master.domain.goods.domain.Price;
import com.mo2ver.master.domain.goods.domain.PriceCompositeKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PriceRepository extends JpaRepository<Price, PriceCompositeKey> {
}
