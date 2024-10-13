package com.mo2ver.web.domain.goods.api;

import com.mo2ver.web.domain.goods.dto.CategoryPageDto;
import com.mo2ver.web.domain.goods.dto.GoodsDto;
import com.mo2ver.web.domain.goods.dto.GoodsImageDto;
import com.mo2ver.web.domain.goods.dto.GoodsSearchDto;
import com.mo2ver.web.domain.goods.service.GoodsService;
import com.mo2ver.web.domain.goods.validation.GoodsImageValidator;
import com.mo2ver.web.domain.member.domain.CurrentUser;
import com.mo2ver.web.domain.member.domain.Member;
import com.mo2ver.web.global.common.dto.PageDto;
import com.mo2ver.web.global.common.dto.ResponseDto;
import com.mo2ver.web.global.error.dto.ErrorCode;
import com.mo2ver.web.global.error.dto.ErrorResponse;
import com.mo2ver.web.global.error.response.ErrorHandler;
import org.apache.tika.Tika;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping(value = "/goods")
public class GoodsController {

    private final GoodsService goodsService;
    private final ErrorHandler errorHandler;
    private final GoodsImageValidator goodsImageValidator;

    public GoodsController(GoodsService goodsService, ErrorHandler errorHandler, GoodsImageValidator goodsImageValidator) {
        this.goodsService = goodsService;
        this.errorHandler = errorHandler;
        this.goodsImageValidator = goodsImageValidator;
    }

    @GetMapping("/image")
    public ResponseEntity imageGoods(@RequestParam String id) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            byte[] bannerImageBytes = goodsService.findGoodsImage(id.replace(" ", "+"));
            ByteArrayResource resource = new ByteArrayResource(bannerImageBytes);
            Tika tika = new Tika();
            String tikaMimeType = tika.detect(bannerImageBytes);
            MediaType mediaType = MediaType.parseMediaType(tikaMimeType);
            return ResponseEntity.ok().contentType(mediaType).body(resource);
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return unprocessableEntity(errorHandler.buildError(ErrorCode.INTERNAL_SERVER_ERROR, response));
        }
    }

    @GetMapping("/info/{id}")
    public ResponseEntity infoGoods(@PathVariable String id,
                                    @CurrentUser Member currentUser) {
        GoodsDto goodsDto = goodsService.findGoods(id);
        return ResponseEntity.ok().body(goodsDto);
    }

    @GetMapping("/list")
    public ResponseEntity listGoods(@Valid PageDto pageDto,
                                    @Valid CategoryPageDto categoryPageDto,
                                    @CurrentUser Member currentUser) {
        Pageable pageable = PageRequest.of(pageDto.getPage(), pageDto.getSize(), Sort.Direction.DESC, "goodsCode");
        Page<GoodsDto> pages = goodsService.findGoodslist(pageable, categoryPageDto);
        return ResponseEntity.ok(pages);
    }

    @GetMapping("/list/rank/{count}")
    public ResponseEntity listGoodsRank(@PathVariable Integer count) {
        List<GoodsDto> listGoodDto = goodsService.findGoodslistRank(count);
        return ResponseEntity.ok(listGoodDto);
    }

    @GetMapping("/search")
    public ResponseEntity searchGoods(@Valid PageDto pageDto,
                                      @Valid GoodsSearchDto goodsSearchDto,
                                      @CurrentUser Member currentUser) {
        Pageable pageable = PageRequest.of(pageDto.getPage(), pageDto.getSize(), Sort.Direction.DESC, "goodsCode");
        Page<GoodsDto> pages = goodsService.findGoodsSearch(pageable, goodsSearchDto);
        return ResponseEntity.ok(pages);
    }

    @PostMapping(value = "/upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity uploadGoods(@RequestPart(name = "files") @Valid List<MultipartFile> files,
                                      @RequestPart(name = "goodsImage") @Valid GoodsImageDto goodsImageDto,
                                      @CurrentUser Member currentUser,
                                      BindingResult result) {
        HashMap<String, Object> response = new HashMap<>();
        goodsImageValidator.validate(files, result);
        if (result.hasErrors()) {
            response.put("error", result.getFieldError());
            return badRequest(errorHandler.buildError(ErrorCode.FILETYPE_MAPPING_INVALID, response));
        }
        try {
            goodsService.saveImageGoods(files, goodsImageDto, currentUser);
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return unprocessableEntity(errorHandler.buildError(ErrorCode.INTERNAL_SERVER_ERROR, response));
        }
        return new ResponseEntity(new ResponseDto(HttpStatus.CREATED.value(), "상품정보가 저장되었습니다"), HttpStatus.CREATED);
    }

    private ResponseEntity badRequest(ErrorResponse response) {
        return ResponseEntity.badRequest().body(response);
    }

    private ResponseEntity unprocessableEntity(ErrorResponse response) {
        return ResponseEntity.unprocessableEntity().body(response);
    }
}
