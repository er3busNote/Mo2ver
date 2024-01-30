package com.mo2ver.web.domain.goods.dao;

import com.mo2ver.web.domain.goods.domain.Goods;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface GoodsRepositoryCustom {
    Page<Goods> findByCategoryCode(Pageable pageable, String categoryCode, Character categoryType);
}
