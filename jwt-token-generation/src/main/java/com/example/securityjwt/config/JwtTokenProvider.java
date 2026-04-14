package com.example.securityjwt.config;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration-ms}")
    private long jwtExpirationMs;

    public String generateToken(Authentication authentication) {
        var userPrincipal = authentication.getName();
        var authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        return JWT.create()
                .withSubject(userPrincipal)
                .withClaim("roles", authorities)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .sign(getAlgorithm());
    }

    public String getUsernameFromToken(String token) {
        return getDecodedJWT(token).getSubject();
    }

    public List<SimpleGrantedAuthority> getAuthoritiesFromToken(String token) {
        String claimValue = getDecodedJWT(token).getClaim("roles").asString();
        if (claimValue == null || claimValue.isBlank()) {
            return List.of();
        }
        return Arrays.stream(claimValue.split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    public boolean validateToken(String token) {
        try {
            getDecodedJWT(token);
            return true;
        } catch (JWTVerificationException ex) {
            return false;
        }
    }

    private DecodedJWT getDecodedJWT(String token) {
        return JWT.require(getAlgorithm())
                .build()
                .verify(token);
    }

    private Algorithm getAlgorithm() {
        return Algorithm.HMAC256(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }
}
