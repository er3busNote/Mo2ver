package com.mo2ver.web.global.jwt.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TokenInfo {

    @NotEmpty
    private String username;

    @NotEmpty
    private String accesstoken;

    @NotEmpty
    private String refreshtoken;
}
