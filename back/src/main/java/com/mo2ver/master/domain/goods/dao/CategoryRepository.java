package com.mo2ver.master.domain.goods.dao;

import com.mo2ver.master.domain.goods.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, String> {
}
