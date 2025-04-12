package com.mo2ver.web.domain.goods.repository;

import com.mo2ver.web.domain.goods.dto.response.ReviewResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReviewRepositoryCustom {
    Page<ReviewResponse> findByGoodsCode(String goodCode, Pageable pageable);
}
