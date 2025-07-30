package com.mo2ver.web.domain.payment;

import com.mo2ver.web.domain.payment.entpoint.PaymentClientEndpoint;
import org.junit.Assert;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;

import javax.websocket.*;
import java.net.URI;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class PaymentWebSocketTest {

    @LocalServerPort
    private int port;

    @Test
    @DisplayName("WebSocket 실행 확인")
    public void sendMessageTest() throws Exception {
        String orderId = "89b1f308-cd03-4cd6-ba32-81d72c3a2e0d";
        String url = "ws://localhost:" + port + "/ws/payment?orderId=" + orderId;

        WebSocketContainer container = ContainerProvider.getWebSocketContainer();

        CountDownLatch latch = new CountDownLatch(1);

        Session session = container.connectToServer(
                new PaymentClientEndpoint(latch),
                URI.create(url));

        Assert.assertTrue(session.isOpen());

        latch.await(3, TimeUnit.SECONDS);

        session.close();
    }
}
