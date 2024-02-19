package com.mo2ver.web.domain.goods.dao;

import com.mo2ver.web.domain.goods.domain.Category;
import com.mo2ver.web.domain.goods.dto.CategoryDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, String>, CategoryRepositoryCustom {
    List<Category> findByCategoryLevelAndUpperCategoryCodeAndUseYesNo(Integer categoryLevel, String upperCategoryCode, Character useYesNo);
}
