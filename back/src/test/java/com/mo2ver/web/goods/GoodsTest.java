package com.mo2ver.web.goods;

import com.mo2ver.web.auth.CsrfConfigTest;
import com.mo2ver.web.domain.goods.dto.GoodsImageDto;
import com.mo2ver.web.global.jwt.dto.TokenDto;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.mock.web.MockPart;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.math.BigDecimal;
import java.util.Date;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class GoodsTest extends CsrfConfigTest {

    @Test
    @DisplayName("상품 리스트 정보 확인")
    public void findGoodslistTest() throws Exception {

        mockMvc.perform(get("/goods/list")
                        .param("page", "0")
                        .param("size", "12")
                        .param("categoryCode", "C001000000")
                        .param("categoryType", "L"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("상품 이미지정보 저장 확인")
    public void createGoodsImageTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenDto tokenDto = tokenProvider.createToken(authentication);  // 로그인

        GoodsImageDto goodsImageDto = new GoodsImageDto();
        goodsImageDto.setGoodsName("테스트");
        goodsImageDto.setLargeCategoryCode("C001000000");
        goodsImageDto.setMediumCategoryCode("C001001000");
        goodsImageDto.setSmallCategoryCode("C001001001");
        goodsImageDto.setGoodsGender("M");
        goodsImageDto.setGoodsBrand("bbj");
        goodsImageDto.setGoodsYear("2024");
        goodsImageDto.setKeyword("#전체연령#성인#어린이#유아#가족#여성#남성");
        goodsImageDto.setSummaryInfo("요약정보 테스트");
        goodsImageDto.setBuyLimitYesNo('N');
        goodsImageDto.setBuyLimitCondition("10");
        goodsImageDto.setSalePeriodYesNo('Y');
        goodsImageDto.setSaleStartDate(new Date());
        goodsImageDto.setSaleEndDate(new Date());
        goodsImageDto.setSupplyPrice(new BigDecimal(181899));
        goodsImageDto.setSalePrice(new BigDecimal(172804));
        goodsImageDto.setMaxBuyQuantity(10);
        goodsImageDto.setDiscountPrice(new BigDecimal(7000));
        goodsImageDto.setDiscountStartDate(new Date());
        goodsImageDto.setDiscountEndDate(new Date());
        goodsImageDto.setRateYesNo('N');
        goodsImageDto.setMaxLimitYesNo('N');
        goodsImageDto.setMaxLimitAmount(new BigDecimal(0));

        MockMultipartFile file1 = new MockMultipartFile("files", "file1.txt", "image/jpeg", "Test file content 1".getBytes());
        MockMultipartFile file2 = new MockMultipartFile("files", "file2.txt", "image/png", "Test file content 2".getBytes());

        MockPart jsonGoodsImage = new MockPart("goodsImage", objectMapper.writeValueAsString(goodsImageDto).getBytes());
        jsonGoodsImage.getHeaders().setContentType(MediaType.APPLICATION_JSON);

        mockMvc.perform(multipart("/goods/upload")
                        .file(file1)
                        .file(file2)
                        .part(jsonGoodsImage)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenDto.getAccesstoken())
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andDo(print())
                .andExpect(status().isCreated());
    }
}
