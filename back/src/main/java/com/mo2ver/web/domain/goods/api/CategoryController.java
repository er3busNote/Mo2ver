package com.mo2ver.web.domain.goods.api;

import com.mo2ver.web.domain.goods.dto.CategoryDetailDto;
import com.mo2ver.web.domain.goods.service.CategoryService;
import com.mo2ver.web.domain.member.domain.CurrentUser;
import com.mo2ver.web.domain.member.domain.Member;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
@RequestMapping(value = "/category")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/info/{id}")
    public ResponseEntity infoCategory(@PathVariable Integer id, String upperCategoryCode) {
        return ResponseEntity.ok(categoryService.findCategory(id, upperCategoryCode));
    }

    @GetMapping("/list")
    public ResponseEntity listCategory() {
        return ResponseEntity.ok(categoryService.findCategorylist());
    }

    @PostMapping("/create")
    public ResponseEntity createCategory(@RequestBody @Valid CategoryDetailDto categoryDetailDto,
                                         @CurrentUser Member currentUser) {
        return ResponseEntity.ok(categoryService.saveCategory(categoryDetailDto, currentUser));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteCategory(@PathVariable String id) {
        return ResponseEntity.ok(categoryService.deleteCategory(id));
    }
}
