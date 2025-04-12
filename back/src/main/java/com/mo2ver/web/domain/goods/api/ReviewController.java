package com.mo2ver.web.domain.goods.api;

import com.mo2ver.web.domain.goods.dto.request.GoodsReviewRequest;
import com.mo2ver.web.domain.goods.dto.response.ReviewResponse;
import com.mo2ver.web.domain.goods.service.ReviewService;
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

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/review")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/list/{goodsCode}")
    public ResponseEntity<Page<ReviewResponse>> listReview(
            @PathVariable String goodsCode,
            @Valid PageInfo pageInfo
    ) {
        Pageable pageable = PageRequest.of(pageInfo.getPage(), pageInfo.getSize(), Sort.Direction.DESC, "goodsReviewNo");
        Page<ReviewResponse> pages = reviewService.findReviewList(goodsCode, pageable);
        return ResponseEntity.ok().body(pages);
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseHandler> createReview(
            @RequestBody @Valid GoodsReviewRequest goodsReviewRequest,
            @CurrentUser Member currentUser
    ) {
        Long goodsReviewNo = reviewService.saveReview(goodsReviewRequest, currentUser);
        return ResponseEntity.created(URI.create("/review/" + goodsReviewNo))
                .body(ResponseHandler.builder()
                        .status(HttpStatus.CREATED.value())
                        .message("상품리뷰정보가 저장되었습니다")
                        .build());
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseHandler> updateReview(
            @RequestBody @Validated(GoodsReviewRequest.Update.class) GoodsReviewRequest goodsReviewRequest,
            @CurrentUser Member currentUser
    ) {
        reviewService.updateReview(goodsReviewRequest, currentUser);
        return ResponseEntity.ok()
                .body(ResponseHandler.builder()
                        .status(HttpStatus.OK.value())
                        .message("상품리뷰정보가 수정되었습니다")
                        .build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseHandler> deleteReview(
            @PathVariable Long id
    ) {
        reviewService.deleteReview(id);
        return ResponseEntity.ok().body(ResponseHandler.builder()
                .status(HttpStatus.OK.value())
                .message("상품리뷰정보가 삭제되었습니다")
                .build());
    }
}
