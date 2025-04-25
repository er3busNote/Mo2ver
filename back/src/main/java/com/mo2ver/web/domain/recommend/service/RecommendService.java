package com.mo2ver.web.domain.recommend.service;

import com.mo2ver.web.domain.goods.entity.Goods;
import com.mo2ver.web.domain.goods.entity.Review;
import com.mo2ver.web.domain.goods.repository.ReviewRepository;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.recommend.dto.response.RecommendGoodsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendService {

    private final ReviewRepository reviewRepository;

    public List<RecommendGoodsResponse> findRecommendCosineSimilarity(Integer count, Member currentUser) {
        String memberNo = currentUser.getMemberNo();

        // 1. 모든 사용자의 평가 수집하기
        Map<String, Map<Goods, Integer>> userRatingsMap = new HashMap<>();
        for (Review review : reviewRepository.findByDelYesNo('N')) {
            String reviewMemberNo = review.getUpdater().getMemberNo();
            Goods reviewGoods = review.getGoodsCode();
            Integer reviewRating = review.getRating();

            userRatingsMap.computeIfAbsent(reviewMemberNo, k -> new HashMap<>())
                    .put(reviewGoods, reviewRating);
        }

        // 2. 상품을 추천 받을 회원과 다른 회원의 유사도 계산하기
        Map<String, Double> userSimilarities = new HashMap<>();
        for (String otherUser : userRatingsMap.keySet()) {
            if (!otherUser.equals(memberNo)) {
                double similarity = calculateCosineSimilarity(userRatingsMap.get(memberNo), userRatingsMap.get(otherUser));
                userSimilarities.put(otherUser, similarity);
            }
        }

        // 3. 상품 추천 목록 생성하기
        Map<Goods, Double> goodsRecommendations = new HashMap<>();
        for (String otherUser : userSimilarities.keySet()) {
            double similarity = userSimilarities.get(otherUser);

            for (Goods goods : userRatingsMap.get(otherUser).keySet()) {
                if (!userRatingsMap.get(memberNo).containsKey(goods)) {     // 추천 받을 회원이 평가한 상품은 제외 !
                    double rating = userRatingsMap.get(otherUser).get(goods);
                    goodsRecommendations.merge(goods, rating * similarity, Double::sum);
                }
            }
        }

        // 4. 상위 등급의 상품 n개 추천하기
        List<Goods> recommendedGoods = goodsRecommendations.entrySet().stream()
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .limit(count)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());

        return recommendedGoods.stream().map(RecommendGoodsResponse::of).collect(Collectors.toList());
    }

    private <T> double calculateCosineSimilarity(Map<T, Integer> ratings1, Map<T, Integer> ratings2) {
        double dotProduct = 0.0;
        double norm1 = 0.0;
        double norm2 = 0.0;

        for (T item : ratings1.keySet()) {
            if (ratings2.containsKey(item)) {
                int rating1 = ratings1.get(item);
                int rating2 = ratings2.get(item);

                dotProduct += rating1 * rating2;
                norm1 += rating1 * rating1;
                norm2 += rating2 * rating2;
            }
        }

        if (norm1 == 0.0 || norm2 == 0.0) {
            return 0.0;
        }

        return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
    }
}
