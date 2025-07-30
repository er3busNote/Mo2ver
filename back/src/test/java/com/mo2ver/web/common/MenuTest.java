package com.mo2ver.web.common;

import com.mo2ver.web.global.auth.CsrfConfigTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class MenuTest extends CsrfConfigTest {

    @Test
    @DisplayName("공통코드 정보 상세 조회")
    public void findMenuListDetailTest() throws Exception {
        Integer menuType = 1;
        mockMvc.perform(get("/menu/list/{menuType}", menuType))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
