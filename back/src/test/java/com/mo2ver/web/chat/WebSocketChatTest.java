package com.mo2ver.web.chat;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mo2ver.web.domain.chat.dto.ChatMessage;
import com.mo2ver.web.global.jwt.TokenProvider;
import com.mo2ver.web.global.jwt.dto.TokenInfo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.*;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.Transport;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import java.lang.reflect.Type;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class WebSocketChatTest {

    @LocalServerPort
    private int port;

    private WebSocketStompClient stompClient;

    @Autowired
    protected ObjectMapper objectMapper;

    @Autowired
    protected TokenProvider tokenProvider;

    private String token;

    @BeforeEach
    void setup() {
        // 1. SockJS 클라이언트 설정
        WebSocketClient webSocketClient = new StandardWebSocketClient();
        WebSocketTransport webSocketTransport = new WebSocketTransport(webSocketClient);
        List<Transport> transports = Collections.<Transport>singletonList(webSocketTransport);
        SockJsClient sockJsClient = new SockJsClient(transports);

        // 2. STOMP 클라이언트 생성
        stompClient = new WebSocketStompClient(sockJsClient);
        stompClient.setMessageConverter(new MappingJackson2MessageConverter());

        Authentication authentication = new TestingAuthenticationToken("bbj", null, "ROLE_USER");
        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        token = tokenInfo.getAccesstoken();
    }

    @Test
    @DisplayName("WebSocket 실행 확인")
    void testSendMessageWithJwt() throws Exception {
        String url = "ws://localhost:" + port + "/ws/chat?token=" + token;

        // 3. 비동기 응답 처리
        CompletableFuture<String> future = new CompletableFuture<>();

        // 4. 세션 핸들러
        StompSessionHandler sessionHandler = new StompSessionHandlerAdapter() {
            @Override
            public void afterConnected(final StompSession session, StompHeaders connectedHeaders) {
                // 메시지 수신 구독
                session.subscribe("/topic/messages", new StompFrameHandler() {
                    @Override
                    public Type getPayloadType(StompHeaders headers) {
                        return String.class;
                    }

                    @Override
                    public void handleFrame(StompHeaders headers, Object payload) {
                        future.complete((String) payload);
                    }
                });

                // 메시지 전송
                try {
                    ChatMessage message = ChatMessage.of("Hello with JWT!");
                    String json = objectMapper.writeValueAsString(message);
                    session.send("/app/chat.send", json.getBytes(StandardCharsets.UTF_8));
                } catch (Exception e) {
                    future.completeExceptionally(e);
                }
            }

            @Override
            public void handleTransportError(StompSession session, Throwable exception) {
                future.completeExceptionally(exception);
            }
        };

        // 6. 연결 시도
        ListenableFuture<StompSession> connectFuture = stompClient.connect(url, sessionHandler);
        StompSession session = connectFuture.get(5, TimeUnit.SECONDS);

        // 7. 결과 대기 및 출력
        String response = future.get(3, TimeUnit.SECONDS);
        System.out.println("Received: " + response);

        session.disconnect();
    }
}
