package com.mo2ver.web.domain.payment.dto.request.http;

import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class IamportRequest {

    private String imp_key;

    private String imp_secret;

    public static IamportRequest of(String apikey, String secretKey) {
        return IamportRequest.builder()
                .imp_key(apikey)
                .imp_secret(secretKey)
                .build();
    }
}
