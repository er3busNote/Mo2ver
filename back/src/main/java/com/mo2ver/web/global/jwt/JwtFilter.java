package com.mo2ver.web.global.jwt;

import com.mo2ver.web.global.common.cookie.CookieHelper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.security.sasl.AuthenticationException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);

    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String REFRESH_TOKEN = "refreshToken";

    private final TokenProvider tokenProvider;
    private final AccessDeniedHandler accessDeniedHandler;

    @Override
    public void doFilterInternal(HttpServletRequest httpServletRequest,
                                 HttpServletResponse httpServletResponse,
                                 FilterChain filterChain) throws IOException, ServletException {

        // TODO 전처리
        String accessToken = resolveToken(httpServletRequest);
        String refreshToken = CookieHelper.resolveTokenFromCookie(httpServletRequest, REFRESH_TOKEN);

        if (validateToken(accessToken)) {
            Authentication authentication = tokenProvider.getAuthentication(accessToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            logger.debug("Security Context에 '{}' Access Token 인증 정보를 저장했습니다", authentication.getName());
        }

        // Authorization 헤더가 존재하는데, Refresh Token이 아직 유효한 경우
        if (!isAuthenticated() && StringUtils.hasText(accessToken) && validateToken(refreshToken)) {
            throw new AuthenticationException("Access Token이 올바르지 않습니다.");
        }

        // Authorization 헤더가 존재하는데, Refresh Token이 유효하지 않은 경우 → AccessDeniedHandler쪽으로 예외처리를 전파시킴
        if (!isAuthenticated() && StringUtils.hasText(accessToken) && !validateToken(refreshToken)) {
            accessDeniedHandler.handle(httpServletRequest, httpServletResponse, new AccessDeniedException("Refresh Token이 올바르지 않습니다."));
            return;
        }

        // 인증된 경우, 필터 체인 계속 진행
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

    private boolean isAuthenticated() {
        SecurityContext context = SecurityContextHolder.getContext();   // 시큐리티 컨텍스트 객체를 얻음
        Authentication authentication = context.getAuthentication();    // 인증 객체를 얻음
        return authentication != null && authentication.isAuthenticated();
    }

    private boolean validateToken(String token) {
        return StringUtils.hasText(token) && tokenProvider.validateToken(token);
    }
}
