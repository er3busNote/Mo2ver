package com.mo2ver.web.goods;

import com.mo2ver.web.auth.CsrfConfigTest;
import com.mo2ver.web.common.file.dto.FileAttachInfo;
import com.mo2ver.web.domain.goods.dto.request.GoodsImageAttachRequest;
import com.mo2ver.web.domain.goods.dto.request.GoodsImageRequest;
import com.mo2ver.web.global.jwt.dto.TokenInfo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.mock.web.MockPart;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Date;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class GoodsTest extends CsrfConfigTest {

    @Test
    @DisplayName("상품 상세 정보 확인")
    public void findGoodsInfoTest() throws Exception {
        String goodCode = "1000000004";
        mockMvc.perform(get("/goods/info/{goodCode}", goodCode))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("상품 리스트 정보 확인")
    public void findGoodsListTest() throws Exception {

        mockMvc.perform(get("/goods/list")
                        .param("page", "0")
                        .param("size", "12")
                        .param("categoryCode", "C001000000")
                        .param("categoryType", "L"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("상품 검색 확인")
    public void findGoodsSearchTest() throws Exception {

        mockMvc.perform(get("/goods/search")
                        .param("page", "0")
                        .param("size", "12")
                        .param("goodsName", "스")
                        .param("largeCategoryCode", "C001000000")
                        .param("mediumCategoryCode", "C001001000")
                        .param("smallCategoryCode", "C001001001"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("상품 Top 10 확인")
    public void findGoodsRankingTest() throws Exception {
        Integer count = 10;
        mockMvc.perform(get("/goods/list/rank/{count}", count))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("상품 이미지정보 저장 확인")
    public void createGoodsImageTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        GoodsImageRequest goodsImageRequest = this.getGoodsImageInfo();
        GoodsImageAttachRequest goodsImageAttachRequest = this.getGoodsImageAttachInfo(goodsImageRequest);

        mockMvc.perform(post("/goods/create")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(goodsImageAttachRequest)))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("상품 이미지정보 수정 확인")
    public void updateGoodsImageTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        GoodsImageRequest goodsImageRequest = this.getGoodsImageInfo();
        GoodsImageAttachRequest goodsImageAttachRequest = this.getGoodsImageAttachInfo(goodsImageRequest);

        mockMvc.perform(patch("/goods/update")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(goodsImageAttachRequest)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("상품 이미지정보 첨부파일 저장 확인")
    public void createGoodsImageUploadTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        GoodsImageRequest goodsImageRequest = this.getGoodsImageInfo();

        MockMultipartFile file1 = new MockMultipartFile("files", "file1.txt", "image/jpeg", "Test file content 1".getBytes());
        MockMultipartFile file2 = new MockMultipartFile("files", "file2.txt", "image/png", "Test file content 2".getBytes());

        MockPart jsonGoodsImage = new MockPart("goodsImage", objectMapper.writeValueAsString(goodsImageRequest).getBytes());
        jsonGoodsImage.getHeaders().setContentType(MediaType.APPLICATION_JSON);

        mockMvc.perform(multipart("/goods/upload")
                        .file(file1)
                        .file(file2)
                        .part(jsonGoodsImage)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenInfo.getAccesstoken())
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    private GoodsImageRequest getGoodsImageInfo() {
        return GoodsImageRequest.builder()
                .goodsCode("1000000007")
                .goodsName("테스트2")
                .largeCategoryCode("C001000000")
                .mediumCategoryCode("C001001000")
                .smallCategoryCode("C001001001")
                .goodsGender("Men")
                .goodsBrand("bbj")
                .goodsYear("2025")
                .keyword("#전체연령#성인#어린이#유아#가족#여성#남성")
                .summaryInfo("요약정보 테스트")
                .buyLimitYesNo('Y')
                .buyLimitCondition("20")
                .salePeriodYesNo('Y')
                .saleStartDate(new Date())
                .saleEndDate(new Date())
                .supplyPrice(new BigDecimal(181800))
                .salePrice(new BigDecimal(172804))
                .maxBuyQuantity(10)
                .discountPrice(new BigDecimal(7500))
                .discountStartDate(new Date())
                .discountEndDate(new Date())
                .rateYesNo('Y')
                .maxLimitYesNo('N')
                .maxLimitAmount(new BigDecimal(2))
                .build();
    }

    private GoodsImageAttachRequest getGoodsImageAttachInfo(GoodsImageRequest goodsImageRequest) {
        return GoodsImageAttachRequest.builder()
                .goodsImg(Arrays.asList(
                        FileAttachInfo.from(127, "image1.png", "image/png", 2048, ".png"),
                        FileAttachInfo.from(128, "image2.jpg", "image/jpeg", 1024, ".jpg")
                ))
                .goodsCode(goodsImageRequest.getGoodsCode())
                .goodsName(goodsImageRequest.getGoodsName())
                .largeCategoryCode(goodsImageRequest.getLargeCategoryCode())
                .mediumCategoryCode(goodsImageRequest.getMediumCategoryCode())
                .smallCategoryCode(goodsImageRequest.getSmallCategoryCode())
                .goodsGender(goodsImageRequest.getGoodsGender())
                .goodsBrand(goodsImageRequest.getGoodsBrand())
                .goodsYear(goodsImageRequest.getGoodsYear())
                .keyword(goodsImageRequest.getKeyword())
                .summaryInfo(goodsImageRequest.getSummaryInfo())
                .buyLimitYesNo(goodsImageRequest.getBuyLimitYesNo())
                .buyLimitCondition(goodsImageRequest.getBuyLimitCondition())
                .salePeriodYesNo(goodsImageRequest.getSalePeriodYesNo())
                .saleStartDate(goodsImageRequest.getSaleStartDate())
                .saleEndDate(goodsImageRequest.getSaleEndDate())
                .supplyPrice(goodsImageRequest.getSupplyPrice())
                .salePrice(goodsImageRequest.getSalePrice())
                .maxBuyQuantity(goodsImageRequest.getMaxBuyQuantity())
                .discountPrice(goodsImageRequest.getDiscountPrice())
                .discountStartDate(goodsImageRequest.getDiscountStartDate())
                .discountEndDate(goodsImageRequest.getDiscountEndDate())
                .rateYesNo(goodsImageRequest.getRateYesNo())
                .maxLimitYesNo(goodsImageRequest.getMaxLimitYesNo())
                .maxLimitAmount(goodsImageRequest.getMaxLimitAmount())
                .build();
    }
}
