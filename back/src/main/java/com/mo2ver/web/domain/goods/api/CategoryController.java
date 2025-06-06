package com.mo2ver.web.domain.goods.api;

import com.mo2ver.web.domain.goods.entity.Category;
import com.mo2ver.web.domain.goods.dto.request.CategoryDetailRequest;
import com.mo2ver.web.domain.goods.dto.response.CategoryResponse;
import com.mo2ver.web.domain.goods.service.CategoryService;
import com.mo2ver.web.domain.member.entity.CurrentUser;
import com.mo2ver.web.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/category")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/info/{id}")
    public ResponseEntity<List<Category>> infoCategory(
            @PathVariable Integer id,
            String upperCategoryCode
    ) {
        return ResponseEntity.ok().body(categoryService.findCategory(id, upperCategoryCode));
    }

    @GetMapping("/list")
    public ResponseEntity<List<CategoryResponse>> listCategory() {
        return ResponseEntity.ok().body(categoryService.findCategorylist());
    }

    @PostMapping("/create")
    public ResponseEntity<Category> createCategory(
            @RequestBody @Valid CategoryDetailRequest categoryDetailRequest,
            @CurrentUser Member currentUser
    ) {
        return ResponseEntity.ok().body(categoryService.saveCategory(categoryDetailRequest, currentUser));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteCategory(
            @PathVariable String id
    ) {
        return ResponseEntity.ok().body(categoryService.deleteCategory(id));
    }
}
