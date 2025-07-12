package com.sonexa.backend.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        logger.info("Registration attempt for email: {}", request.getEmail());

        try {
            // Input validation
            if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
                logger.warn("Registration failed: Email is required");
                return ResponseEntity.status(400).body(createErrorResponse("EMAIL_REQUIRED", "Email is required"));
            }

            if (request.getPassword() == null || request.getPassword().length() < 6) {
                logger.warn("Registration failed: Password must be at least 6 characters for email: {}", request.getEmail());
                return ResponseEntity.status(400).body(createErrorResponse("PASSWORD_TOO_SHORT", "Password must be at least 6 characters"));
            }

            // Attempt registration
            UserService.AuthResult authResult = userService.registerWithUser(request);
            logger.info("Registration successful for email: {}", request.getEmail());
            return ResponseEntity.ok(new AuthResponse(authResult.getToken(), authResult.getUser()));

        } catch (Exception e) {
            logger.error("Registration failed for email: {} - Error: {}", request.getEmail(), e.getMessage(), e);

            // Check specific error types
            if (e.getMessage() != null) {
                if (e.getMessage().contains("Unique index") || e.getMessage().contains("email")) {
                    return ResponseEntity.status(409).body(createErrorResponse("EMAIL_EXISTS", "Email already exists"));
                }
                if (e.getMessage().contains("database") || e.getMessage().contains("connection")) {
                    return ResponseEntity.status(503).body(createErrorResponse("DATABASE_ERROR", "Database connection error"));
                }
            }

            // Generic error for any other exception
            return ResponseEntity.status(500).body(createErrorResponse("REGISTRATION_FAILED", "Registration failed: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        logger.info("Login attempt for email: {}", request.getEmail());

        try {
            // Input validation
            if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
                logger.warn("Login failed: Email is required");
                return ResponseEntity.status(400).body(createErrorResponse("EMAIL_REQUIRED", "Email is required"));
            }

            if (request.getPassword() == null || request.getPassword().isEmpty()) {
                logger.warn("Login failed: Password is required for email: {}", request.getEmail());
                return ResponseEntity.status(400).body(createErrorResponse("PASSWORD_REQUIRED", "Password is required"));
            }

            // Attempt authentication
            Optional<UserService.AuthResult> authResult = userService.authenticateWithUser(request);

            if (authResult.isPresent()) {
                logger.info("Login successful for email: {}", request.getEmail());
                UserService.AuthResult result = authResult.get();
                return ResponseEntity.ok(new AuthResponse(result.getToken(), result.getUser()));
            } else {
                logger.warn("Login failed: Invalid credentials for email: {}", request.getEmail());
                return ResponseEntity.status(401).body(createErrorResponse("INVALID_CREDENTIALS", "Invalid email or password"));
            }

        } catch (Exception e) {
            logger.error("Login failed for email: {} - Error: {}", request.getEmail(), e.getMessage(), e);

            // Check specific error types
            if (e.getMessage() != null) {
                if (e.getMessage().contains("database") || e.getMessage().contains("connection")) {
                    return ResponseEntity.status(503).body(createErrorResponse("DATABASE_ERROR", "Database connection error"));
                }
                if (e.getMessage().contains("User not found")) {
                    return ResponseEntity.status(401).body(createErrorResponse("USER_NOT_FOUND", "User not found"));
                }
            }

            // Generic error for any other exception
            return ResponseEntity.status(500).body(createErrorResponse("LOGIN_FAILED", "Login failed: " + e.getMessage()));
        }
    }

    private Map<String, Object> createErrorResponse(String errorCode, String message) {
        Map<String, Object> error = new HashMap<>();
        error.put("error", errorCode);
        error.put("message", message);
        error.put("timestamp", System.currentTimeMillis());
        return error;
    }
}
