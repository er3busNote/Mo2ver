package com.mo2ver.web.domain.goods.dao;

import com.mo2ver.web.domain.goods.domain.GoodsImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GoodsImageRepository extends JpaRepository<GoodsImage, Long> {

    Optional<GoodsImage> findByGoodsImageAttachFile(Integer id);
}
