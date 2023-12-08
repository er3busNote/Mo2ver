package com.mo2ver.master.domain.display.api;

import com.mo2ver.master.domain.display.dto.BannerDto;
import com.mo2ver.master.domain.display.service.BannerService;
import com.mo2ver.master.domain.member.domain.CurrentUser;
import com.mo2ver.master.domain.member.domain.Member;
import com.mo2ver.master.global.common.dto.PageDto;
import com.mo2ver.master.global.error.api.ErrorResponse;
import com.mo2ver.master.global.error.domain.ErrorCode;
import com.mo2ver.master.global.error.service.ErrorService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;
import java.util.HashMap;

@Controller
@RequestMapping(value = "/banner")
public class BannerController {

    private final BannerService bannerService;
    private final ErrorService errorService;

    public BannerController(BannerService bannerService, ErrorService errorService) {
        this.bannerService = bannerService;
        this.errorService = errorService;
    }

    @GetMapping("/list")
    public ResponseEntity listBanner(@Valid PageDto pageDto,
                                    @CurrentUser Member currentUser) {
        Pageable pageable = PageRequest.of(pageDto.getPage(), 10, Sort.Direction.DESC, "bannerManageNo");
        Page<BannerDto> pages = bannerService.findBannerlist(pageable);
        return ResponseEntity.ok(pages);
    }

    private ResponseEntity badRequest(ErrorResponse response) {
        return ResponseEntity.badRequest().body(response);
    }
}
