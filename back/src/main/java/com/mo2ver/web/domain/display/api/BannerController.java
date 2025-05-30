package com.mo2ver.web.domain.display.api;

import com.mo2ver.web.domain.display.dto.BannerImageInfo;
import com.mo2ver.web.domain.display.dto.BannerInfo;
import com.mo2ver.web.domain.display.dto.GoodsDisplayInfo;
import com.mo2ver.web.domain.display.service.BannerService;
import com.mo2ver.web.domain.display.validation.BannerImageValidator;
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
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/banner")
public class BannerController {

    private final BannerService bannerService;
    private final ErrorHandler errorHandler;
    private final BannerImageValidator bannerImageValidator;

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

    @PostMapping("/goods/detail")
    public ResponseEntity<GoodsDisplayInfo> goodsDetailBanner(
            @RequestBody @Valid BannerInfo bannerInfo,
            @CurrentUser Member currentUser
    ) {
        return ResponseEntity.ok().body(bannerService.findBannerGoodsDetail(bannerInfo));
    }

    @PostMapping("/images/detail")
    public ResponseEntity<BannerImageInfo> imagesDetailBanner(
            @RequestBody @Valid BannerInfo bannerInfo,
            @CurrentUser Member currentUser
    ) {
        return ResponseEntity.ok().body(bannerService.findBannerImagesDetail(bannerInfo));
    }

    @PostMapping("/goods/create")
    public ResponseEntity<ResponseHandler> createGoodsBanner(
            @RequestBody @Valid GoodsDisplayInfo goodsDisplayInfo,
            @CurrentUser Member currentUser
    ) {
        Long bannerManageNo = bannerService.saveGoodsDisplay(goodsDisplayInfo, currentUser);
        return ResponseEntity.created(URI.create("/goods/" + bannerManageNo))
                .body(ResponseHandler.builder()
                        .status(HttpStatus.CREATED.value())
                        .message("상품전시정보가 저장되었습니다")
                        .build());
    }

    @PatchMapping("/goods/update")
    public ResponseEntity<ResponseHandler> updateGoodsBanner(
            @RequestBody @Validated(GoodsDisplayInfo.Update.class) GoodsDisplayInfo goodsDisplayInfo,
            @CurrentUser Member currentUser
    ) {
        bannerService.updateGoodsDisplay(goodsDisplayInfo, currentUser);
        return ResponseEntity.ok()
                .body(ResponseHandler.builder()
                        .status(HttpStatus.OK.value())
                        .message("상품전시정보가 수정되었습니다")
                        .build());
    }

    @PostMapping(value = "/images/create")
    public ResponseEntity<ResponseHandler> createImagesBanner(
            @RequestBody @Valid BannerImageInfo bannerImageInfo,
            @CurrentUser Member currentUser
    ) {
        Long bannerManageNo = bannerService.saveImagesBanner(bannerImageInfo, currentUser);
        return ResponseEntity.created(URI.create("/create/" + bannerManageNo))
                .body(ResponseHandler.builder()
                        .status(HttpStatus.CREATED.value())
                        .message("배너이미지정보가 저장되었습니다")
                        .build());
    }

    @PatchMapping(value = "/images/update")
    public ResponseEntity<ResponseHandler> updateImagesBanner(
            @RequestBody @Validated(BannerImageInfo.Update.class) BannerImageInfo bannerImageInfo,
            @CurrentUser Member currentUser
    ) {
        bannerService.updateImagesBanner(bannerImageInfo, currentUser);
        return ResponseEntity.ok()
                .body(ResponseHandler.builder()
                        .status(HttpStatus.OK.value())
                        .message("배너이미지정보가 수정되었습니다")
                        .build());
    }

    @PostMapping(value = "/upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<ResponseHandler> uploadBanner(@RequestPart(name = "files") @Valid List<MultipartFile> files,
                                       @RequestPart(name = "bannerImage") @Valid BannerImageInfo bannerImageInfo,
                                       @CurrentUser Member currentUser,
                                       BindingResult result) {
        bannerImageValidator.validate(files, result);
        if (result.hasErrors()) {
            return badRequest(errorHandler.buildError(ErrorCode.FILETYPE_MAPPING_INVALID, ErrorInfo.builder()
                    .errors(result.getFieldError())
                    .build()));
        }
        try {
            Long bannerManageNo = bannerService.saveImagesBanner(files, bannerImageInfo, currentUser);
            return ResponseEntity.created(URI.create("/upload/" + bannerManageNo))
                    .body(ResponseHandler.builder()
                            .status(HttpStatus.CREATED.value())
                            .message("배너이미지정보가 저장되었습니다")
                            .build());
        } catch (Exception e) {
            return unprocessableEntity(errorHandler.buildError(ErrorCode.INTERNAL_SERVER_ERROR, ErrorInfo.builder()
                    .message(e.getMessage())
                    .build()));
        }
    }

    private ResponseEntity<ResponseHandler> badRequest(ErrorResponse response) {
        return ResponseEntity.badRequest().body(ResponseHandler.error(response));
    }

    private ResponseEntity<ResponseHandler> unprocessableEntity(ErrorResponse response) {
        return ResponseEntity.unprocessableEntity().body(ResponseHandler.error(response));
    }
}
