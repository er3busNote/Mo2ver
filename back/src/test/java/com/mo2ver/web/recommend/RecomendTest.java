package com.mo2ver.web.recommend;

import com.mo2ver.web.auth.CsrfConfigTest;
import com.mo2ver.web.global.jwt.dto.TokenInfo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class RecomendTest extends CsrfConfigTest {

    @Test
    @DisplayName("상품 추천 확인")
    public void findGoodsRecommendTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        Integer count = 10;

        mockMvc.perform(get("/recommend/rank/{count}", count)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken()))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
