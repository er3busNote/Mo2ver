package com.mo2ver.batch.domain.goods.repository;

import com.mo2ver.batch.domain.goods.entity.Goods;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoodsRepository extends JpaRepository<Goods, Long> {
}
