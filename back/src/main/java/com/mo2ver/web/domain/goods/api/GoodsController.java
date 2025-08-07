package com.mo2ver.web.domain.goods.api;

import com.mo2ver.web.domain.goods.dto.request.CategoryPageRequest;
import com.mo2ver.web.domain.goods.dto.request.GoodsImageAttachRequest;
import com.mo2ver.web.domain.goods.dto.request.GoodsSearchRequest;
import com.mo2ver.web.domain.goods.dto.response.GoodsDetailResponse;
import com.mo2ver.web.domain.goods.dto.response.GoodsResponse;
import com.mo2ver.web.domain.goods.service.GoodsService;
import com.mo2ver.web.domain.member.entity.CurrentUser;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.global.common.dto.PageInfo;
import com.mo2ver.web.global.common.dto.response.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/goods")
public class GoodsController {

    private final GoodsService goodsService;

    @GetMapping("/info/{id}")
    public ResponseEntity<GoodsDetailResponse> infoGoods(
            @PathVariable String id,
            @CurrentUser Member currentUser
    ) {
        GoodsDetailResponse goodsResponse = goodsService.findGoods(id);
        return ResponseEntity.ok().body(goodsResponse);
    }

    @GetMapping("/list")
    public ResponseEntity<Page<GoodsResponse>> listGoods(
            @Valid PageInfo pageInfo,
            @Valid CategoryPageRequest categoryPageRequest,
            @CurrentUser Member currentUser
    ) {
        Pageable pageable = PageRequest.of(pageInfo.getPage(), pageInfo.getSize(), Sort.Direction.DESC, "goodsCode");
        Page<GoodsResponse> pages = goodsService.findGoodslist(pageable, categoryPageRequest);
        return ResponseEntity.ok().body(pages);
    }

    @GetMapping("/list/rank/{count}")
    public ResponseEntity<List<GoodsResponse>> listGoodsRank(
            @PathVariable Integer count
    ) {
        List<GoodsResponse> listGoods = goodsService.findGoodslistRank(count);
        return ResponseEntity.ok().body(listGoods);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<GoodsResponse>> searchGoods(
            @Valid PageInfo pageInfo,
            @Valid GoodsSearchRequest goodsSearchRequest,
            @CurrentUser Member currentUser
    ) {
        Pageable pageable = PageRequest.of(pageInfo.getPage(), pageInfo.getSize(), Sort.Direction.DESC, "goodsCode");
        Page<GoodsResponse> pages = goodsService.findGoodsSearch(pageable, goodsSearchRequest);
        return ResponseEntity.ok(pages);
    }

    @PostMapping(value = "/create")
    public ResponseEntity<ResponseHandler> createGoods(
            @RequestBody @Valid GoodsImageAttachRequest goodsImageAttachRequest,
            @CurrentUser Member currentUser
    ) {
        String goodsCode = goodsService.saveImageGoods(goodsImageAttachRequest, currentUser);
        return ResponseEntity.created(URI.create("/create/" + goodsCode))
                .body(ResponseHandler.builder()
                        .status(HttpStatus.CREATED.value())
                        .message("상품정보가 저장되었습니다")
                        .build());
    }

    @PatchMapping("/update")
    public ResponseEntity<ResponseHandler> updateEvent(
            @RequestBody @Validated(GoodsImageAttachRequest.Update.class) GoodsImageAttachRequest goodsImageAttachRequest,
            @CurrentUser Member currentUser
    ) {
        goodsService.updateImageGoods(goodsImageAttachRequest, currentUser);
        return ResponseEntity.ok()
                .body(ResponseHandler.builder()
                        .status(HttpStatus.OK.value())
                        .message("상품정보가 수정되었습니다")
                        .build());
    }
}
