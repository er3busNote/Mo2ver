package com.mo2ver.web.domain.member;

import com.mo2ver.web.global.auth.CsrfConfigTest;
import com.mo2ver.web.domain.member.dto.AddressInfo;
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

public class AddressTest extends CsrfConfigTest {

    @Test
    @DisplayName("기본 배송지 상세 정보 확인")
    public void findAddressInfoTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        mockMvc.perform(get("/address/info")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("주소록정보 리스트 확인")
    public void findAddressListTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        mockMvc.perform(get("/address/list")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("주소록정보 저장 확인")
    public void createAddressTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        AddressInfo addressInfo = this.getAddressInfo();

        mockMvc.perform(post("/address/create")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(addressInfo)))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("주소록정보 수정 확인")
    public void updateAddressTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        AddressInfo addressInfo = this.getAddressInfo();

        mockMvc.perform(patch("/address/update")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(addressInfo)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("기본 배송지주소 수정 확인")
    public void updateBasicAddressTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        String addressNo = "A000000002";

        mockMvc.perform(patch("/address/update/{addressNo}", addressNo)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    private AddressInfo getAddressInfo() {
        return AddressInfo.builder()
                .addressNo("A000000002")
                .memberName("배병주")
                .cellPhoneNumber("01011111111")
                .zipcode("11111")
                .roadNameBasicAddress("서울시")
                .roadNameDetailAddress("강서구")
                .build();
    }
}
