package com.mo2ver.web.global.configs;

import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ClientHttpConnector;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.DefaultUriBuilderFactory;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Configuration
public class WebClientConfig {

    private static final int CONNECT_TIMEOUT_MILLISECOND = 10 * 1000;
    private static final long RESPONSE_TIMEOUT_MILLISECOND = 60 * 1000L;
    private static final long READ_TIMEOUT_MILLISECOND = 3 * 60 * 1000L;
    private static final long WRITE_TIMEOUT_MILLISECOND = 60 * 1000L;

    @Bean
    public WebClient webClient() {

        DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory();
        factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.NONE);

        HttpClient httpClient = HttpClient.create()
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, CONNECT_TIMEOUT_MILLISECOND)
                .responseTimeout(Duration.ofMillis(RESPONSE_TIMEOUT_MILLISECOND))
                .doOnConnected(conn ->
                        conn.addHandlerLast(new ReadTimeoutHandler(READ_TIMEOUT_MILLISECOND, TimeUnit.MILLISECONDS))
                                .addHandlerLast(new WriteTimeoutHandler(WRITE_TIMEOUT_MILLISECOND, TimeUnit.MILLISECONDS))
                );

        ExchangeStrategies exchangeStrategies = ExchangeStrategies.builder()
                .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(-1))
                .build();

        ClientHttpConnector connector = new ReactorClientHttpConnector(httpClient);

        return WebClient.builder()
                .uriBuilderFactory(factory)	// 추가
                .clientConnector(connector)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .exchangeStrategies(exchangeStrategies)
                .filter(logRequest())  // 요청 로깅
                .filter(logResponse()) // 응답 로깅
                .build();
    }

    // 요청 로깅 필터
    private ExchangeFilterFunction logRequest() {
        return ExchangeFilterFunction.ofRequestProcessor(clientRequest -> {
            System.out.println(">>> Request: " + clientRequest.method() + " " + clientRequest.url());
            clientRequest.headers().forEach((name, values) ->
                    values.forEach(value -> System.out.println(name + ": " + value)));
            return Mono.just(clientRequest);
        });
    }

    // 응답 로깅 필터
    private ExchangeFilterFunction logResponse() {
        return ExchangeFilterFunction.ofResponseProcessor(clientResponse -> {
            System.out.println("<<< Response Status: " + clientResponse.statusCode());
            return Mono.just(clientResponse);
        });
    }
}
