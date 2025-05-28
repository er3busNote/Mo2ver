package com.mo2ver.web.payment.entpoint;

import javax.websocket.*;
import java.io.IOException;
import java.util.concurrent.CountDownLatch;

@ClientEndpoint
public class PaymentClientEndpoint {

    private final CountDownLatch latch;

    public PaymentClientEndpoint(CountDownLatch latch) {
        this.latch = latch;
    }

    @OnOpen
    public void onOpen(Session session) throws IOException {
        System.out.println("Connected to server");
        session.getBasicRemote().sendText("PING");
    }

    @OnMessage
    public void onMessage(String message) {
        System.out.println("Received: " + message);
        latch.countDown();
    }

    @OnClose
    public void onClose(Session session, CloseReason closeReason) {
        System.out.println("Connection closed: " + closeReason);
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        throwable.printStackTrace();
    }
}
