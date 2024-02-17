package com.mo2ver.web.event;

import com.mo2ver.web.auth.CsrfConfigTest;
import com.mo2ver.web.domain.event.dto.EventImageDto;
import com.mo2ver.web.domain.event.dto.EventImageProductDto;
import com.mo2ver.web.global.jwt.dto.TokenDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.mock.web.MockPart;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.util.Arrays;
import java.util.Date;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class EventTest extends CsrfConfigTest {

    @Test
    @DisplayName("이벤트 이미지정보 저장 확인")
    public void createEventImageTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("admin", null, "ROLE_ADMIN");
        TokenDto tokenDto = tokenProvider.createToken(authentication);  // 로그인

        EventImageDto eventImageDto = this.getEventImageDto();

        MockMultipartFile file1 = new MockMultipartFile("eventFile", "file1.txt", "image/jpeg", "Test file content 1".getBytes());
        MockMultipartFile file2 = new MockMultipartFile("eventDetailFile", "file2.txt", "image/png", "Test file content 2".getBytes());

        MockPart jsonEventProduct = new MockPart("eventProduct", objectMapper.writeValueAsString(eventImageDto).getBytes());
        jsonEventProduct.getHeaders().setContentType(MediaType.APPLICATION_JSON);

        mockMvc.perform(multipart("/event/upload")
                        .file(file1)
                        .file(file2)
                        .part(jsonEventProduct)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenDto.getAccesstoken())
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    private EventImageDto getEventImageDto() {
        return EventImageDto.builder()
                .title("테스트")
                .eventStartDate(new Date())
                .eventEndDate(new Date())
                .eventYesNo('Y')
                .goods(Arrays.asList(
                        this.getEventProductDto(1),
                        this.getEventProductDto(2)
                ))
                .build();
    }

    private EventImageProductDto getEventProductDto(Integer i) {
        return EventImageProductDto.builder()
                .goodsCode("100000000" + i)
                .goodsName("테스트")
                .sortSequence(i)
                .build();
    }
}