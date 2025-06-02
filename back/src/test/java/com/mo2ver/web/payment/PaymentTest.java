package com.mo2ver.web.payment;

import com.mo2ver.web.auth.CsrfConfigTest;
import com.mo2ver.web.domain.payment.dto.PaymentInfo;
import com.mo2ver.web.domain.payment.dto.request.PaymentRequest;
import com.mo2ver.web.global.jwt.dto.TokenInfo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class PaymentTest extends CsrfConfigTest {

    @Test
    @DisplayName("결재정보 실행 확인")
    public void createPaymentTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        PaymentRequest paymentRequest = getPaymentRequest();

        mockMvc.perform(post("/payment/start")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(paymentRequest)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    private PaymentRequest getPaymentRequest() {
        return PaymentRequest.builder()
                .orderId(UUID.fromString("89b1f308-cd03-4cd6-ba32-81d72c3a2e0d"))
                .build();
    }

    @Test
    @DisplayName("결재정보 정보 승인 확인")
    public void confirmPaymentTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        PaymentInfo paymentInfo = getPaymentInfo();

        mockMvc.perform(post("/payment/confirm")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(paymentInfo)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("결재정보 정보 취소 확인")
    public void cancelPaymentTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        PaymentInfo paymentInfo = getPaymentInfo();

        mockMvc.perform(post("/payment/cancel")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(paymentInfo)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    private PaymentInfo getPaymentInfo() {
        return PaymentInfo.builder()
                .paymentCode("P000000001")
                .paymentKey("5EnNZRJGvaBX7zk2yd8ydw26XvwXkLrx9POLqKQjmAw4b0e1")
                .orderId(UUID.fromString("89b1f308-cd03-4cd6-ba32-81d72c3a2e0d"))
                .addressNo(1L)
                .amount(1000L)
                .build();
    }
}
