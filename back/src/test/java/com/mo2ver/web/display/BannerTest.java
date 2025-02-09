package com.mo2ver.web.display;

import com.mo2ver.web.auth.CsrfConfigTest;
import com.mo2ver.web.domain.display.dto.BannerImageDetailDto;
import com.mo2ver.web.domain.display.dto.BannerImageDto;
import com.mo2ver.web.domain.display.dto.GoodsDisplayDto;
import com.mo2ver.web.domain.display.dto.GoodsDisplayProductDto;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class BannerTest extends CsrfConfigTest {

    @Test
    @DisplayName("배너 전시 정보 조회")
    public void findBannerDisplayTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenDto tokenDto = tokenProvider.createToken(authentication);  // 로그인

        mockMvc.perform(get("/banner/display")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenDto.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("배너 이미지정보 저장 확인")
    public void createBannerImageTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("admin", null, "ROLE_ADMIN");
        TokenDto tokenDto = tokenProvider.createToken(authentication);  // 로그인

        BannerImageDto bannerImageDto = this.getBannerImageDto();

        MockMultipartFile file1 = new MockMultipartFile("files", "file1.txt", "image/jpeg", "Test file content 1".getBytes());
        MockMultipartFile file2 = new MockMultipartFile("files", "file2.txt", "image/png", "Test file content 2".getBytes());

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

    private BannerImageDto getBannerImageDto() {
        return BannerImageDto.builder()
                .title("테스트")
                .startDate(new Date())
                .endDate(new Date())
                .position("BN")
                .code("MAN")
                .useyn('Y')
                .bnnrImg(Arrays.asList(
                        this.getBannerDetailDto(1),
                        this.getBannerDetailDto(2)
                ))
                .build();
    }

    private BannerImageDetailDto getBannerDetailDto(Integer i) {
        return BannerImageDetailDto.builder()
                .title("테스트 " + i)
                .cnntUrl("https://mo2ver.com/test" + i + ".jpg")
                .useyn('Y')
                .build();
    }

    @Test
    @DisplayName("상품 전시정보 저장 확인")
    public void createGoodsDisplay() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("admin", null, "ROLE_ADMIN");
        TokenDto tokenDto = tokenProvider.createToken(authentication);  // 로그인

        GoodsDisplayDto goodsDisplayDto = this.getGoodsDisplayDto();

        mockMvc.perform(post("/banner/goods")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenDto.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(goodsDisplayDto)))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    private GoodsDisplayDto getGoodsDisplayDto() {
        return GoodsDisplayDto.builder()
                .title("테스트")
                .startDate(new Date())
                .endDate(new Date())
                .position("GD")
                .code("WOMAN")
                .useyn('Y')
                .goods(Arrays.asList(
                        this.getGoodsDisplayProductDto(1),
                        this.getGoodsDisplayProductDto(2)
                ))
                .build();
    }

    private GoodsDisplayProductDto getGoodsDisplayProductDto(Integer i) {
        return GoodsDisplayProductDto.builder()
                .goodsCode("100000000" + i)
                .goodsName("테스트")
                .sortSequence(i)
                .build();
    }
}
