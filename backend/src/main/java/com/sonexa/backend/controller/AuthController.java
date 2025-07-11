package com.sonexa.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sonexa.backend.dto.AuthRequest;
import com.sonexa.backend.dto.AuthResponse;
import com.sonexa.backend.dto.RegisterRequest;
import com.sonexa.backend.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        String token = userService.register(request);
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        Optional<String> token = userService.authenticate(request);
        if (token.isPresent()) {
            return ResponseEntity.ok(new AuthResponse(token.get()));
        } else {
            return ResponseEntity.status(401).body(null);
        }
    }
}
