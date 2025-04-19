package com.mo2ver.web.domain.goods.repository;

import com.mo2ver.web.domain.goods.entity.Goods;
import com.mo2ver.web.domain.goods.dto.request.GoodsSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface GoodsRepositoryCustom {
    Optional<Goods> findByGoodsCode(String goodsCode);
    Page<Goods> findByGoodsName(Pageable pageable, GoodsSearchRequest goodsSearchRequest);
    Page<Goods> findByCategoryCode(Pageable pageable, String categoryCode, Character categoryType);
    List<Goods> findByGoodsRank(Integer count);
}
