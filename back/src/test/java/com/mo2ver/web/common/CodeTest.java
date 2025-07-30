package com.mo2ver.web.common;

import com.mo2ver.web.global.auth.CsrfConfigTest;
import com.mo2ver.web.global.jwt.dto.TokenInfo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class CodeTest extends CsrfConfigTest {

    @Test
    @DisplayName("공통코드 정보 조회")
    public void findCodeListTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        List<String> groupCodelist = getGroupCodeList();

        mockMvc.perform(post("/code/list")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(groupCodelist)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("공통코드 정보 상세 조회")
    public void findCodeListDetailTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        List<String> groupCodelist = getGroupCodeList();

        mockMvc.perform(post("/code/list/detail")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(groupCodelist)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    private List<String> getGroupCodeList() {
        return Arrays.asList("CM001", "CM002");
    }
}
