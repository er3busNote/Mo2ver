package com.mo2ver.master.domain.goods.dao;

import com.mo2ver.master.domain.goods.dto.CategoryDto;

import java.util.List;

public interface CategoryRepositoryCustom {
    List<CategoryDto> findCategory();
}
