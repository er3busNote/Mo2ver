package com.mo2ver.web.notice;

import com.mo2ver.web.auth.CsrfConfigTest;
import com.mo2ver.web.common.file.dto.FileAttachInfo;
import com.mo2ver.web.domain.notice.dto.NoticeFileInfo;
import com.mo2ver.web.domain.notice.dto.request.NoticeRequest;
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

public class NoticeTest extends CsrfConfigTest {

    @Test
    @DisplayName("공지사항 정보 확인")
    public void findNoticeTest() throws Exception {

        mockMvc.perform(get("/notice/list")
                        .param("page", "0")
                        .param("size", "12"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("공지사항 상세 정보 확인")
    public void findNoticeInfoTest() throws Exception {

        Integer noticeManageNo = 1;

        mockMvc.perform(get("/notice/info/{noticeManageNo}", noticeManageNo))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("공지사항 상세 정보 관리자 조회")
    public void findNoticeDetailTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("admin", null, "ROLE_ADMIN");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        NoticeRequest noticeRequest = getNoticeRequest();

        mockMvc.perform(post("/notice/detail")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(noticeRequest)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    private NoticeRequest getNoticeRequest() {
        return NoticeRequest.builder()
                .noticeManageNo(1L)
                .build();
    }

    @Test
    @DisplayName("공지사항 정보 저장 확인")
    public void createNoticeTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("admin", null, "ROLE_ADMIN");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        NoticeFileInfo noticeFileInfo = getNoticeFileInfo();

        mockMvc.perform(post("/notice/create")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(noticeFileInfo)))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("공지사항 정보 수정 확인")
    public void updateNoticeTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("admin", null, "ROLE_ADMIN");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        NoticeFileInfo noticeFileInfo = getNoticeFileInfo();

        mockMvc.perform(patch("/notice/update")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(noticeFileInfo)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    private NoticeFileInfo getNoticeFileInfo() {
        return NoticeFileInfo.builder()
                .noticeNo(1L)
                .title("테스트")
                .contents("테스트")
                .noticeFiles(Arrays.asList(
                        FileAttachInfo.of(127),
                        FileAttachInfo.of(128)
                ))
                .build();
    }
}
