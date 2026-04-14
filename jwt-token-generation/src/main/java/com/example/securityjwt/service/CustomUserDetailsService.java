package com.example.securityjwt.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final Map<String, UserDetails> users = new HashMap<>();

    public CustomUserDetailsService(PasswordEncoder passwordEncoder) {
        users.put("admin", User.withUsername("admin")
                .password(passwordEncoder.encode("adminpass"))
                .roles("ADMIN", "USER")
                .build());
        users.put("user", User.withUsername("user")
                .password(passwordEncoder.encode("userpass"))
                .roles("USER")
                .build());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDetails user = users.get(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }
        return user;
    }

    public boolean userExists(String username) {
        return users.containsKey(username);
    }

    public void registerUser(String username, String rawPassword, PasswordEncoder passwordEncoder) {
        if (users.containsKey(username)) {
            throw new IllegalArgumentException("Username already exists");
        }
        users.put(username, User.withUsername(username)
                .password(passwordEncoder.encode(rawPassword))
                .roles("USER")
                .build());
    }
}
