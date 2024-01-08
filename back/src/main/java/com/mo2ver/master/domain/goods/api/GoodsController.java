package com.mo2ver.master.domain.goods.api;

import com.mo2ver.master.domain.goods.dto.CategoryPageDto;
import com.mo2ver.master.domain.goods.dto.GoodsDto;
import com.mo2ver.master.domain.goods.service.GoodsService;
import com.mo2ver.master.domain.member.domain.CurrentUser;
import com.mo2ver.master.domain.member.domain.Member;
import com.mo2ver.master.global.common.dto.PageDto;
import com.mo2ver.master.global.error.api.ErrorResponse;
import com.mo2ver.master.global.error.service.ErrorService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

@Controller
@RequestMapping(value = "/goods")
public class GoodsController {

    private GoodsService goodsService;
    private final ErrorService errorService;

    public GoodsController(GoodsService goodsService, ErrorService errorService) {
        this.goodsService = goodsService;
        this.errorService = errorService;
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
