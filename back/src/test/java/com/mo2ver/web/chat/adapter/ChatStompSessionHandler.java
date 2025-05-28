package com.mo2ver.web.chat.adapter;

import com.mo2ver.web.domain.chat.dto.ChatMessage;
import org.springframework.messaging.simp.stomp.*;

import java.lang.reflect.Type;
import java.util.concurrent.CompletableFuture;

public class ChatStompSessionHandler extends StompSessionHandlerAdapter {

    private final CompletableFuture<ChatMessage> future;

    public ChatStompSessionHandler(CompletableFuture<ChatMessage> future) {
        this.future = future;
    }

    @Override
    public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
        System.out.println("STOMP connected: " + connectedHeaders);

        session.subscribe("/topic/messages", new StompFrameHandler() {
            @Override
            public Type getPayloadType(StompHeaders headers) {
                return ChatMessage.class;
            }

            @Override
            public void handleFrame(StompHeaders headers, Object payload) {
                ChatMessage message = (ChatMessage) payload;
                future.complete(message);
            }
        });
    }

    @Override
    public void handleFrame(StompHeaders headers, Object payload) {
        System.err.println("ERROR handleFrame received: " + payload);
    }

    @Override
    public void handleException(StompSession session, StompCommand command,
                                StompHeaders headers, byte[] payload, Throwable exception) {
        future.completeExceptionally(exception);
    }

    @Override
    public void handleTransportError(StompSession session, Throwable exception) {
        future.completeExceptionally(exception);
    }
}
