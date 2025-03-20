package com.mo2ver.batch.domain.goods.repository;

import com.mo2ver.batch.domain.goods.entity.Goods;
import com.mo2ver.batch.domain.goods.entity.Price;
import com.mo2ver.batch.domain.goods.entity.PriceId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;

public interface PriceRepository extends JpaRepository<Price, PriceId> {

    @Modifying
    @Query(value = "UPDATE GD_PRC p SET p.APPL_DT = :applyDate WHERE p.GD_CD = :goodsCode", nativeQuery = true)
    void updateApplyDateForGoodsCode(@Param("goodsCode") String goodsCode, @Param("applyDate") Timestamp applyDate);

    default void updateApplyDatesForGoodsCodes(List<Goods> listGoods) {
        listGoods.forEach(goods -> updateApplyDateForGoodsCode(goods.getGoodsCode(), Timestamp.valueOf(goods.getUpdateDate())));
    }
}
