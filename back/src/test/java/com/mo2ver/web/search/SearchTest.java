package com.mo2ver.web.search;

import com.mo2ver.web.auth.CsrfConfigTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
}
