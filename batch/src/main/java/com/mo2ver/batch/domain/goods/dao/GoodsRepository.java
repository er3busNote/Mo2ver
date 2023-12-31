package com.mo2ver.batch.domain.goods.dao;

import com.mo2ver.batch.domain.goods.domain.Goods;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoodsRepository extends JpaRepository<Goods, Long> {
}
