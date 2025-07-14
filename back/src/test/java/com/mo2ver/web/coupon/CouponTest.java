package com.mo2ver.web.coupon;

import com.mo2ver.web.auth.CsrfConfigTest;
import com.mo2ver.web.domain.coupon.dto.request.CouponRequest;
import com.mo2ver.web.global.jwt.dto.TokenInfo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class CouponTest extends CsrfConfigTest {

    @Test
    @DisplayName("쿠폰정보 상세 정보 확인")
    public void findCouponInfoTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        String orderId = "3148f6f2-05aa-48c5-9417-0861a113891e";
        mockMvc.perform(get("/coupon/info/{orderId}", orderId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("쿠폰정보 저장 확인")
    public void createCouponTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        CouponRequest couponRequest = this.getCouponRequestTest();

        mockMvc.perform(post("/coupon/create")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(couponRequest)))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    private CouponRequest getCouponRequestTest() {
        return CouponRequest.builder()
                .goodsCode("1000000001")
                .build();
    }
}
