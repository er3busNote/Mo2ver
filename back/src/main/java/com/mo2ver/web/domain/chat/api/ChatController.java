package com.mo2ver.web.domain.chat.api;

import com.mo2ver.web.domain.chat.dto.ChatMessage;
import com.mo2ver.web.domain.chat.type.MessageType;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessageSendingOperations simpMessageSendingOperations;

    @MessageMapping("/chat/message")
    public void enter(@Payload ChatMessage message, Principal principal) {
        if (MessageType.ENTER.equals(message.getType())){
            message.setMessage(principal.getName() + "님이 입장하셨습니다.");
        }
        simpMessageSendingOperations.convertAndSend("/topic/messages", message);
    }
}
