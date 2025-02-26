package com.mo2ver.web.global.jwt;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);

    public static final String AUTHORIZATION_HEADER = "Authorization";

    private final TokenProvider tokenProvider;

    // ServletContext와 ApplicationContext의 연동
    @Override
    public void doFilterInternal(HttpServletRequest httpServletRequest,
                                 HttpServletResponse httpServletResponse,
                                 FilterChain filterChain) throws IOException, ServletException {

        // TODO 전처리
        try {
            String jwt = resolveToken(httpServletRequest);

            // JWT가 생성되면, ServletContext에 저장 <-> JWP가 소멸되면 ServletContext에서 삭제
            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
                Authentication authentication = tokenProvider.getAuthentication(jwt);

                // 실제 SecurityContext에 authentication정보를 등록
                SecurityContextHolder.getContext().setAuthentication(authentication);   // --> 매번 요청시마다 달라짐

                logger.debug("Security Context에 '{}' 인증 정보를 저장했습니다", authentication.getName());
            } else {
                // 시큐리티 컨텍스트 객체를 얻음
                SecurityContext context = SecurityContextHolder.getContext();
                // 인증 객체를 얻음
                Authentication authentication = context.getAuthentication();
                logger.debug("유효한 JWT 토큰이 없습니다 {} -> {}", context, authentication);
            }
        } catch(NullPointerException e){ }

        filterChain.doFilter(httpServletRequest, httpServletResponse);
        // TODO 후처리
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
