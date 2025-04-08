package com.mo2ver.web.search;

import com.mo2ver.web.auth.CsrfConfigTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class SearchTest extends CsrfConfigTest {

    @Test
    @DisplayName("상품 검색 확인")
    public void findGoodsSearchTest() throws Exception {

        mockMvc.perform(get("/search/goods")
                        .param("name", "테")
                        .param("minPrice", "170000")
                        .param("maxPrice", "180000"))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
