package com.mo2ver.master.domain.goods.dao;

import com.mo2ver.master.domain.goods.domain.Goods;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoodsRepository extends JpaRepository<Goods, String> {
}
