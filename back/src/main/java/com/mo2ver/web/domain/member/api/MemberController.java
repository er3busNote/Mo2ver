package com.mo2ver.web.domain.member.api;

import com.mo2ver.web.domain.member.service.MemberService;
import com.mo2ver.web.domain.member.dto.request.LoginRequest;
import com.mo2ver.web.domain.member.dto.request.SignupRequest;
import com.mo2ver.web.domain.member.validation.MemberValidator;
import com.mo2ver.web.global.common.dto.response.CsrfResponse;
import com.mo2ver.web.global.common.dto.response.ResponseHandler;
import com.mo2ver.web.global.error.dto.ErrorInfo;
import com.mo2ver.web.global.error.dto.response.ErrorHandler;
import com.mo2ver.web.global.error.dto.ErrorCode;
import com.mo2ver.web.global.error.dto.response.ErrorResponse;
import com.mo2ver.web.global.jwt.TokenProvider;
import com.mo2ver.web.global.jwt.dto.TokenInfo;
import com.mo2ver.web.global.jwt.dto.request.TokenRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.net.URI;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/member")
public class MemberController {

    private static final String JWT_REFRESH_TOKEN = "refreshToken";
    private static final String JWT_REFRESH_TOKEN_EXPIRATION = "refreshTokenExpiration";
    private static final String XSRF_TOKEN = "XSRF-TOKEN";

    private final MemberService memberService;
    private final ErrorHandler errorHandler;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final MemberValidator memberValidator;

    @PostMapping("/login")
    public ResponseEntity authLogin(@RequestBody @Valid LoginRequest loginRequest,
                                    Errors errors) {
        if (errors.hasErrors()) {
            return badRequest(errorHandler.buildError(ErrorCode.JSON_MAPPING_INVALID, ErrorInfo.builder()
                    .errors(errors.getFieldError())
                    .build()));
        }

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);   // --> Authenticated (인증)

        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인
        String refreshTokenExpiration = tokenProvider.getTokenExpiration(tokenInfo.getRefreshtoken());

        ResponseCookie refreshTokenCookie = createCookie(JWT_REFRESH_TOKEN, tokenInfo.getRefreshtoken(), true);
        ResponseCookie refreshTokenExpirationCookie = createCookie(JWT_REFRESH_TOKEN_EXPIRATION, refreshTokenExpiration, false);

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());
        headers.add(HttpHeaders.SET_COOKIE, refreshTokenExpirationCookie.toString());

        return ResponseEntity.created(URI.create("/login/" + authentication.isAuthenticated()))
                .headers(headers)
                .body(tokenInfo);
    }

    @PatchMapping("/refresh")
    public ResponseEntity authRefresh(@RequestBody @Valid TokenRequest tokenRequest,
                                      @CookieValue(name = JWT_REFRESH_TOKEN, required = false) String refreshToken,
                                      Errors errors) {
        if (errors.hasErrors()) {
            return badRequest(errorHandler.buildError(ErrorCode.JSON_MAPPING_INVALID, ErrorInfo.builder()
                    .errors(errors.getFieldError())
                    .build()));
        }

        // Refresh Token - Expired
        if (!tokenProvider.validateToken(refreshToken, false)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ResponseHandler.builder()
                            .status(HttpStatus.FORBIDDEN.value())
                            .message("Refresh Token이 유효하지 않습니다.")
                            .build());
        }

        // Access Token - Expired
        if (!tokenProvider.validateToken(tokenRequest.getAccesstoken(), false)) {
            Authentication authentication = tokenProvider.getAuthentication(refreshToken);
            TokenInfo refreshtokenInfo = tokenProvider.refreshToken(authentication, refreshToken);

            return ResponseEntity.created(URI.create("/login/" + authentication.isAuthenticated()))
                    .body(refreshtokenInfo);
        }

        return ResponseEntity.ok().body(tokenRequest);
    }

    @PostMapping("/signup")
    public ResponseEntity authSignup(@RequestBody @Valid SignupRequest signupRequest,
                                     Errors errors) {
        if (errors.hasErrors()) {
            return badRequest(errorHandler.buildError(ErrorCode.JSON_MAPPING_INVALID, ErrorInfo.builder()
                    .errors(errors.getFieldError())
                    .build()));
        }

        UserDetailsService userDetailsService = (UserDetailsService) memberService;
        try {
            UserDetails userDetails = userDetailsService.loadUserByUsername(signupRequest.getUsername());

            if (signupRequest.getUsername().equals(userDetails.getUsername())) {
                return unprocessableEntity(errorHandler.buildError(ErrorCode.SIGNUP_USERNAME_VALUE_INVALID, ErrorInfo.builder()
                        .message("이미 존재하는 사용자입니다")
                        .build()));
            }

            // <-- 이메일 처리를 추가로 해야됨...!!!

            return unprocessableEntity(errorHandler.buildError(ErrorCode.SIGNUP_EMAIL_VALUE_INVALID, ErrorInfo.builder()
                    .message("회원가입이 실패하였습니다")
                    .build()));

        } catch (UsernameNotFoundException e) {

            memberValidator.validate(signupRequest, errors);
            if (errors.hasErrors()) {
                return badRequest(errorHandler.buildError(ErrorCode.JSON_MAPPING_INVALID, ErrorInfo.builder()
                        .errors(errors.getFieldError())
                        .build()));
            }

            memberService.signup(signupRequest);  // 회원가입

            return ResponseEntity.ok().body(ResponseHandler.builder()
                    .status(HttpStatus.OK.value())
                    .message("회원가입이 완료되었습니다")
                    .build());
        }
    }

    @GetMapping("csrf-token")
    public ResponseEntity csrtToken(HttpServletRequest request, HttpServletResponse response) {
        CsrfToken csrf = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
        if (csrf != null) {
            ResponseCookie csrfCookie = createCookie(XSRF_TOKEN, csrf.getToken(), true);
            response.setHeader(HttpHeaders.SET_COOKIE, csrfCookie.toString());
            return ResponseEntity.ok().body(CsrfResponse.builder()
                    .csrfToken(csrf.getToken())
                    .build());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseHandler.builder()
                .status(HttpStatus.NOT_FOUND.value())
                .message("CSRF Token이 존재하지 않습니다")
                .build());
    }

    private ResponseCookie createCookie(String key, String token, boolean isHttpOnly) {
        return ResponseCookie.from(key, token)
                .httpOnly(isHttpOnly)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(7 * 24 * 60 * 60) // 7일 유지
                .build();
    }

    private ResponseEntity<ErrorResponse> badRequest(ErrorResponse response) {
        return ResponseEntity.badRequest().body(response);
    }

    private ResponseEntity<ErrorResponse> unprocessableEntity(ErrorResponse response) {
        return ResponseEntity.unprocessableEntity().body(response);
    }
}
