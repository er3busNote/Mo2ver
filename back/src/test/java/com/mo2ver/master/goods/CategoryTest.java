package com.mo2ver.master.goods;

import com.mo2ver.master.auth.CsrfConfigTest;
import com.mo2ver.master.domain.goods.service.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class CategoryTest extends CsrfConfigTest {

    @Autowired
    CategoryService categoryService;

    @Test
    @DisplayName("카테고리 리스트 정보 확인")
    public void findCategorylistTest() throws Exception {

        mockMvc.perform(get("/category/list"))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
