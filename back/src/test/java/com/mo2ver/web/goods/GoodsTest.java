package com.mo2ver.web.goods;

import com.mo2ver.web.auth.CsrfConfigTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class GoodsTest extends CsrfConfigTest {

    @Test
    @DisplayName("상품 리스트 정보 확인")
    public void findGoodslistTest() throws Exception {

        mockMvc.perform(get("/goods/list")
                        .param("page", "1")
                        .param("size", "12")
                        .param("categoryCode", "C001000000")
                        .param("categoryType", "L"))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
