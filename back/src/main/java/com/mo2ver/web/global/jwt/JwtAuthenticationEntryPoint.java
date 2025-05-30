package com.mo2ver.web.global.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mo2ver.web.global.common.dto.response.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper;

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException, BadCredentialsException {
        sendErrorResponse(response, "인증에 실패하였습니다");
    }

    // 인증(Authentication) 예외
    private void sendErrorResponse(HttpServletResponse response, String message) throws IOException {
        response.setCharacterEncoding("utf-8");
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        ResponseHandler jwtresponse = ResponseHandler.builder()
                .status(HttpStatus.UNAUTHORIZED.value())
                .message(message)
                .build();
        response.getWriter().write(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(jwtresponse));
    }
}
