package com.mo2ver.web.domain.goods.api;

import com.mo2ver.web.domain.goods.dto.request.CategoryPageRequest;
import com.mo2ver.web.domain.goods.dto.request.GoodsImageAttachRequest;
import com.mo2ver.web.domain.goods.dto.request.GoodsImageRequest;
import com.mo2ver.web.domain.goods.dto.request.GoodsSearchRequest;
import com.mo2ver.web.domain.goods.dto.response.GoodsDetailResponse;
import com.mo2ver.web.domain.goods.dto.response.GoodsResponse;
import com.mo2ver.web.domain.goods.service.GoodsService;
import com.mo2ver.web.domain.goods.validation.GoodsImageValidator;
import com.mo2ver.web.domain.member.entity.CurrentUser;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.global.common.dto.PageInfo;
import com.mo2ver.web.global.common.dto.response.ResponseHandler;
import com.mo2ver.web.global.error.type.ErrorCode;
import com.mo2ver.web.global.error.dto.ErrorInfo;
import com.mo2ver.web.global.error.dto.response.ErrorResponse;
import com.mo2ver.web.global.error.dto.response.ErrorHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/goods")
public class GoodsController {

    private final GoodsService goodsService;
    private final ErrorHandler errorHandler;
    private final GoodsImageValidator goodsImageValidator;

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

    @PostMapping(value = "/upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> uploadGoods(@RequestPart(name = "files") @Valid List<MultipartFile> files,
                                      @RequestPart(name = "goodsImage") @Valid GoodsImageRequest goodsImageRequest,
                                      @CurrentUser Member currentUser,
                                      BindingResult result) {
        goodsImageValidator.validate(files, result);
        if (result.hasErrors()) {
            return badRequest(errorHandler.buildError(ErrorCode.FILETYPE_MAPPING_INVALID, ErrorInfo.builder()
                    .errors(result.getFieldError())
                    .build()));
        }
        try {
            String goodsCode = goodsService.saveImageGoods(files, goodsImageRequest, currentUser);
            return ResponseEntity.created(URI.create("/upload/" + goodsCode))
                    .body(ResponseHandler.builder()
                            .status(HttpStatus.CREATED.value()).message("상품정보가 저장되었습니다")
                            .build());
        } catch (Exception e) {
            return unprocessableEntity(errorHandler.buildError(ErrorCode.INTERNAL_SERVER_ERROR, ErrorInfo.builder()
                    .message(e.getMessage())
                    .build()));
        }
    }

    private ResponseEntity<ErrorResponse> badRequest(ErrorResponse response) {
        return ResponseEntity.badRequest().body(response);
    }

    private ResponseEntity<ErrorResponse> unprocessableEntity(ErrorResponse response) {
        return ResponseEntity.unprocessableEntity().body(response);
    }
}
