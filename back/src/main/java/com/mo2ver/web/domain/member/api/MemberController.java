package com.mo2ver.web.domain.member.api;

import com.mo2ver.web.domain.member.service.MemberService;
import com.mo2ver.web.domain.member.dto.request.LoginRequest;
import com.mo2ver.web.domain.member.dto.request.SignupRequest;
import com.mo2ver.web.domain.member.validation.MemberValidator;
import com.mo2ver.web.global.common.dto.response.CsrfResponse;
import com.mo2ver.web.global.common.dto.response.ResponseHandler;
import com.mo2ver.web.global.error.dto.response.ErrorHandler;
import com.mo2ver.web.global.error.dto.ErrorCode;
import com.mo2ver.web.global.error.dto.response.ErrorResponse;
import com.mo2ver.web.global.jwt.TokenProvider;
import com.mo2ver.web.global.jwt.dto.TokenInfo;
import lombok.extern.slf4j.Slf4j;
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
import java.util.HashMap;

@Slf4j
@RestController
@RequestMapping(value = "/member")
public class MemberController {

    private final MemberService memberService;
    private final ErrorHandler errorHandler;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final MemberValidator memberValidator;

    public MemberController(MemberService memberService, TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder, MemberValidator memberValidator, ErrorHandler errorHandler) {
        this.memberService = memberService;
        this.errorHandler = errorHandler;
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.memberValidator = memberValidator;
    }

    @PostMapping("/login")
    public ResponseEntity authLogin(@RequestBody @Valid LoginRequest loginRequest,
                                              Errors errors) {
        HashMap<String, Object> response = new HashMap<>();
        if (errors.hasErrors()) {
            response.put("required", errors);
            return badRequest(errorHandler.buildError(ErrorCode.JSON_MAPPING_INVALID, response));
        }

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);   // --> Authenticated (인증)

        TokenInfo tokenInfo = tokenProvider.createToken(authentication);  // 로그인

        return ResponseEntity.created(URI.create("/login/" + authentication.isAuthenticated()))
                .body(tokenInfo);
    }

    @PatchMapping("/refresh")
    public ResponseEntity authRefresh(@RequestBody @Valid TokenInfo tokenInfo,
                                                Errors errors) {
        HashMap<String, Object> response = new HashMap<>();
        if (errors.hasErrors()) {
            response.put("required", errors);
            return badRequest(errorHandler.buildError(ErrorCode.JSON_MAPPING_INVALID, response));
        }

        // Refresh Token - Expired
        if (!tokenProvider.validateToken(tokenInfo.getRefreshtoken())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ResponseHandler.builder()
                            .status(HttpStatus.FORBIDDEN.value())
                            .message("Refresh Token이 유효하지 않습니다.")
                            .build());
        }

        // Access Token - Expired
        if (!tokenProvider.validateToken(tokenInfo.getAccesstoken())) {
            Authentication authentication = tokenProvider.getAuthentication(tokenInfo.getRefreshtoken());
            TokenInfo refreshtokenInfo = tokenProvider.refreshToken(authentication, tokenInfo.getRefreshtoken());

            return ResponseEntity.created(URI.create("/login/" + authentication.isAuthenticated()))
                    .body(refreshtokenInfo);
        }

        return ResponseEntity.ok().body(tokenInfo);
    }

    @PostMapping("/signup")
    public ResponseEntity authSignup(@RequestBody @Valid SignupRequest signupRequest,
                                                  Errors errors) {
        HashMap<String, Object> response = new HashMap<>();
        if (errors.hasErrors()) {
            response.put("required", errors);
            return badRequest(errorHandler.buildError(ErrorCode.JSON_MAPPING_INVALID, response));
        }

        UserDetailsService userDetailsService = (UserDetailsService) memberService;
        try {
            UserDetails userDetails = userDetailsService.loadUserByUsername(signupRequest.getUsername());

            if (signupRequest.getUsername().equals(userDetails.getUsername())) {
                return unprocessableEntity(errorHandler.buildError(ErrorCode.SIGNUP_USERNAME_VALUE_INVALID, response));
            }

            // <-- 이메일 처리를 추가로 해야됨...!!!

            return unprocessableEntity(errorHandler.buildError(ErrorCode.SIGNUP_EMAIL_VALUE_INVALID, response));

        } catch (UsernameNotFoundException e) {

            memberValidator.validate(signupRequest, errors);
            if (errors.hasErrors()) {
                response.put("required", errors);
                return badRequest(errorHandler.buildError(ErrorCode.JSON_MAPPING_INVALID, response));
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
            ResponseCookie csrfCookie = ResponseCookie.from("XSRF-TOKEN", csrf.getToken())
                    .path("/")
                    .secure(true)
                    .sameSite("None")
                    .build();
            response.setHeader("Set-Cookie", csrfCookie.toString());
            return ResponseEntity.ok().body(CsrfResponse.builder()
                    .csrfToken(csrf.getToken())
                    .build());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseHandler.builder()
                .status(HttpStatus.NOT_FOUND.value())
                .message("CSRF Token이 존재하지 않습니다")
                .build());
    }

    private ResponseEntity<ErrorResponse> badRequest(ErrorResponse response) {
        return ResponseEntity.badRequest().body(response);
    }

    private ResponseEntity<ErrorResponse> unprocessableEntity(ErrorResponse response) {
        return ResponseEntity.unprocessableEntity().body(response);
    }
}
