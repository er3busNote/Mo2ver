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

    public static <T> T get(String url, MultiValueMap<String, String> param, Class<T> responseType) {
        String apiUrl = UriComponentsBuilder.fromUriString(url)
                .queryParams(param)
                .build()
                .toUriString();

        return staticWebClient.get()
                .uri(apiUrl)
                .retrieve()
                .bodyToMono(responseType)
                .block(); // 동기식 호출
    }

    public static <T> Mono<T> get(String url, String authHeader, Class<T> responseType) {
        return staticWebClient.get()
                .uri(url)
                .header(HttpHeaders.AUTHORIZATION, authHeader)
                .retrieve()
                .bodyToMono(responseType);
    }

    public static <T, B> Mono<T> post(String url, B body, Class<T> responseType) {
        return staticWebClient.post()
                .uri(url)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(responseType);
    }

    public static <B> Mono<String> post(String url, String authHeader, B body) {
        return staticWebClient.post()
                .uri(url)
                .header(HttpHeaders.AUTHORIZATION, authHeader)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class);
    }
}
