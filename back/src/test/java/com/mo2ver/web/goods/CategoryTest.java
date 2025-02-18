package com.mo2ver.web.goods;

import com.mo2ver.web.auth.CsrfConfigTest;
import com.mo2ver.web.domain.goods.dto.request.CategoryDetailRequest;
import com.mo2ver.web.global.jwt.dto.TokenInfo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class CategoryTest extends CsrfConfigTest {

    @Test
    @DisplayName("카테고리 리스트 정보 확인")
    public void findCategoryListTest() throws Exception {

        mockMvc.perform(get("/category/list"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("각 카테고리 정보 확인")
    public void findCategoryTest() throws Exception {
        Integer catLv = 1;
        mockMvc.perform(get("/category/info/{catLv}", catLv))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("각 카테고리 Query 정보 확인")
    public void findCategoryQueryTest() throws Exception {
        Integer catLv = 2;
        mockMvc.perform(get("/category/info/{catLv}", catLv)
                        .param("upperCategoryCode", "C001000000"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("카테고리 정보 추가")
    public void createCategoryTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("admin", null, "ROLE_ADMIN");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        CategoryDetailRequest categoryDetailRequest = this.getCategoryDetailInfo();

        mockMvc.perform(post("/category/create")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(categoryDetailRequest)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    private CategoryDetailRequest getCategoryDetailInfo() {
        return CategoryDetailRequest.builder()
                .categoryCode("C012000000")
                .categoryName("테스트 1")
                .upperCategoryCode(null)
                .categoryLevel(1)
                .useYesNo('N')
                .sortSequence(12)
                .connectUrl(null)
                .build();
    }

    @Test
    @DisplayName("카테고리 정보 삭제")
    public void deleteCategoryTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("admin", null, "ROLE_ADMIN");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        String categoryCode = "C012000000";

        mockMvc.perform(delete("/category/delete/{categoryCode}", categoryCode)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken()))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
