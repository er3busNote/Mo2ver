package com.mo2ver.web.domain.goods.dao;

import com.mo2ver.web.domain.goods.domain.Goods;
import com.mo2ver.web.domain.goods.dto.request.GoodsSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface GoodsRepositoryCustom {
    Page<Goods> findByGoodsName(Pageable pageable, GoodsSearchRequest goodsSearchRequest);
    Page<Goods> findByCategoryCode(Pageable pageable, String categoryCode, Character categoryType);
    List<Goods> findByGoodsRank(Integer count);
}
