package com.mo2ver.web.domain.goods.repository;

import com.mo2ver.web.domain.goods.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long>, ReviewRepositoryCustom {
}
