package com.example.demo.controller;

import com.example.demo.model.UserDto;
import com.example.demo.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final JwtUtil jwtUtil;

    public ApiController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/public/products")
    public List<Map<String, Object>> getPublicProducts() {
        List<Map<String, Object>> products = new ArrayList<>();
        products.add(Map.of("id", 101, "name", "Wireless Mouse", "price", 25.00));
        products.add(Map.of("id", 102, "name", "Bluetooth Speaker", "price", 49.99));
        products.add(Map.of("id", 103, "name", "USB-C Hub", "price", 34.95));
        return products;
    }

    @PostMapping("/public/register")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody UserDto userDto) {
        if (userDto.getUsername() == null || userDto.getUsername().isBlank()) {
            return badRequest("Username is required");
        }
        if (userDto.getEmail() == null || userDto.getEmail().isBlank()) {
            return badRequest("Email is required");
        }
        if (userDto.getPassword() == null || userDto.getPassword().length() < 6) {
            return badRequest("Password must be at least 6 characters");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "User registered successfully.");
        response.put("username", userDto.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody UserDto loginRequest) {
        if (loginRequest.getUsername() == null || loginRequest.getUsername().isBlank()
                || loginRequest.getPassword() == null || loginRequest.getPassword().isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Username and password are required"));
        }

        // Demo login: accept any non-empty credentials
        String token = jwtUtil.generateToken(loginRequest.getUsername());
        return ResponseEntity.ok(Map.of("token", token));
    }

    @GetMapping("/protected/orders")
    public List<Map<String, Object>> getProtectedOrders() {
        List<Map<String, Object>> orders = new ArrayList<>();
        orders.add(Map.of("orderId", 1001, "item", "Keyboard", "quantity", 1, "status", "Processing"));
        orders.add(Map.of("orderId", 1002, "item", "Monitor", "quantity", 2, "status", "Shipped"));
        return orders;
    }

    private ResponseEntity<Map<String, Object>> badRequest(String message) {
        return ResponseEntity.badRequest().body(Map.of("status", "error", "message", message));
    }
}
