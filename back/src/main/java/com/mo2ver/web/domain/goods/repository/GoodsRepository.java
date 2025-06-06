package com.mo2ver.web.domain.goods.repository;

import com.mo2ver.web.domain.goods.entity.Goods;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface GoodsRepository extends JpaRepository<Goods, String>, GoodsRepositoryCustom, JpaSpecificationExecutor<Goods> {
    @EntityGraph(attributePaths = {"price", "goodsImageList"})
    Optional<Goods> findByGoodsCode(String goodsCode);
    @EntityGraph(attributePaths = {"price", "goodsImageList"})
    Page<Goods> findAll(Pageable pageable);
    @EntityGraph(attributePaths = {"price", "goodsImageList"})
    Page<Goods> findByLargeCategoryCode(Pageable pageable, String largeCategoryCode);
    @EntityGraph(attributePaths = {"price", "goodsImageList"})
    Page<Goods> findByMediumCategoryCode(Pageable pageable, String mediumCategoryCode);
    @EntityGraph(attributePaths = {"price", "goodsImageList"})
    Page<Goods> findBySmallCategoryCode(Pageable pageable, String smallCategoryCode);
}
