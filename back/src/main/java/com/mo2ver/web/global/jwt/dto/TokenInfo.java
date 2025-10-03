package com.mo2ver.web.global.jwt.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TokenInfo {

    private String username;

    private String accesstoken;

    private String refreshtoken;

    private String expiration;
}
