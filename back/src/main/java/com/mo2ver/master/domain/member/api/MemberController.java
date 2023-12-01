package com.mo2ver.master.domain.member.api;

import com.mo2ver.master.domain.member.service.MemberService;
import com.mo2ver.master.domain.member.dto.LoginDto;
import com.mo2ver.master.domain.member.dto.SignupDto;
import com.mo2ver.master.domain.member.validation.AuthValidator;
import com.mo2ver.master.global.common.dto.ResponseDto;
import com.mo2ver.master.global.error.service.ErrorService;
import com.mo2ver.master.global.error.domain.ErrorCode;
import com.mo2ver.master.global.error.api.ErrorResponse;
import com.mo2ver.master.global.jwt.TokenProvider;
import com.mo2ver.master.global.jwt.dto.TokenDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;

@Controller
@RequestMapping(value = "/member")
public class MemberController {

    private final MemberService memberService;
    private final ErrorService errorService;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final AuthValidator authValidator;

    public MemberController(MemberService memberService, TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder, AuthValidator authValidator, ErrorService errorService) {
        this.memberService = memberService;
        this.errorService = errorService;
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.authValidator = authValidator;
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> authLogin(@RequestBody @Valid LoginDto loginDto,
                                              Errors errors) {
        HashMap<String, Object> response = new HashMap<>();
        if (errors.hasErrors()) {
            response.put("required", errors);
            return badRequest(errorService.buildError(ErrorCode.JSON_MAPPING_INVALID, response));
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
            return badRequest(errorService.buildError(ErrorCode.JSON_MAPPING_INVALID, response));
        }

        // Refresh Token - Expired
        if (!tokenProvider.validateToken(tokenDto.getRefreshtoken())) {
            return new ResponseEntity(new ResponseDto(HttpStatus.FORBIDDEN.value(), "Refresh Token이 유효하지 않습니다."), HttpStatus.FORBIDDEN);
        }

        // Access Token - Expired
        if (!tokenProvider.validateToken(tokenDto.getAccesstoken())) {
            Authentication authentication = tokenProvider.getAuthentication(tokenDto.getRefreshtoken());
            TokenDto refreshtokenDto = tokenProvider.refreshToken(authentication, tokenDto.getRefreshtoken());

            return new ResponseEntity<>(refreshtokenDto, HttpStatus.OK);
        }

        return new ResponseEntity<>(tokenDto, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<ResponseDto> authSignup(@RequestBody @Valid SignupDto signupDto,
                                                  Errors errors) {
        HashMap<String, Object> response = new HashMap<>();
        if (errors.hasErrors()) {
            response.put("required", errors);
            return badRequest(errorService.buildError(ErrorCode.JSON_MAPPING_INVALID, response));
        }

        UserDetailsService userDetailsService = (UserDetailsService) memberService;
        try {
            UserDetails userDetails = userDetailsService.loadUserByUsername(signupDto.getEmail());

            if (signupDto.getUsername().equals(userDetails.getUsername())) {
                return unprocessableEntity(errorService.buildError(ErrorCode.SIGNUP_USERNAME_VALUE_INVALID, response));
            }

            // <-- 이메일 처리를 추가로 해야됨...!!!

            return unprocessableEntity(errorService.buildError(ErrorCode.SIGNUP_EMAIL_VALUE_INVALID, response));

        } catch (UsernameNotFoundException e) {

            authValidator.validate(signupDto, errors);
            if (errors.hasErrors()) {
                response.put("required", errors);
                return badRequest(errorService.buildError(ErrorCode.JSON_MAPPING_INVALID, response));
            }

            memberService.signup(signupDto);  // 회원가입

            return new ResponseEntity(new ResponseDto(HttpStatus.OK.value(), "회원가입이 완료되었습니다"), HttpStatus.OK);
        }
    }

    @GetMapping("csrf-token")
    public ResponseEntity<ResponseDto> csrtToken() { return new ResponseEntity(new ResponseDto(HttpStatus.CREATED.value(), "CSRF Token이 생성되었습니다."), HttpStatus.CREATED); }

    private ResponseEntity badRequest(ErrorResponse response) {
        return ResponseEntity.badRequest().body(response);
    }

    private ResponseEntity unprocessableEntity(ErrorResponse response) {
        return ResponseEntity.unprocessableEntity().body(response);
    }
}