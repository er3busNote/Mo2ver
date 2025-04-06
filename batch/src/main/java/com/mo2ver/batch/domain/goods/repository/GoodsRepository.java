package com.mo2ver.batch.domain.goods.repository;

import com.mo2ver.batch.domain.goods.entity.Goods;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GoodsRepository extends JpaRepository<Goods, Long> {
    Goods findByGoodsCode(String goodsCode);
    @Query("SELECT g.goodsCode FROM Goods g WHERE g.keyword IS NULL")
    List<String> findAllGoodeCodeByKeywordIsNull();
    Page<Goods> findByKeywordIsNull(Pageable pageable);
    Long countByKeywordIsNull();
}
