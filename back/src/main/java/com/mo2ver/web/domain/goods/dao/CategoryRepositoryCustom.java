package com.mo2ver.web.domain.goods.dao;

import com.mo2ver.web.domain.goods.dto.CategoryDto;

import java.util.List;

public interface CategoryRepositoryCustom {
    List<CategoryDto> findCategory();
}
