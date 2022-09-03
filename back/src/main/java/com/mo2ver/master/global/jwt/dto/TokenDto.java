package com.mo2ver.master.global.jwt.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TokenDto {

    @NotEmpty
    private String username;

    @NotEmpty
    private String accesstoken;

    @NotEmpty
    private String refreshtoken;
}
