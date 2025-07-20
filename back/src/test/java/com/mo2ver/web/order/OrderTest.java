package com.mo2ver.web.order;

import com.mo2ver.web.auth.CsrfConfigTest;
import com.mo2ver.web.domain.order.dto.OrderInfo;
import com.mo2ver.web.domain.order.dto.request.OrderCouponRequest;
import com.mo2ver.web.domain.order.dto.request.OrderRequest;
import com.mo2ver.web.global.jwt.dto.TokenInfo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.util.Arrays;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class OrderTest extends CsrfConfigTest {

    @Test
    @DisplayName("주문정보 상세 정보 확인")
    public void findOrderInfoTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        String orderId = "89b1f308-cd03-4cd6-ba32-81d72c3a2e0d";
        mockMvc.perform(get("/order/info/{orderId}", orderId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("주문정보 저장 확인")
    public void createOrderTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        OrderRequest orderRequest = this.getOrderRequestTest();

        mockMvc.perform(post("/order/create")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(orderRequest)))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("쿠폰정보 수정 확인")
    public void updateOrderCouponTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        OrderCouponRequest orderCouponRequest = this.getOrderCouponRequestTest();

        mockMvc.perform(patch("/order/update/coupon")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(orderCouponRequest)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    private OrderRequest getOrderRequestTest() {
        return OrderRequest.builder()
                .goodsOrders(Arrays.asList(
                        OrderInfo.from("1000000007", 2),
                        OrderInfo.from("1000000014", 1)
                ))
                .build();
    }

    private OrderCouponRequest getOrderCouponRequestTest() {
        return OrderCouponRequest.builder()
                .orderId("ec862eca-251f-4c4d-9b93-a7d247631c26")
                .couponCodes(Arrays.asList(
                        "CPN-250720-T85VWC"
                ))
                .build();
    }
        
}
