package com.mo2ver.web.goods;

import com.mo2ver.web.auth.CsrfConfigTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class CategoryTest extends CsrfConfigTest {

    @Test
    @DisplayName("카테고리 리스트 정보 확인")
    public void findCategorylistTest() throws Exception {

        mockMvc.perform(get("/category/list"))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
