package com.mo2ver.web.domain.goods.repository;

import com.mo2ver.web.domain.goods.entity.Goods;
import com.mo2ver.web.domain.goods.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long>, ReviewRepositoryCustom {
    List<Review> findByUpdater(String memberNo);
    List<Review> findByDelYesNo(Character delYesNo);
    Page<Review> findByUpperReviewIsNullAndGoodsOrderByGoodsReviewNoDesc(Goods goods, Pageable pageable);
}
