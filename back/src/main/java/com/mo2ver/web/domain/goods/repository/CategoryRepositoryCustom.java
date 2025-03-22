package com.mo2ver.web.domain.goods.repository;

import com.mo2ver.web.domain.goods.dto.response.CategoryResponse;

import java.util.List;

public interface CategoryRepositoryCustom {
    List<CategoryResponse> findCategoryList();
}
