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
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final SearchRepository searchRepository;
    private final GoodsRepository goodsRepository;

    public List<SearchGoodsResponse> findGoodsSearch(SearchGoodsRequest searchGoodsRequest) {

        List<FilterInfo> filters = new ArrayList<>();
        filters.add(FilterInfo.of("goodsName", searchGoodsRequest.getName(), false));
        filters.add(FilterInfo.of("minPrice", searchGoodsRequest.getMinPrice(), true));
        filters.add(FilterInfo.of("maxPrice", searchGoodsRequest.getMaxPrice(), true));

        List<Goods> goods = this.goodsRepository.findAll(CustomSpecification.bySearchJoinQuery(filters, Goods.class, Price.class));
        return goods.stream().map(SearchGoodsResponse::of).collect(Collectors.toList());
    }
}
