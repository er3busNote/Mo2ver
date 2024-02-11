package com.mo2ver.web.display;

import com.mo2ver.web.auth.CsrfConfigTest;
import com.mo2ver.web.domain.display.dto.BannerDetailDto;
import com.mo2ver.web.domain.display.dto.BannerImageDto;
import com.mo2ver.web.global.jwt.dto.TokenDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.mock.web.MockPart;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class BannerImageTest extends CsrfConfigTest {

    @Test
    @DisplayName("배너 이미지정보 저장 확인")
    public void createBannerImageTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("admin", null, "ROLE_ADMIN");
        TokenDto tokenDto = tokenProvider.createToken(authentication);  // 로그인

        BannerImageDto bannerImageDto = new BannerImageDto();
        bannerImageDto.setTitle("테스트");
        bannerImageDto.setStartDate(new Date());
        bannerImageDto.setEndDate(new Date());
        bannerImageDto.setPosition("BN");
        bannerImageDto.setUseyn('Y');

        BannerDetailDto bannerDetailDto1 = new BannerDetailDto();
        bannerDetailDto1.setTitle("테스트 1");
        bannerDetailDto1.setCnntUrl("https://mo2ver.com/test1.jpg");
        bannerDetailDto1.setUseyn('Y');

        BannerDetailDto bannerDetailDto2 = new BannerDetailDto();
        bannerDetailDto2.setTitle("테스트 2");
        bannerDetailDto2.setCnntUrl("https://mo2ver.com/test2.jpg");
        bannerDetailDto2.setUseyn('Y');

        List<BannerDetailDto> listBannerDetailDto = new ArrayList<BannerDetailDto>();
        listBannerDetailDto.add(bannerDetailDto1);
        listBannerDetailDto.add(bannerDetailDto2);
        bannerImageDto.setBnnrImg(listBannerDetailDto);

        MockMultipartFile file1 = new MockMultipartFile("files", "file1.txt", "text/plain", "Test file content 1".getBytes());
        MockMultipartFile file2 = new MockMultipartFile("files", "file2.txt", "text/plain", "Test file content 2".getBytes());

        MockPart jsonBannerImage = new MockPart("bannerImage", objectMapper.writeValueAsString(bannerImageDto).getBytes());
        jsonBannerImage.getHeaders().setContentType(MediaType.APPLICATION_JSON);

        mockMvc.perform(multipart("/banner/upload")
                        .file(file1)
                        .file(file2)
                        .part(jsonBannerImage)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenDto.getAccesstoken())
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andDo(print())
                .andExpect(status().isCreated());
    }
}
