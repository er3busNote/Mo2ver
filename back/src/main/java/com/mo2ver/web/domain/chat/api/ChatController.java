package com.mo2ver.web.domain.chat.api;

import com.mo2ver.web.domain.chat.dto.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class ChatController {

    @MessageMapping("/chat.send")
    @SendTo("/topic/messages")
    public String sendMessage(ChatMessage message, Principal principal) {
        return principal.getName() + ": " + message.getContent();
    }
}
