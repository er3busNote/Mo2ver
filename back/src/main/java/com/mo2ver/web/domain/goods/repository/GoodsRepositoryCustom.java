package com.mo2ver.web.domain.goods.repository;

import com.mo2ver.web.domain.goods.entity.Goods;
import com.mo2ver.web.domain.goods.dto.request.GoodsSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface GoodsRepositoryCustom {
    Page<Goods> findByGoodsName(Pageable pageable, GoodsSearchRequest goodsSearchRequest);
    Page<Goods> findByCategoryCode(Pageable pageable, String categoryCode, Character categoryType);
    List<Goods> findByGoodsRank(Integer count);
}
