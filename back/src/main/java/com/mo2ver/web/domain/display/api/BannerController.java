package com.mo2ver.web.domain.display.api;

import com.mo2ver.web.domain.display.dto.BannerDto;
import com.mo2ver.web.domain.display.dto.BannerImageDto;
import com.mo2ver.web.domain.display.dto.GoodsDisplayDto;
import com.mo2ver.web.domain.display.service.BannerService;
import com.mo2ver.web.domain.display.validation.BannerImageValidator;
import com.mo2ver.web.domain.goods.dto.GoodsDto;
import com.mo2ver.web.domain.member.domain.CurrentUser;
import com.mo2ver.web.domain.member.domain.Member;
import com.mo2ver.web.global.common.dto.PageDto;
import com.mo2ver.web.global.common.dto.ResponseDto;
import com.mo2ver.web.global.error.dto.ErrorCode;
import com.mo2ver.web.global.error.dto.ErrorResponse;
import com.mo2ver.web.global.error.response.ErrorHandler;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping(value = "/banner")
public class BannerController {

    private final BannerService bannerService;
    private final ErrorHandler errorHandler;
    private final BannerImageValidator bannerImageValidator;

    public BannerController(BannerService bannerService, ErrorHandler errorHandler, BannerImageValidator bannerImageValidator) {
        this.bannerService = bannerService;
        this.errorHandler = errorHandler;
        this.bannerImageValidator = bannerImageValidator;
    }

    @GetMapping("/image/{id}")
    public ResponseEntity imageBanner(@PathVariable String id) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            byte[] bannerImageBytes = bannerService.findBannerImage(id);
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

    @GetMapping("/list")
    public ResponseEntity listBanner(@Valid PageDto pageDto,
                                     @CurrentUser Member currentUser) {
        Pageable pageable = PageRequest.of(pageDto.getPage(), pageDto.getSize(), Sort.Direction.DESC, "bannerManageNo");
        Page<BannerDto> pages = bannerService.findBannerlist(pageable);
        return ResponseEntity.ok(pages);
    }

    @PostMapping("/goods")
    public ResponseEntity goodsBanner(@RequestBody @Valid GoodsDisplayDto goodsDisplayDto,
                                      @CurrentUser Member currentUser) {
        bannerService.saveGoodsDisplay(goodsDisplayDto, currentUser);
        return new ResponseEntity(new ResponseDto(HttpStatus.CREATED.value(), "상품전시정보가 저장되었습니다"), HttpStatus.CREATED);
    }

    @PostMapping(value = "/upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity uploadBanner(@RequestPart(name = "files") @Valid List<MultipartFile> files,
                                       @RequestPart(name = "bannerImage") @Valid BannerImageDto bannerImageDto,
                                       @CurrentUser Member currentUser,
                                       BindingResult result) {
        HashMap<String, Object> response = new HashMap<>();
        bannerImageValidator.validate(files, result);
        if (result.hasErrors()) {
            response.put("error", result.getFieldError());
            return badRequest(errorHandler.buildError(ErrorCode.FILETYPE_MAPPING_INVALID, response));
        }
        try {
            bannerService.saveImageBanner(files, bannerImageDto, currentUser);
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return unprocessableEntity(errorHandler.buildError(ErrorCode.INTERNAL_SERVER_ERROR, response));
        }
        return new ResponseEntity(new ResponseDto(HttpStatus.CREATED.value(), "배너정보가 저장되었습니다"), HttpStatus.CREATED);
    }

    private ResponseEntity badRequest(ErrorResponse response) {
        return ResponseEntity.badRequest().body(response);
    }

    private ResponseEntity unprocessableEntity(ErrorResponse response) {
        return ResponseEntity.unprocessableEntity().body(response);
    }
}
