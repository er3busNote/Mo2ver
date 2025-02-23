package com.mo2ver.web.display;

import com.mo2ver.web.auth.CsrfConfigTest;
import com.mo2ver.web.common.file.dto.FileAttachInfo;
import com.mo2ver.web.domain.display.dto.*;
import com.mo2ver.web.global.jwt.dto.TokenInfo;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class BannerTest extends CsrfConfigTest {

    @Test
    @DisplayName("배너 전시 정보 조회")
    public void findBannerDisplayTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        mockMvc.perform(get("/banner/display")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }
    @Test
    @DisplayName("배너 이미지 상세 정보 조회")
    public void findBannerImagesDetailTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("admin", null, "ROLE_ADMIN");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        BannerInfo bannerInfo = this.getBannerImagesInfo();

        mockMvc.perform(post("/banner/images/detail")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(bannerInfo)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    private BannerInfo getBannerImagesInfo() {
        return BannerInfo.builder()
                .bannerManageNo(22L)
                .displayTemplateCode("BN")
                .build();
    }

    @Test
    @DisplayName("배너 상품 전시 상세 정보 조회")
    public void findBannerGoodsDetailTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("admin", null, "ROLE_ADMIN");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        BannerInfo bannerInfo = this.getBannerGoodsInfo();

        mockMvc.perform(post("/banner/goods/detail")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(bannerInfo)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    private BannerInfo getBannerGoodsInfo() {
        return BannerInfo.builder()
                .bannerManageNo(20L)
                .displayTemplateCode("GD")
                .build();
    }

    @Test
    @DisplayName("배너 이미지정보 저장 확인")
    public void createBannerImageTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("admin", null, "ROLE_ADMIN");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        BannerImageInfo bannerImageInfo = this.getBannerImageInfo();

        mockMvc.perform(post("/banner/create")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(bannerImageInfo)))
                .andDo(print())
                .andExpect(status().isCreated());

    }

    @Test
    @DisplayName("배너 이미지정보 수정 확인")
    public void updateBannerImageTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("admin", null, "ROLE_ADMIN");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        BannerImageInfo bannerImageInfo = this.getBannerImageInfo();

        mockMvc.perform(patch("/banner/update")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(bannerImageInfo)))
                .andDo(print())
                .andExpect(status().isOk());

    }

    @Test
    @DisplayName("배너 이미지정보 첨부파일 저장 확인")
    public void createBannerImageUploadTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("admin", null, "ROLE_ADMIN");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        BannerImageInfo bannerImageInfo = this.getBannerImageInfo();

        MockMultipartFile file1 = new MockMultipartFile("files", "file1.txt", "image/jpeg", "Test file content 1".getBytes());
        MockMultipartFile file2 = new MockMultipartFile("files", "file2.txt", "image/png", "Test file content 2".getBytes());

        MockPart jsonBannerImage = new MockPart("bannerImage", objectMapper.writeValueAsString(bannerImageInfo).getBytes());
        jsonBannerImage.getHeaders().setContentType(MediaType.APPLICATION_JSON);

        mockMvc.perform(multipart("/banner/upload")
                        .file(file1)
                        .file(file2)
                        .part(jsonBannerImage)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    private BannerImageInfo getBannerImageInfo() {
        return BannerImageInfo.builder()
                .bannerNo(31L)
                .title("테스트")
                .startDate(new Date())
                .endDate(new Date())
                .position("")
                .type("BN")
                .code("WOMAN")
                .useyn('Y')
                .bnnrImg(Arrays.asList(
                        this.getBannerDetailInfo(3),
                        this.getBannerDetailInfo(4)
                ))
                .build();
    }

    private BannerImageDetailInfo getBannerDetailInfo(Integer i) {
        return BannerImageDetailInfo.builder()
                .title("테스트 " + i)
                .cnntUrl("https://mo2ver.com/test" + i + ".jpg")
                .file(FileAttachInfo.from(100011, "image1.png", "image/png", 2048, ".png").getFileAttachCode())
                .useyn('Y')
                .build();
    }

    @Test
    @DisplayName("상품 전시정보 저장 확인")
    public void createGoodsDisplay() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("admin", null, "ROLE_ADMIN");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        GoodsDisplayInfo goodsDisplayInfo = this.getGoodsDisplayInfo();

        mockMvc.perform(post("/banner/goods")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(goodsDisplayInfo)))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    private GoodsDisplayInfo getGoodsDisplayInfo() {
        return GoodsDisplayInfo.builder()
                .title("테스트")
                .startDate(new Date())
                .endDate(new Date())
                .position("")
                .type("GD")
                .code("WOMAN")
                .useyn('Y')
                .goods(Arrays.asList(
                        this.getGoodsDisplayProductInfo(1),
                        this.getGoodsDisplayProductInfo(2)
                ))
                .build();
    }

    private GoodsDisplayProductInfo getGoodsDisplayProductInfo(Integer i) {
        return GoodsDisplayProductInfo.builder()
                .goodsCode("100000000" + i)
                .goodsName("테스트")
                .sortSequence(i)
                .build();
    }
}
