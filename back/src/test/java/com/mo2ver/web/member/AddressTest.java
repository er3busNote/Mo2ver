package com.mo2ver.web.member;

import com.mo2ver.web.auth.CsrfConfigTest;
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

    private AddressInfo getAddressInfo() {
        return AddressInfo.builder()
                .addressNo(1L)
                .memberName("배병주")
                .cellPhoneNumber("01011111111")
                .zipcode("11111")
                .roadNameBasicAddress("서울시")
                .roadNameDetailAddress("강서구")
                .build();
    }
}
