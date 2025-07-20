package com.mo2ver.web.domain.coupon.api;

import com.mo2ver.web.domain.coupon.dto.request.CouponRequest;
import com.mo2ver.web.domain.coupon.dto.response.CouponResponse;
import com.mo2ver.web.domain.coupon.service.CouponService;
import com.mo2ver.web.domain.member.entity.CurrentUser;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.global.common.dto.response.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/coupon")
public class CouponController {

    private final CouponService couponService;

    @GetMapping("/info/{couponCode}")
    public ResponseEntity<CouponResponse> infoCoupon(
            @PathVariable String couponCode
    ) {
        CouponResponse couponResponse = couponService.findCoupon(couponCode);
        return ResponseEntity.ok().body(couponResponse);
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseHandler> createCoupon(
            @RequestBody @Valid CouponRequest couponRequest,
            @CurrentUser Member currentUser
    ) {
        String couponNo = couponService.saveCoupon(couponRequest, currentUser);
        return ResponseEntity.created(URI.create("/create/" + couponNo))
            .body(ResponseHandler.builder()
                    .status(HttpStatus.CREATED.value())
                    .message("쿠폰정보가 저장되었습니다")
                    .build());
    }

    @PutMapping("/create/{couponNo}")
    public ResponseEntity<ResponseHandler> createCouponMember(
            @PathVariable String couponNo,
            @CurrentUser Member currentUser
    ) {
        String couponId = couponService.saveCouponMember(couponNo, currentUser);
        return ResponseEntity.created(URI.create("/create/" + couponId))
                .body(ResponseHandler.builder()
                        .status(HttpStatus.CREATED.value())
                        .message("쿠폰정보를 가져왔습니다")
                        .build());
    }

    @PatchMapping("/update")
    public ResponseEntity<ResponseHandler> updateCoupon(
            @RequestBody @Validated(CouponRequest.Update.class) CouponRequest couponRequest,
            @CurrentUser Member currentUser
    ) {
        couponService.updateCoupon(couponRequest, currentUser);
        return ResponseEntity.ok()
                .body(ResponseHandler.builder()
                        .status(HttpStatus.OK.value())
                        .message("쿠폰정보가 수정되었습니다")
                        .build());
    }
}
