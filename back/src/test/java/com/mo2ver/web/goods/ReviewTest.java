package com.mo2ver.web.goods;

import com.mo2ver.web.auth.CsrfConfigTest;
import com.mo2ver.web.common.file.dto.FileAttachInfo;
import com.mo2ver.web.domain.goods.dto.request.GoodsReviewRequest;
import com.mo2ver.web.global.jwt.dto.TokenInfo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class ReviewTest extends CsrfConfigTest {

    @Test
    @DisplayName("리뷰 리스트 정보 확인")
    public void findReviewListTest() throws Exception {
        String goodsCode = "1000000004";
        mockMvc.perform(get("/review/list/{goodsCode}", goodsCode)
                        .param("page", "0")
                        .param("size", "12"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("리뷰 정보 저장 확인")
    public void createReviewTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        GoodsReviewRequest goodsReviewRequest = this.getGoodsReviewRequest();

        mockMvc.perform(post("/review/create")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(goodsReviewRequest)))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("리뷰 정보 수정 확인")
    public void updateReviewTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        GoodsReviewRequest goodsReviewRequest = this.getGoodsReviewRequest();

        mockMvc.perform(put("/review/update")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(goodsReviewRequest)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    private GoodsReviewRequest getGoodsReviewRequest() {
        return GoodsReviewRequest.builder()
                .reviewNo(1L)
                .goodsCode("1000000004")
                .upperReviewNo(null)
                .reviewImg(FileAttachInfo.from(100011))
                .reviewContents("테스트2")
                .rating(6)
                .build();
    }

    @Test
    @DisplayName("리뷰 정보 삭제 확인")
    public void deleteReviewTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        Long reviewId = 1L;

        mockMvc.perform(delete("/review/delete/{reviewId}", reviewId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken()))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
