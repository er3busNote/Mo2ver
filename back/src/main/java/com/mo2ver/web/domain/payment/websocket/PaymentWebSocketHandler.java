package com.mo2ver.web.domain.payment.websocket;

import com.mo2ver.web.domain.payment.service.TossPaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Slf4j
@Component
@RequiredArgsConstructor
public class PaymentWebSocketHandler extends TextWebSocketHandler {

    private final TossPaymentService tossPaymentService;

    /**
     * 이탈 감지 로직
     * @param session 이탈 감지 세션
     */
    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        log.info("연결됨: " + session.getId());
        String orderId = (String) session.getAttributes().get("orderId");
        log.info("주문번호: " + orderId);
        // 이탈 감지 로직
    }

    /**
     * 결제 진행
     * @param session 결제 감지 세션
     * @param message 결제 감지 메시지
     */
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String orderId = (String) session.getAttributes().get("orderId");
        log.info("[" + orderId + "] 메시지 수신: " + message.getPayload());
    }

    /**
     * 이탈 처리 로직
     * @param session 이탈 감지 세션
     */
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        log.info("연결 종료: " + session.getId());
        String orderId = (String) session.getAttributes().get("orderId");
        log.info("주문번호: " + orderId);
        this.tossPaymentService.exitPayment(orderId);
    }
}
