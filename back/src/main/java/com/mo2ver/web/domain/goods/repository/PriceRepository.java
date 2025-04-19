package com.mo2ver.web.domain.goods.repository;

import com.mo2ver.web.domain.goods.entity.Price;
import com.mo2ver.web.domain.goods.entity.PriceId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PriceRepository extends JpaRepository<Price, PriceId> {
    Optional<Price> findByPriceIdGoodsCodeAndPriceIdMemberNo(String goodsCode, String memberNo);
}
