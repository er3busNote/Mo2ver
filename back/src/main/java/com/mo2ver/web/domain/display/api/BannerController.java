package com.mo2ver.web.domain.display.api;

import com.mo2ver.web.domain.display.dto.BannerDto;
import com.mo2ver.web.domain.display.service.BannerService;
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
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

@Controller
@RequestMapping(value = "/banner")
public class BannerController {

    private final BannerService bannerService;
    private final ErrorHandler errorHandler;

    public BannerController(BannerService bannerService, ErrorHandler errorHandler) {
        this.bannerService = bannerService;
        this.errorHandler = errorHandler;
    }

    @GetMapping("/list")
    public ResponseEntity listBanner(@Valid PageDto pageDto,
                                    @CurrentUser Member currentUser) {
        Pageable pageable = PageRequest.of(pageDto.getPage(), pageDto.getSize(), Sort.Direction.DESC, "bannerManageNo");
        Page<BannerDto> pages = bannerService.findBannerlist(pageable);
        return ResponseEntity.ok(pages);
    }

    private ResponseEntity badRequest(ErrorResponse response) {
        return ResponseEntity.badRequest().body(response);
    }
}
