package com.mo2ver.web.domain.goods.repository;

import com.mo2ver.web.domain.goods.entity.Goods;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoodsRepository extends JpaRepository<Goods, String>, GoodsRepositoryCustom {
    @EntityGraph(attributePaths = {"price", "goodsImageList"})
    Goods findByGoodsCode(String goodsCode);
    @EntityGraph(attributePaths = {"price", "goodsImageList"})
    Page<Goods> findAll(Pageable paging);
    @EntityGraph(attributePaths = {"price", "goodsImageList"})
    Page<Goods> findByLargeCategoryCode(Pageable paging, String largeCategoryCode);
    @EntityGraph(attributePaths = {"price", "goodsImageList"})
    Page<Goods> findByMediumCategoryCode(Pageable paging, String mediumCategoryCode);
    @EntityGraph(attributePaths = {"price", "goodsImageList"})
    Page<Goods> findBySmallCategoryCode(Pageable paging, String smallCategoryCode);
}
