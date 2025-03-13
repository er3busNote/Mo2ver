package com.mo2ver.web.global.jwt.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class TokenRequest {

    @NotBlank(message = "ACCESS TOKEN이 존재하지 않습니다")
    private String accesstoken;
}
