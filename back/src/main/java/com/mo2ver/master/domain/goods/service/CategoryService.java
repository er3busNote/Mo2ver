package com.mo2ver.master.domain.goods.service;

import com.mo2ver.master.domain.goods.dao.CategoryRepository;
import com.mo2ver.master.domain.goods.dto.CategoryDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    @Transactional
    public List<CategoryDto> findCategory() {
        return categoryRepository.findCategory();
    }
}
