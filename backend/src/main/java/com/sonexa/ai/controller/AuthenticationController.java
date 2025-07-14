package com.sonexa.ai.controller;

import com.sonexa.ai.dto.auth.AuthenticationRequest;
import com.sonexa.ai.dto.auth.AuthenticationResponse;
import com.sonexa.ai.dto.auth.RegisterRequest;
import com.sonexa.ai.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Authentication Controller
 * 
 * This controller handles authentication-related endpoints for the Sonexa AI system.
 * 
 * Endpoints:
 * - POST /api/auth/register - User registration
 * - POST /api/auth/login - User authentication
 * - POST /api/auth/refresh - Token refresh
 * 
 * Features:
 * - Input validation
 * - Comprehensive error handling
 * - JWT token management
 * - CORS configuration
 * 
 * @author Sonexa AI Team
 * @version 1.0.0
 * @since 2025-01-13
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "https://sonexa-ai.vercel.app"})
public class AuthenticationController {
    
    private final AuthenticationService authenticationService;
    
    /**
     * Register a new user
     * 
     * @param request registration request
     * @return authentication response with JWT token
     */
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @Valid @RequestBody RegisterRequest request
    ) {
        log.info("Registration request received for email: {}", request.getEmail());
        
        try {
            AuthenticationResponse response = authenticationService.register(request);
            log.info("User registered successfully: {}", request.getEmail());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            log.warn("Registration failed for email: {} - {}", request.getEmail(), e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } catch (Exception e) {
            log.error("Registration error for email: {}", request.getEmail(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Authenticate existing user
     * 
     * @param request authentication request
     * @return authentication response with JWT token
     */
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @Valid @RequestBody AuthenticationRequest request
    ) {
        log.info("Authentication request received for email: {}", request.getEmail());
        
        try {
            AuthenticationResponse response = authenticationService.authenticate(request);
            log.info("User authenticated successfully: {}", request.getEmail());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.warn("Authentication failed for email: {} - {}", request.getEmail(), e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    
    /**
     * Refresh access token
     * 
     * @param refreshToken refresh token
     * @return new authentication response
     */
    @PostMapping("/refresh")
    public ResponseEntity<AuthenticationResponse> refreshToken(
            @RequestBody String refreshToken
    ) {
        log.info("Token refresh request received");
        
        try {
            AuthenticationResponse response = authenticationService.refreshToken(refreshToken);
            log.info("Token refreshed successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.warn("Token refresh failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    
    /**
     * Check if email exists
     * 
     * @param email email to check
     * @return true if exists, false otherwise
     */
    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        log.info("Email check request for: {}", email);
        boolean exists = authenticationService.existsByEmail(email);
        return ResponseEntity.ok(exists);
    }
    
    /**
     * Health check endpoint
     * 
     * @return authentication service status
     */
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Authentication service is running");
    }
}
