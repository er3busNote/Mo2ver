package com.mo2ver.master.domain.goods.dao;

import com.mo2ver.master.domain.goods.domain.Goods;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoodsRepository extends JpaRepository<Goods, String> {
    @EntityGraph(attributePaths = {"price", "imageList"})
    Goods findByGoodsCode(String goodsCode);
    @EntityGraph(attributePaths = {"price", "imageList"})
    Page<Goods> findAll(Pageable paging);
    @EntityGraph(attributePaths = {"price", "imageList"})
    Page<Goods> findByLargeCategoryCode(Pageable paging, String largeCategoryCode);
    @EntityGraph(attributePaths = {"price", "imageList"})
    Page<Goods> findByMediumCategoryCode(Pageable paging, String mediumCategoryCode);
    @EntityGraph(attributePaths = {"price", "imageList"})
    Page<Goods> findBySmallCategoryCode(Pageable paging, String smallCategoryCode);
}
