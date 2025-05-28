package com.mo2ver.web.domain.chat.dto;

import com.mo2ver.web.domain.chat.type.MessageType;
import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class ChatMessage {

    private MessageType type;
    private String message;

    public static ChatMessage of(String message) {
        return ChatMessage.builder()
                .type(MessageType.ENTER)
                .message(message)
                .build();
    }
}
