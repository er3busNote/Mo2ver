package com.mo2ver.web.domain.display.api;

import com.mo2ver.web.domain.display.domain.BannerManage;
import com.mo2ver.web.domain.display.dto.BannerImageInfo;
import com.mo2ver.web.domain.display.dto.BannerInfo;
import com.mo2ver.web.domain.display.dto.GoodsDisplayInfo;
import com.mo2ver.web.domain.display.service.BannerService;
import com.mo2ver.web.domain.display.validation.BannerImageValidator;
import com.mo2ver.web.domain.member.domain.CurrentUser;
import com.mo2ver.web.domain.member.domain.Member;
import com.mo2ver.web.global.common.dto.PageInfo;
import com.mo2ver.web.global.common.dto.response.ResponseHandler;
import com.mo2ver.web.global.error.dto.ErrorCode;
import com.mo2ver.web.global.error.dto.response.ErrorResponse;
import com.mo2ver.web.global.error.dto.response.ErrorHandler;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
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

    @GetMapping("/list")
    public ResponseEntity<Page<BannerInfo>> listBanner(
            @Valid PageInfo pageInfo,
            @CurrentUser Member currentUser
    ) {
        Pageable pageable = PageRequest.of(pageInfo.getPage(), pageInfo.getSize(), Sort.Direction.DESC, "bannerManageNo");
        Page<BannerInfo> pages = bannerService.findBannerlist(pageable);
        return ResponseEntity.ok().body(pages);
    }

    @GetMapping("/display")
    public ResponseEntity<Map<String, Map<String, List<Object>>>> displayBanner(
            @CurrentUser Member currentUser
    ) {
        return ResponseEntity.ok().body(bannerService.findBannerDisplay());
    }

    @PostMapping("/goods")
    public ResponseEntity<ResponseHandler> goodsBanner(
            @RequestBody @Valid GoodsDisplayInfo goodsDisplayInfo,
            @CurrentUser Member currentUser
    ) {
        BannerManage bannerManage = bannerService.saveGoodsDisplay(goodsDisplayInfo, currentUser);
        return ResponseEntity.created(URI.create("/goods/" + bannerManage.getBannerManageNo()))
                .body(ResponseHandler.builder()
                .status(HttpStatus.CREATED.value())
                .message("상품전시정보가 저장되었습니다")
                .build());
    }

    @PostMapping("/images/detail")
    public ResponseEntity<BannerImageInfo> imagesDetailBanner(
            @RequestBody @Valid BannerInfo bannerInfo,
            @CurrentUser Member currentUser
    ) {
        return ResponseEntity.ok().body(bannerService.findBannerImagesDetail(bannerInfo));
    }

    @PostMapping("/goods/detail")
    public ResponseEntity<GoodsDisplayInfo> goodsDetailBanner(
            @RequestBody @Valid BannerInfo bannerInfo,
            @CurrentUser Member currentUser
    ) {
        return ResponseEntity.ok().body(bannerService.findBannerGoodsDetail(bannerInfo));
    }

    @PostMapping(value = "/upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity uploadBanner(@RequestPart(name = "files") @Valid List<MultipartFile> files,
                                       @RequestPart(name = "bannerImage") @Valid BannerImageInfo bannerImageInfo,
                                       @CurrentUser Member currentUser,
                                       BindingResult result) {
        HashMap<String, Object> response = new HashMap<>();
        bannerImageValidator.validate(files, result);
        if (result.hasErrors()) {
            response.put("error", result.getFieldError());
            return badRequest(errorHandler.buildError(ErrorCode.FILETYPE_MAPPING_INVALID, response));
        }
        try {
            BannerManage bannerManage = bannerService.saveImageBanner(files, bannerImageInfo, currentUser);
            return ResponseEntity.created(URI.create("/upload/" + bannerManage.getBannerManageNo()))
                    .body(ResponseHandler.builder()
                            .status(HttpStatus.CREATED.value())
                            .message("배너정보가 저장되었습니다")
                            .build());
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return unprocessableEntity(errorHandler.buildError(ErrorCode.INTERNAL_SERVER_ERROR, response));
        }
    }

    private ResponseEntity<ErrorResponse> badRequest(ErrorResponse response) {
        return ResponseEntity.badRequest().body(response);
    }

    private ResponseEntity<ErrorResponse> unprocessableEntity(ErrorResponse response) {
        return ResponseEntity.unprocessableEntity().body(response);
    }
}
