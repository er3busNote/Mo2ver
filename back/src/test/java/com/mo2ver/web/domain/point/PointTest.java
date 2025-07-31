package com.mo2ver.web.domain.point;

import com.mo2ver.web.domain.member.entity.Member;
import com.mo2ver.web.domain.member.service.MemberAdapter;
import com.mo2ver.web.global.auth.CsrfConfigTest;
import com.mo2ver.web.domain.payment.dto.PaymentInfo;
import com.mo2ver.web.domain.point.dto.request.PointRequest;
import com.mo2ver.web.domain.point.service.PointService;
import com.mo2ver.web.global.common.utils.DateUtil;
import com.mo2ver.web.global.jwt.dto.TokenInfo;
import com.mo2ver.web.global.security.WithMockMember;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class PointTest extends CsrfConfigTest {

    @Autowired
    protected PointService pointService;

    @Test
    @DisplayName("포인트 저장 확인")
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

    @Test
    @DisplayName("포인트 사용내역 확인")
    @WithMockMember(loginId = "bbj")
    public void usePointTest() throws Exception {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MemberAdapter userDetails = (MemberAdapter) authentication.getPrincipal();
        Member currentUser = userDetails.getAuth();

        PaymentInfo paymentInfo = this.getPaymentInfo();

        this.pointService.usePointMemberSync(paymentInfo, currentUser);
    }

    private PaymentInfo getPaymentInfo() {
        return PaymentInfo.builder()
                .paymentCode("P000000001")
                .paymentKey("5EnNZRJGvaBX7zk2yd8ydw26XvwXkLrx9POLqKQjmAw4b0e1")
                .orderId("F5E24377C6D948F39A64C3DDA17E78A6")
                .addressNo("A000000002")
                .amount(1000L)
                .build();
    }
}
