package com.mo2ver.web.global.common.http;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import javax.annotation.PostConstruct;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebHttpClient {

    private final WebClient webClient;
    private static WebClient staticWebClient;

    @PostConstruct
    public void init() {
        staticWebClient = webClient;
    }

    public static String get(String apiUrl, MultiValueMap<String, String> param) {
        String url = UriComponentsBuilder.fromUriString(apiUrl)
                .queryParams(param)
                .build()
                .toUriString();

        Mono<String> response = staticWebClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class);

        return response.block(); // 동기식 호출
    }

    public static <T> Mono<String> post(String url, String authHeader, T body) {
        return staticWebClient.post()
                .uri(url)
                .header(HttpHeaders.AUTHORIZATION, authHeader)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class);
    }
}
