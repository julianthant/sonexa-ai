package com.sonexa.ai.service;

import com.sonexa.ai.dto.auth.AuthenticationRequest;
import com.sonexa.ai.dto.auth.AuthenticationResponse;
import com.sonexa.ai.dto.auth.RegisterRequest;
import com.sonexa.ai.entity.User;
import com.sonexa.ai.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Authentication Service for User Management
 * 
 * This service handles user registration, authentication, and token management
 * for the Sonexa AI authentication system.
 * 
 * Features:
 * - User registration with validation
 * - User authentication with JWT tokens
 * - Password encryption
 * - Duplicate email prevention
 * 
 * @author Sonexa AI Team
 * @version 1.0.0
 * @since 2025-01-13
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    
    /**
     * Register a new user
     * 
     * @param request registration request
     * @return authentication response with JWT token
     * @throws IllegalArgumentException if email already exists
     */
    @Transactional
    public AuthenticationResponse register(RegisterRequest request) {
        log.info("Registering new user with email: {}", request.getEmail());
        
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }
        
        // Create new user
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(User.Role.USER)
                .build();
        
        // Save user
        var savedUser = userRepository.save(user);
        log.info("User registered successfully with ID: {}", savedUser.getId());
        
        // Generate tokens
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .expiresIn(jwtService.getExpirationTime())
                .user(mapToUserResponse(savedUser))
                .build();
    }
    
    /**
     * Authenticate existing user
     * 
     * @param request authentication request
     * @return authentication response with JWT token
     * @throws AuthenticationException if credentials are invalid
     */
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        log.info("Authenticating user with email: {}", request.getEmail());
        
        // Authenticate user
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        
        // Find user
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        log.info("User authenticated successfully: {}", user.getEmail());
        
        // Generate tokens
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .expiresIn(jwtService.getExpirationTime())
                .user(mapToUserResponse(user))
                .build();
    }
    
    /**
     * Refresh access token
     * 
     * @param refreshToken refresh token
     * @return new authentication response
     * @throws IllegalArgumentException if refresh token is invalid
     */
    public AuthenticationResponse refreshToken(String refreshToken) {
        log.info("Refreshing access token");
        
        // Extract username from refresh token
        final String userEmail = jwtService.extractUsername(refreshToken);
        
        if (userEmail != null) {
            // Find user
            var user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));
            
            // Validate refresh token
            if (jwtService.isTokenValid(refreshToken, user)) {
                // Generate new access token
                var accessToken = jwtService.generateToken(user);
                
                log.info("Access token refreshed for user: {}", user.getEmail());
                
                return AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .tokenType("Bearer")
                        .expiresIn(jwtService.getExpirationTime())
                        .user(mapToUserResponse(user))
                        .build();
            }
        }
        
        throw new IllegalArgumentException("Invalid refresh token");
    }
    
    /**
     * Get user by email
     * 
     * @param email user email
     * @return user entity
     */
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));
    }
    
    /**
     * Check if email exists
     * 
     * @param email email to check
     * @return true if exists, false otherwise
     */
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    
    /**
     * Map User entity to UserResponse DTO
     * 
     * @param user user entity
     * @return user response DTO
     */
    private AuthenticationResponse.UserResponse mapToUserResponse(User user) {
        return AuthenticationResponse.UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole().name())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
