package com.mo2ver.web.domain.goods.service;

import com.mo2ver.web.domain.goods.dao.CategoryRepository;
import com.mo2ver.web.domain.goods.domain.Category;
import com.mo2ver.web.domain.goods.dto.CategoryDetailDto;
import com.mo2ver.web.domain.goods.dto.CategoryDto;
import com.mo2ver.web.domain.member.domain.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    protected CategoryRepository categoryRepository;

    @Transactional
    public List<Category> findCategory(Integer id) {
        return this.categoryRepository.findByCategoryLevelAndUseYesNo(id, 'Y');
    }

    @Transactional
    public List<CategoryDto> findCategorylist() {
        return this.categoryRepository.findCategoryList();
    }

    @Transactional
    public Category saveCategory(CategoryDetailDto categoryDetailDto, Member currentUser) {
        return this.categoryRepository.save(Category.of(categoryDetailDto, currentUser));
    }

    @Transactional
    public boolean deleteCategory(String id) {
        Optional<Category> info = this.categoryRepository.findById(id);
        if (info.isPresent()) {
            Category category = info.get();
            categoryRepository.delete(category);
            return true;
        } else {
            return false;
        }
    }
}
