package com.mo2ver.web.global.jwt;

import com.mo2ver.web.domain.member.service.MemberService;
import com.mo2ver.web.global.common.properties.JwtProperties;
import com.mo2ver.web.global.jwt.dto.TokenInfo;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TokenProvider implements InitializingBean {

    private final Logger logger = LoggerFactory.getLogger(TokenProvider.class);

    private static final String AUTHORITIES_KEY = "auth";

    private final MemberService memberService;
    private final JwtProperties jwtProperties;

    // 호출순서 : Constructor -> postConstruct -> afterPropertiesSet -> init

    // KeySigning 생성자
    private Key signkey;

    @Override
    public void afterPropertiesSet() {
        this.signkey = Keys.hmacShaKeyFor(jwtProperties.getJwtSecret().getBytes(StandardCharsets.UTF_8));
    }

    public TokenInfo createToken(Authentication authentication) {
        String accesstoken = createAccessToken(authentication);
        String refreshtoken = createRefreshToken(authentication);

        return TokenInfo.builder()
                .username(authentication.getName())
                .accesstoken(accesstoken)
                .refreshtoken(refreshtoken)
                .build();
    }

    public TokenInfo refreshToken(Authentication authentication, String refreshtoken) {
        String accesstoken = createAccessToken(authentication);

        return TokenInfo.builder()
                .username(authentication.getName())
                .accesstoken(accesstoken)
                .refreshtoken(refreshtoken)
                .build();
    }

    public String createAccessToken(Authentication authentication) {
        return doGenerateToken(authentication, "access", jwtProperties.getJwtAccesstokenValidationSecond() * 1000L);
    }

    public String createRefreshToken(Authentication authentication) {
        return doGenerateToken(authentication, "refresh", jwtProperties.getJwtRefreshtokenValidationSecond() * 1000L);
    }

    public String doGenerateToken(Authentication authentication, String tokenType, long tokenValidityInMilliseconds) {

        long now = (new Date()).getTime();
        Date validity = new Date(now + tokenValidityInMilliseconds);

        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        Claims claims = Jwts.claims();
        claims.put("vendor", "mo2ver");
        claims.put("username", authentication.getName());
        claims.put(tokenType, tokenType);
        claims.put(AUTHORITIES_KEY, authorities);  // USER, MANAGER, ADMIN

        return Jwts.builder()
                .setClaims(claims)
                .signWith(signkey, SignatureAlgorithm.HS256)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(validity)
                .compact();
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(signkey)
                .build()
                .parseClaimsJws(token)
                .getBody();

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        UserDetailsService userDetailsService = (UserDetailsService) memberService;
        UserDetails userDetails = userDetailsService.loadUserByUsername((String)claims.get("username"));

        return new UsernamePasswordAuthenticationToken(userDetails, token, authorities);
    }

    public boolean validateToken(String token, boolean isException) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(signkey)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            logger.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            logger.info("만료된 JWT 토큰입니다.");
            if(isException) throw new ExpiredJwtException(null, null, e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            logger.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }
}
