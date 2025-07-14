package com.sonexa.ai.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Authentication Response DTO
 * 
 * This DTO represents the response data returned after successful
 * authentication in the Sonexa AI authentication system.
 * 
 * Features:
 * - JWT access and refresh tokens
 * - Token metadata (type, expiration)
 * - User information
 * 
 * @author Sonexa AI Team
 * @version 1.0.0
 * @since 2025-01-13
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    
    private String accessToken;
    private String refreshToken;
    private String tokenType;
    private Long expiresIn;
    private UserResponse user;
    
    /**
     * User Response DTO for authentication response
     */
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserResponse {
        private Long id;
        private String email;
        private String firstName;
        private String lastName;
        private String role;
        private LocalDateTime createdAt;
    }
}
