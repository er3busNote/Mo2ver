package com.mo2ver.web.domain.chat.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatMessage {
    private String content;

    public static ChatMessage of(String content) {
        return ChatMessage.builder()
                .content(content)
                .build();
    }
}
