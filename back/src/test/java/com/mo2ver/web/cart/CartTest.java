package com.mo2ver.web.cart;

import com.mo2ver.web.auth.CsrfConfigTest;
import com.mo2ver.web.domain.cart.dto.CartDto;
import com.mo2ver.web.domain.goods.dto.ImageDto;
import com.mo2ver.web.global.jwt.dto.TokenDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.math.BigDecimal;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class CartTest  extends CsrfConfigTest {

    @Test
    @DisplayName("장바구니 정보 저장 확인")
    public void createCartTest() throws Exception {

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenDto tokenDto = tokenProvider.createToken(authentication);  // 로그인

        CartDto cartDto = this.getCartDto();

        mockMvc.perform(post("/cart/add")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenDto.getAccesstoken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(cartDto)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    private CartDto getCartDto() {
        return CartDto.builder()
                .goodsCode("1000000001")
                .goodsName("테스트")
                .goodsBrand("bbj")
                .goodsGender("M")
                .goodsYear("2024")
                .supplyPrice(new BigDecimal(181899))
                .salePrice(new BigDecimal(172804))
                .image(new ImageDto("", 101, "txt", 'Y', 1, 'Y'))
                .amount(1)
                .totalPrice(172804)
                .build();
    }
}
