package com.mo2ver.web.domain.search;

import com.mo2ver.web.global.auth.CsrfConfigTest;
import com.mo2ver.web.domain.search.dto.request.SearchGoodsRequest;
import com.mo2ver.web.domain.search.dto.request.SearchPageGoodsRequest;
import com.mo2ver.web.global.common.dto.PageInfo;
import com.mo2ver.web.global.jwt.dto.TokenInfo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class SearchTest extends CsrfConfigTest {

    @Test
    @DisplayName("상품 검색 확인")
    public void findGoodsSearchTest() throws Exception {

        mockMvc.perform(get("/search/goods")
                        .param("page", "0")
                        .param("size", "12")
                        .param("keyword", "테")
                        .param("minPrice", "170000")
                        .param("maxPrice", "180000"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("상품 검색 확인")
    public void findMyGoodsSearchTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        SearchPageGoodsRequest searchPageGoodsRequest = this.getSearchPageGoodsRequest();

        mockMvc.perform(post("/search/goods")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(searchPageGoodsRequest)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("상품 검색 후, 최근 키워드 확인")
    public void findRecentSearchTest() throws Exception {

        MvcResult result = mockMvc.perform(get("/search/goods")
                        .param("page", "0")
                        .param("size", "12")
                        .param("keyword", "테"))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        mockMvc.perform(get("/search/recent")
                        .cookie(result.getResponse().getCookies()))
                .andDo(print())
                .andExpect(status().isOk());
    }

    private PageInfo getPageInfo() {
        return PageInfo.builder()
                .page(0)
                .size(12)
                .build();
    }

    private SearchGoodsRequest getSearchGoodsRequest() {
        return SearchGoodsRequest.builder()
                .keyword("테")
                .build();
    }

    private SearchPageGoodsRequest getSearchPageGoodsRequest() {
        return SearchPageGoodsRequest.builder()
                .pageInfo(getPageInfo())
                .searchGoodsRequest(getSearchGoodsRequest())
                .build();
    }
}
