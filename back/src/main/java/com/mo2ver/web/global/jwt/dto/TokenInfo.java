package com.mo2ver.web.global.jwt.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@Builder
public class TokenInfo {

    private String username;

    private String accesstoken;

    private String refreshtoken;
}
