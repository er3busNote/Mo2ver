package com.mo2ver.web.domain.goods.service;

import com.mo2ver.web.domain.goods.dao.CategoryRepository;
import com.mo2ver.web.domain.goods.domain.Category;
import com.mo2ver.web.domain.goods.dto.request.CategoryDetailRequest;
import com.mo2ver.web.domain.goods.dto.response.CategoryResponse;
import com.mo2ver.web.domain.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Transactional
    public List<Category> findCategory(Integer id, String upperCategoryCode) {
        return this.categoryRepository.findByCategoryLevelAndUpperCategoryCodeAndUseYesNo(id, upperCategoryCode, 'Y');
    }

    @Transactional
    public List<CategoryResponse> findCategorylist() {
        return this.categoryRepository.findCategoryList();
    }

    @Transactional
    public Category saveCategory(CategoryDetailRequest categoryDetailRequest, Member currentUser) {
        return this.categoryRepository.save(Category.of(categoryDetailRequest, currentUser));
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
