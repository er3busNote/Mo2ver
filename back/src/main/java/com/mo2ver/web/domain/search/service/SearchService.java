package com.mo2ver.web.domain.search.service;

import com.mo2ver.web.domain.goods.entity.Goods;
import com.mo2ver.web.domain.goods.entity.Price;
import com.mo2ver.web.domain.goods.repository.GoodsRepository;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.member.repository.MemberRepository;
import com.mo2ver.web.domain.search.dto.FilterInfo;
import com.mo2ver.web.domain.search.dto.request.SearchGoodsRequest;
import com.mo2ver.web.domain.search.dto.response.SearchGoodsResponse;
import com.mo2ver.web.domain.search.repository.SearchRepository;
import com.mo2ver.web.domain.search.specification.CustomSpecification;
import com.mo2ver.web.domain.search.type.SearchColumn;
import com.mo2ver.web.domain.search.type.SearchType;
import com.mo2ver.web.global.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class SearchService {

    private final MemberRepository memberRepository;
    private final SearchRepository searchRepository;
    private final GoodsRepository goodsRepository;

    @Transactional
    public Page<SearchGoodsResponse> findGoodsSearch(SearchGoodsRequest searchGoodsRequest, Pageable pageable, SearchType searchType) {
        Page<Goods> goods = this.findAll(searchGoodsRequest, pageable, searchType);
        return goods.map(SearchGoodsResponse::of);
    }

    private Page<Goods> findAll(SearchGoodsRequest searchGoodsRequest, Pageable pageable, SearchType searchType) {
        List<FilterInfo> filters = new ArrayList<>();
        filters.add(FilterInfo.of(SearchColumn.GOODS_NAME, searchGoodsRequest.getKeyword(), false));
        if (StringUtils.hasText(searchGoodsRequest.getMemberNo())){
            filters.add(FilterInfo.of(SearchColumn.MEMBER_NO, this.findMemberById(searchGoodsRequest.getMemberNo()), false));
        }
        if (Objects.requireNonNull(searchType) == SearchType.PRICE) {
            searchGoodsRequest.update();    // 값이 없을 때, 기본값 세팅
            filters.add(FilterInfo.of(SearchColumn.MIN_PRICE, searchGoodsRequest.getMinPrice(), true));
            filters.add(FilterInfo.of(SearchColumn.MAX_PRICE, searchGoodsRequest.getMaxPrice(), true));
            return this.goodsRepository.findAll(CustomSpecification.bySearchJoinQuery(filters, Goods.class, Price.class, "goodsPrices"), pageable);
        }
        return this.goodsRepository.findAll(CustomSpecification.bySearchQuery(filters, Goods.class), pageable);
    }

    @Transactional
    public Page<SearchGoodsResponse> findGoodsSearch(SearchGoodsRequest searchGoodsRequest, Pageable pageable) {
        return this.findGoodsSearch(searchGoodsRequest, pageable, SearchType.PRICE);
    }

    @Transactional
    public Page<SearchGoodsResponse> findGoodsSearch(SearchGoodsRequest searchGoodsRequest, Pageable pageable, Member currentUser) {
        searchGoodsRequest.setMemberNo(currentUser.getMemberNo());
        return this.findGoodsSearch(searchGoodsRequest, pageable, SearchType.MY);
    }

    public void saveSearchForUser(String userId, String keyword) {
        List<String> recentList = searchRepository.saveSearchForUser(userId, keyword);
        log.info("Repository updateRecentList {} => {}", userId, recentList);
    }

    public void saveSearchForGuest(String clientId, String keyword) {
        List<String> recentList = searchRepository.saveSearchForGuest(clientId, keyword);
        log.info("Repository updateRecentList {} => {}", clientId, recentList);
    }

    public List<String> getRecentForUser(String userId) {
        return searchRepository.findByUser(userId);
    }

    public List<String> getRecentForGuest(String clientId) {
        return searchRepository.findByGuest(clientId);
    }

    private Member findMemberById(String memberNo) {
        return this.memberRepository.findById(memberNo)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 회원번호 입니다."));
    }
}
