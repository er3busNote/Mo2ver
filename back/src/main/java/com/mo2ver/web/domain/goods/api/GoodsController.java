package com.mo2ver.web.domain.goods.api;

import com.mo2ver.web.domain.goods.dto.CategoryPageDto;
import com.mo2ver.web.domain.goods.dto.GoodsDto;
import com.mo2ver.web.domain.goods.service.GoodsService;
import com.mo2ver.web.domain.member.domain.CurrentUser;
import com.mo2ver.web.domain.member.domain.Member;
import com.mo2ver.web.global.common.dto.PageDto;
import com.mo2ver.web.global.error.dto.ErrorResponse;
import com.mo2ver.web.global.error.service.ErrorHandler;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

@Controller
@RequestMapping(value = "/goods")
public class GoodsController {

    private GoodsService goodsService;
    private final ErrorHandler errorHandler;

    public GoodsController(GoodsService goodsService, ErrorHandler errorHandler) {
        this.goodsService = goodsService;
        this.errorHandler = errorHandler;
    }

    @GetMapping("/info/{id}")
    public ResponseEntity infoGoods(@PathVariable String id,
                                    @CurrentUser Member currentUser) {
        GoodsDto goodsDto = goodsService.selectGoods(id);
        return ResponseEntity.ok(goodsDto);
    }

    @GetMapping("/list")
    public ResponseEntity listGoods(@Valid PageDto pageDto,
                                    @Valid CategoryPageDto categoryPageDto,
                                    @CurrentUser Member currentUser) {
        Pageable pageable = PageRequest.of(pageDto.getPage(), pageDto.getSize(), Sort.Direction.DESC, "goodsCode");
        Page<GoodsDto> pages = goodsService.findGoodslist(pageable, categoryPageDto);
        return ResponseEntity.ok(pages);
    }

    private ResponseEntity badRequest(ErrorResponse response) {
        return ResponseEntity.badRequest().body(response);
    }
}
