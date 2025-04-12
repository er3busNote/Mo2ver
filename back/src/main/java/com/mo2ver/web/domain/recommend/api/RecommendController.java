package com.mo2ver.web.domain.recommend.api;

import com.mo2ver.web.domain.member.entity.CurrentUser;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.recommend.dto.response.RecommendGoodsResponse;
import com.mo2ver.web.domain.recommend.service.RecommendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/recommend")
public class RecommendController {

    private final RecommendService recommendService;

    /**
     * 사용자 기반 협업 필터링 - 코사인 유사도 (Cosine Similarity)
     * → 사용자 항목 평가를 분석하여, 행동 패턴과 유사한 다른 사용자의 선호도를 기반으로 해당 사용자에게 다른 항목들을 추천
     * @param count 상위 개수
     * @param currentUser 현재 사용자
     * @return 상품 목록
     */
    @GetMapping("/rank/{count}")
    public ResponseEntity<List<RecommendGoodsResponse>> recommendCosineSimilarity(
            @PathVariable Integer count,
            @CurrentUser Member currentUser
    ) {
        return ResponseEntity.ok().body(recommendService.findRecommendCosineSimilarity(count, currentUser));
    }
}
