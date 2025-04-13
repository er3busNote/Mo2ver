package com.mo2ver.web.domain.search.service;

import com.mo2ver.web.domain.goods.entity.Goods;
import com.mo2ver.web.domain.goods.entity.Price;
import com.mo2ver.web.domain.goods.repository.GoodsRepository;
import com.mo2ver.web.domain.search.dto.FilterInfo;
import com.mo2ver.web.domain.search.dto.request.SearchGoodsRequest;
import com.mo2ver.web.domain.search.dto.response.SearchGoodsResponse;
import com.mo2ver.web.domain.search.repository.SearchRepository;
import com.mo2ver.web.domain.search.specification.CustomSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class SearchService {

    private final SearchRepository searchRepository;
    private final GoodsRepository goodsRepository;

    @Transactional
    public Page<SearchGoodsResponse> findGoodsSearch(SearchGoodsRequest searchGoodsRequest, Pageable pageable) {

        List<FilterInfo> filters = new ArrayList<>();
        filters.add(FilterInfo.of("goodsName", searchGoodsRequest.getKeyword(), false));
        filters.add(FilterInfo.of("minPrice", searchGoodsRequest.getMinPrice(), true));
        filters.add(FilterInfo.of("maxPrice", searchGoodsRequest.getMaxPrice(), true));

        Page<Goods> goods = this.goodsRepository.findAll(CustomSpecification.bySearchJoinQuery(filters, Goods.class, Price.class), pageable);
        return goods.map(SearchGoodsResponse::of);
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
}
