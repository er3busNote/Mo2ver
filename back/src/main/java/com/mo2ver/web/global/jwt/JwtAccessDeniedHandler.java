package com.mo2ver.web.global.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mo2ver.web.global.common.dto.response.ResponseHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException {
        sendErrorResponse(response, "권한이 없습니다");
    }

    // 인가(Authorization) 예외
    private void sendErrorResponse(HttpServletResponse response, String message) throws IOException {
        response.setCharacterEncoding("utf-8");
        response.setStatus(HttpStatus.FORBIDDEN.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        ObjectMapper objectMapper = new ObjectMapper();

        ResponseHandler jwtresponse = ResponseHandler.builder()
                .status(HttpStatus.FORBIDDEN.value())
                .message(message)
                .build();
        response.getWriter().write(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(jwtresponse));
    }
}
