package com.mo2ver.web.domain.member.api;

import com.mo2ver.web.domain.member.service.MemberService;
import com.mo2ver.web.domain.member.dto.LoginDto;
import com.mo2ver.web.domain.member.dto.SignupDto;
import com.mo2ver.web.domain.member.validation.MemberValidator;
import com.mo2ver.web.global.common.dto.CsrfDto;
import com.mo2ver.web.global.common.dto.ResponseDto;
import com.mo2ver.web.global.error.response.ErrorHandler;
import com.mo2ver.web.global.error.dto.ErrorCode;
import com.mo2ver.web.global.error.dto.ErrorResponse;
import com.mo2ver.web.global.jwt.TokenProvider;
import com.mo2ver.web.global.jwt.dto.TokenDto;
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
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.HashMap;

@Slf4j
@Controller
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
    public ResponseEntity<TokenDto> authLogin(@RequestBody @Valid LoginDto loginDto,
                                              Errors errors) {
        HashMap<String, Object> response = new HashMap<>();
        if (errors.hasErrors()) {
            response.put("required", errors);
            return badRequest(errorHandler.buildError(ErrorCode.JSON_MAPPING_INVALID, response));
        }

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);   // --> Authenticated (인증)

        TokenDto tokenDto = tokenProvider.createToken(authentication);  // 로그인

        return new ResponseEntity<>(tokenDto, HttpStatus.CREATED);
    }

    @PatchMapping("/refresh")
    public ResponseEntity<TokenDto> authRefresh(@RequestBody @Valid TokenDto tokenDto,
                                                Errors errors) {
        HashMap<String, Object> response = new HashMap<>();
        if (errors.hasErrors()) {
            response.put("required", errors);
            return badRequest(errorHandler.buildError(ErrorCode.JSON_MAPPING_INVALID, response));
        }

        // Refresh Token - Expired
        if (!tokenProvider.validateToken(tokenDto.getRefreshtoken())) {
            return new ResponseEntity(new ResponseDto(HttpStatus.FORBIDDEN.value(), "Refresh Token이 유효하지 않습니다."), HttpStatus.FORBIDDEN);
        }

        // Access Token - Expired
        if (!tokenProvider.validateToken(tokenDto.getAccesstoken())) {
            Authentication authentication = tokenProvider.getAuthentication(tokenDto.getRefreshtoken());
            TokenDto refreshtokenDto = tokenProvider.refreshToken(authentication, tokenDto.getRefreshtoken());

            return new ResponseEntity<>(refreshtokenDto, HttpStatus.CREATED);
        }

        return new ResponseEntity<>(tokenDto, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<ResponseDto> authSignup(@RequestBody @Valid SignupDto signupDto,
                                                  Errors errors) {
        HashMap<String, Object> response = new HashMap<>();
        if (errors.hasErrors()) {
            response.put("required", errors);
            return badRequest(errorHandler.buildError(ErrorCode.JSON_MAPPING_INVALID, response));
        }

        UserDetailsService userDetailsService = (UserDetailsService) memberService;
        try {
            UserDetails userDetails = userDetailsService.loadUserByUsername(signupDto.getUsername());

            if (signupDto.getUsername().equals(userDetails.getUsername())) {
                return unprocessableEntity(errorHandler.buildError(ErrorCode.SIGNUP_USERNAME_VALUE_INVALID, response));
            }

            // <-- 이메일 처리를 추가로 해야됨...!!!

            return unprocessableEntity(errorHandler.buildError(ErrorCode.SIGNUP_EMAIL_VALUE_INVALID, response));

        } catch (UsernameNotFoundException e) {

            memberValidator.validate(signupDto, errors);
            if (errors.hasErrors()) {
                response.put("required", errors);
                return badRequest(errorHandler.buildError(ErrorCode.JSON_MAPPING_INVALID, response));
            }

            memberService.signup(signupDto);  // 회원가입

            return new ResponseEntity(new ResponseDto(HttpStatus.OK.value(), "회원가입이 완료되었습니다"), HttpStatus.OK);
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
            return ResponseEntity.ok(new CsrfDto(csrf.getToken()));
        }
        return new ResponseEntity(new ResponseDto(HttpStatus.NOT_FOUND.value(), "CSRF Token이 존재하지 않습니다."), HttpStatus.NOT_FOUND); }

    private ResponseEntity badRequest(ErrorResponse response) {
        return ResponseEntity.badRequest().body(response);
    }

    private ResponseEntity unprocessableEntity(ErrorResponse response) {
        return ResponseEntity.unprocessableEntity().body(response);
    }
}
