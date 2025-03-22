package com.mo2ver.web.domain.goods.repository;

import com.mo2ver.web.domain.goods.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, String>, CategoryRepositoryCustom {
    List<Category> findByCategoryLevelAndUpperCategoryCodeAndUseYesNo(Integer categoryLevel, String upperCategoryCode, Character useYesNo);
}
