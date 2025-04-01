package com.mo2ver.web.domain.display.dto.response;

import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class BannerKeywordResponse {

    private String keyword;
    private Integer count;

    public static BannerKeywordResponse of(String keyword, Integer count) {
        return BannerKeywordResponse.builder()
                .keyword(keyword)
                .count(count)
                .build();
    }
}
