package com.mo2ver.master.goods;

import com.mo2ver.master.domain.goods.dto.CategoryDto;
import com.mo2ver.master.domain.goods.service.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

@Slf4j
@ExtendWith(SpringExtension.class)
@SpringBootTest
@ActiveProfiles("test")
public class CategoryServiceTest {

    @Autowired
    CategoryService categoryService;

    @Test
    @DisplayName("카테고리 정보 확인")
    public void findCategoryTest() {
        List<CategoryDto> listCategory = this.categoryService.findCategory();
        listCategory.stream().forEach((row) -> log.info("row is : " + row));
    }
}
