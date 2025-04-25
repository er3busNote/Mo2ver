package com.mo2ver.web.domain.goods.service;

import com.mo2ver.web.domain.goods.dto.request.GoodsReviewRequest;
import com.mo2ver.web.domain.goods.dto.response.ReviewResponse;
import com.mo2ver.web.domain.goods.entity.Goods;
import com.mo2ver.web.domain.goods.entity.Review;
import com.mo2ver.web.domain.goods.repository.GoodsRepository;
import com.mo2ver.web.domain.goods.repository.ReviewRepository;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.member.repository.MemberRepository;
import com.mo2ver.web.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewService {

    private final MemberRepository memberRepository;
    private final GoodsRepository goodsRepository;
    private final ReviewRepository reviewRepository;

    @Transactional
    public Page<ReviewResponse> findReviewList(String goodsCode, Pageable pageable) {
        return this.reviewRepository.findByGoodsCode(goodsCode, pageable);
    }

    @Transactional
    public Long saveReview(GoodsReviewRequest goodsReviewRequest, Member currentUser) {
        Member member = this.findMemberById(currentUser.getMemberNo());
        Goods goods = this.findGoodsById(goodsReviewRequest.getGoodsCode());
        Review review = new Review(goodsReviewRequest, goods, member);
        return this.reviewRepository.save(review).getGoodsReviewNo();
    }

    @Transactional
    public void updateReview(GoodsReviewRequest goodsReviewRequest, Member currentUser) {
        Member member = this.findMemberById(currentUser.getMemberNo());
        Goods goods = this.findGoodsById(goodsReviewRequest.getGoodsCode());
        Review review = this.findReviewById(goodsReviewRequest.getReviewNo());
        review.update(goodsReviewRequest, goods, member);
        this.reviewRepository.save(review);
    }

    @Transactional
    public void deleteReview(Long id) {
        Review review = this.findReviewById(id);
        review.delete();
    }

    private Member findMemberById(String memberNo) {
        return this.memberRepository.findById(memberNo)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 회원번호 입니다."));
    }

    private Goods findGoodsById(String goodsCode) {
        return this.goodsRepository.findById(goodsCode)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 상품코드 입니다."));
    }

    private Review findReviewById(long id) {
        return this.reviewRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 리뷰정보 입니다."));
    }
}
