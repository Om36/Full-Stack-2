package com.example.securityjwt.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

class CustomUserDetailsServiceTest {

    private CustomUserDetailsService userDetailsService;
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        passwordEncoder = new BCryptPasswordEncoder();
        userDetailsService = new CustomUserDetailsService(passwordEncoder);
    }

    @Test
    void loadUserByUsername_shouldReturnAdminUser() {
        UserDetails admin = userDetailsService.loadUserByUsername("admin");

        assertThat(admin.getUsername()).isEqualTo("admin");
        assertThat(passwordEncoder.matches("adminpass", admin.getPassword())).isTrue();
        assertThat(admin.getAuthorities()).extracting("authority").containsExactlyInAnyOrder("ROLE_ADMIN", "ROLE_USER");
    }

    @Test
    void loadUserByUsername_shouldThrowWhenUserDoesNotExist() {
        assertThatThrownBy(() -> userDetailsService.loadUserByUsername("missing"))
                .isInstanceOf(UsernameNotFoundException.class)
                .hasMessageContaining("User not found");
    }

    @Test
    void userExists_shouldReturnTrueForExistingUserAndFalseForMissingUser() {
        assertThat(userDetailsService.userExists("user")).isTrue();
        assertThat(userDetailsService.userExists("newuser")).isFalse();
    }

    @Test
    void registerUser_shouldAddNewUserWithUserRole() {
        userDetailsService.registerUser("newuser", "password123", passwordEncoder);

        UserDetails created = userDetailsService.loadUserByUsername("newuser");
        assertThat(created.getUsername()).isEqualTo("newuser");
        assertThat(passwordEncoder.matches("password123", created.getPassword())).isTrue();
        assertThat(created.getAuthorities()).extracting("authority").containsExactly("ROLE_USER");
    }

    @Test
    void registerUser_shouldThrowWhenUsernameAlreadyExists() {
        assertThatThrownBy(() -> userDetailsService.registerUser("admin", "anotherpass", passwordEncoder))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Username already exists");
    }
}
