package com.example.securityjwt.config;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.util.ReflectionTestUtils;

class JwtTokenProviderTest {

    private JwtTokenProvider tokenProvider;

    @BeforeEach
    void setUp() {
        tokenProvider = new JwtTokenProvider();
        ReflectionTestUtils.setField(tokenProvider, "jwtSecret", "test-secret-key");
        ReflectionTestUtils.setField(tokenProvider, "jwtExpirationMs", 3600000L);
    }

    @Test
    void generateToken_shouldCreateValidJwtToken() {
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                "admin", null, List.of(
                        new SimpleGrantedAuthority("ROLE_ADMIN"),
                        new SimpleGrantedAuthority("ROLE_USER")));

        String token = tokenProvider.generateToken(authentication);

        assertThat(token).isNotBlank();
        assertThat(tokenProvider.validateToken(token)).isTrue();
        assertThat(tokenProvider.getUsernameFromToken(token)).isEqualTo("admin");
        assertThat(tokenProvider.getAuthoritiesFromToken(token))
                .extracting("authority")
                .containsExactlyInAnyOrder("ROLE_ADMIN", "ROLE_USER");
    }

    @Test
    void validateToken_shouldReturnFalseForInvalidToken() {
        assertThat(tokenProvider.validateToken("invalid-token")).isFalse();
    }

    @Test
    void getAuthoritiesFromToken_shouldReturnEmptyListWhenRolesClaimIsBlank() {
        Authentication authentication = new UsernamePasswordAuthenticationToken("nobody", null, List.of());
        String token = tokenProvider.generateToken(authentication);

        assertThat(tokenProvider.getAuthoritiesFromToken(token)).isEmpty();
    }

    @Test
    void getUsernameFromToken_shouldThrowWhenTokenIsInvalid() {
        assertThatThrownBy(() -> tokenProvider.getUsernameFromToken("invalid-token"))
                .isInstanceOf(Exception.class);
    }
}
