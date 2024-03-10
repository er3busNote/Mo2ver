package com.mo2ver.web.domain.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class CartListDto {

    int cartTotal;

    List<CartDto> cartDto;
}
