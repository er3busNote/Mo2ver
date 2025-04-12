package com.mo2ver.web.domain.search.api;

import com.mo2ver.web.domain.search.dto.request.SearchGoodsRequest;
import com.mo2ver.web.domain.search.dto.response.SearchGoodsResponse;
import com.mo2ver.web.domain.search.service.SearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/search")
public class SearchController {

    private final SearchService searchService;

    @GetMapping("/goods")
    public ResponseEntity<List<SearchGoodsResponse>> searchGoods(SearchGoodsRequest searchGoodsRequest) {
        return ResponseEntity.ok().body(searchService.findGoodsSearch(searchGoodsRequest));
    }
}
