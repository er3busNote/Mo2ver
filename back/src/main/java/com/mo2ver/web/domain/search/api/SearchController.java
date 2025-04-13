package com.mo2ver.web.domain.search.api;

import com.mo2ver.web.domain.member.entity.CurrentUser;
import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.search.dto.request.SearchGoodsRequest;
import com.mo2ver.web.domain.search.dto.response.SearchGoodsResponse;
import com.mo2ver.web.domain.search.service.SearchService;
import com.mo2ver.web.global.common.dto.PageInfo;
import com.mo2ver.web.global.common.utils.CookieUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/search")
public class SearchController {

    private static final String CLIENT_ID = "clientId";

    private final SearchService searchService;

    @GetMapping("/goods")
    public ResponseEntity<Page<SearchGoodsResponse>> searchGoods(
            @Valid PageInfo pageInfo,
            @Valid SearchGoodsRequest searchGoodsRequest,
            @CookieValue(name = CLIENT_ID, required = false) String clientId,
            @CurrentUser Member currentUser
    ) {
        String keyword = searchGoodsRequest.getKeyword();

        if (currentUser != null) {
            String userId = currentUser.getLoginId();
            searchService.saveSearchForUser(userId, keyword);
            return buildSearchGoodsResponse(null, pageInfo, searchGoodsRequest);
        }

        if (clientId == null) {
            String newClientId = UUID.randomUUID().toString();
            ResponseCookie cookie = CookieUtil.createCookie(CLIENT_ID, newClientId, true);
            searchService.saveSearchForGuest(newClientId, keyword);
            return buildSearchGoodsResponse(cookie, pageInfo, searchGoodsRequest);
        }

        searchService.saveSearchForGuest(clientId, keyword);
        return buildSearchGoodsResponse(null, pageInfo, searchGoodsRequest);
    }

    @GetMapping("/recent")
    public ResponseEntity<List<String>> searchRecent(
            @CookieValue(name = CLIENT_ID, required = false) String clientId,
            @CurrentUser Member currentUser
    ) {
        if (currentUser != null) {
            String userId = currentUser.getLoginId();
            return ResponseEntity.ok().body(searchService.getRecentForUser(userId));
        }

        return ResponseEntity.ok().body(searchService.getRecentForGuest(clientId));
    }

    private ResponseEntity<Page<SearchGoodsResponse>> buildSearchGoodsResponse(ResponseCookie cookie, PageInfo pageInfo, SearchGoodsRequest request) {
        Pageable pageable = PageRequest.of(pageInfo.getPage(), pageInfo.getSize(), Sort.Direction.DESC, "goodsCode");
        Page<SearchGoodsResponse> result = searchService.findGoodsSearch(request, pageable);
        if (cookie != null) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body(result);
        }
        return ResponseEntity.ok().body(result);
    }
}
