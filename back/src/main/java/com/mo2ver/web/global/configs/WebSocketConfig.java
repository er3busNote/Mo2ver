package com.mo2ver.web.global.configs;

import com.mo2ver.web.domain.payment.websocket.PaymentHandshakeInterceptor;
import com.mo2ver.web.domain.payment.websocket.PaymentWebSocketHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {

    private final PaymentWebSocketHandler paymentWebSocketHandler;
    private final PaymentHandshakeInterceptor paymentHandshakeInterceptor;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(paymentWebSocketHandler, "/ws/payment")
                .addInterceptors(paymentHandshakeInterceptor)
                .setAllowedOrigins("*");
    }
}
