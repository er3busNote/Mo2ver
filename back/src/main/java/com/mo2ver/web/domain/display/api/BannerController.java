package com.mo2ver.web.domain.display.api;

import com.mo2ver.web.domain.display.dto.BannerImageInfo;
import com.mo2ver.web.domain.display.dto.BannerInfo;
import com.mo2ver.web.domain.display.dto.GoodsDisplayInfo;
import com.mo2ver.web.domain.display.service.BannerService;
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
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/banner")
public class BannerController {

    private final BannerService bannerService;

    @GetMapping("/list")
    public ResponseEntity<Page<BannerInfo>> listBanner(
            @Valid PageInfo pageInfo,
            @CurrentUser Member currentUser
    ) {
        Pageable pageable = PageRequest.of(pageInfo.getPage(), pageInfo.getSize(), Sort.Direction.DESC, "bannerNo");
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
        String bannerNo = bannerService.saveGoodsDisplay(goodsDisplayInfo, currentUser);
        return ResponseEntity.created(URI.create("/goods/" + bannerNo))
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
        String bannerNo = bannerService.saveImagesBanner(bannerImageInfo, currentUser);
        return ResponseEntity.created(URI.create("/create/" + bannerNo))
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
}
