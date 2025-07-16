package com.mo2ver.web.coupon;

import com.mo2ver.web.auth.CsrfConfigTest;
import com.mo2ver.web.domain.coupon.dto.request.CouponRequest;
import com.mo2ver.web.domain.coupon.type.CouponType;
import com.mo2ver.web.global.jwt.dto.TokenInfo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.math.BigDecimal;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class CouponTest extends CsrfConfigTest {

    @Test
    @DisplayName("쿠폰정보 상세 정보 확인")
    public void findCouponInfoTest() throws Exception {
        String couponCode = "CPN-250716-FQPPVA";
        mockMvc.perform(get("/coupon/info/{couponCode}", couponCode))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("쿠폰정보 저장 확인")
    public void createCouponTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("admin", null, "ROLE_ADMIN");
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
                .couponType(CouponType.AMOUNT)
                .discountAmount(new BigDecimal(10000))
                .maxDiscountAmount(new BigDecimal(30000))
                .minOrderAmount(new BigDecimal(15000))
                .totalQuantity(10)
                .issueQuantity(3)
                .build();
    }
}
