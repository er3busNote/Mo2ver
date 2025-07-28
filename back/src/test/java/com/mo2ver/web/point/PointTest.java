package com.mo2ver.web.point;

import com.mo2ver.web.auth.CsrfConfigTest;
import com.mo2ver.web.domain.coupon.dto.request.CouponRequest;
import com.mo2ver.web.domain.point.dto.request.PointRequest;
import com.mo2ver.web.global.common.utils.DateUtil;
import com.mo2ver.web.global.jwt.dto.TokenInfo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.util.Date;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class PointTest extends CsrfConfigTest {

    @Test
    @DisplayName("쿠폰정보 저장 확인")
    public void createPointTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        PointRequest pointRequest = this.getPointRequestTest();

        mockMvc.perform(post("/point/create")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(pointRequest)))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    private PointRequest getPointRequestTest() {
        return PointRequest.builder()
                .pointNo("PT00000001")
                .pointGiven(1000)
                .expireDate(DateUtil.getDate(2025, 8, 11))
                .build();
    }
}
