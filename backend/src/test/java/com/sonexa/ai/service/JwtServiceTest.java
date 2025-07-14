package com.sonexa.ai.service;

import com.sonexa.ai.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.util.ReflectionTestUtils;

import javax.crypto.SecretKey;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Unit Tests for JWT Service
 * 
 * This test class provides comprehensive testing for the JwtService
 * including token generation, validation, and claim extraction.
 * 
 * Test Coverage:
 * - Token generation and validation
 * - Username extraction
 * - Expiration handling
 * - Custom claims
 * - Token structure validation
 * 
 * @author Sonexa AI Team
 * @version 1.0.0
 * @since 2025-01-13
 */
@DisplayName("JWT Service Tests")
class JwtServiceTest {
    
    private JwtService jwtService;
    private UserDetails userDetails;
    private final String testSecretKey = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";
    private final long testExpiration = 86400000L; // 24 hours
    private final long testRefreshExpiration = 604800000L; // 7 days
    
    @BeforeEach
    void setUp() {
        jwtService = new JwtService();
        
        // Set test values using reflection to avoid Spring context
        ReflectionTestUtils.setField(jwtService, "secretKey", testSecretKey);
        ReflectionTestUtils.setField(jwtService, "jwtExpiration", testExpiration);
        ReflectionTestUtils.setField(jwtService, "refreshExpiration", testRefreshExpiration);
        
        // Create test user
        userDetails = User.builder()
                .id(1L)
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .password("encodedPassword")
                .role(User.Role.USER)
                .enabled(true)
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }
    
    @Test
    @DisplayName("Should generate token successfully")
    void shouldGenerateTokenSuccessfully() {
        // When
        String token = jwtService.generateToken(userDetails);
        
        // Then
        assertThat(token).isNotNull();
        assertThat(token).isNotEmpty();
        assertThat(token.split("\\.")).hasSize(3); // JWT should have 3 parts separated by dots
    }
    
    @Test
    @DisplayName("Should extract username from token")
    void shouldExtractUsernameFromToken() {
        // Given
        String token = jwtService.generateToken(userDetails);
        
        // When
        String extractedUsername = jwtService.extractUsername(token);
        
        // Then
        assertThat(extractedUsername).isEqualTo("john.doe@example.com");
    }
    
    @Test
    @DisplayName("Should generate token with extra claims")
    void shouldGenerateTokenWithExtraClaims() {
        // Given
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("customClaim", "customValue");
        extraClaims.put("userId", 1L);
        
        // When
        String token = jwtService.generateToken(extraClaims, userDetails);
        
        // Then
        assertThat(token).isNotNull();
        assertThat(token).isNotEmpty();
        
        // Verify custom claims
        Claims claims = extractClaimsForTest(token);
        assertThat(claims.get("customClaim")).isEqualTo("customValue");
        assertThat(claims.get("userId")).isEqualTo(1);
    }
    
    @Test
    @DisplayName("Should validate token correctly")
    void shouldValidateTokenCorrectly() {
        // Given
        String token = jwtService.generateToken(userDetails);
        
        // When
        boolean isValid = jwtService.isTokenValid(token, userDetails);
        
        // Then
        assertThat(isValid).isTrue();
    }
    
    @Test
    @DisplayName("Should reject token for different user")
    void shouldRejectTokenForDifferentUser() {
        // Given
        String token = jwtService.generateToken(userDetails);
        
        UserDetails differentUser = User.builder()
                .id(2L)
                .firstName("Jane")
                .lastName("Smith")
                .email("jane.smith@example.com")
                .password("encodedPassword")
                .role(User.Role.USER)
                .enabled(true)
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        
        // When
        boolean isValid = jwtService.isTokenValid(token, differentUser);
        
        // Then
        assertThat(isValid).isFalse();
    }
    
    @Test
    @DisplayName("Should generate refresh token")
    void shouldGenerateRefreshToken() {
        // When
        String refreshToken = jwtService.generateRefreshToken(userDetails);
        
        // Then
        assertThat(refreshToken).isNotNull();
        assertThat(refreshToken).isNotEmpty();
        assertThat(refreshToken.split("\\.")).hasSize(3);
    }
    
    @Test
    @DisplayName("Should return correct expiration time")
    void shouldReturnCorrectExpirationTime() {
        // When
        long expirationTime = jwtService.getExpirationTime();
        long refreshExpirationTime = jwtService.getRefreshExpirationTime();
        
        // Then
        assertThat(expirationTime).isEqualTo(testExpiration);
        assertThat(refreshExpirationTime).isEqualTo(testRefreshExpiration);
    }
    
    @Test
    @DisplayName("Should extract expiration date from token")
    void shouldExtractExpirationDateFromToken() {
        // Given
        String token = jwtService.generateToken(userDetails);
        
        // When
        Claims claims = extractClaimsForTest(token);
        
        // Then
        assertThat(claims.getExpiration()).isNotNull();
        assertThat(claims.getExpiration()).isAfter(new java.util.Date());
    }
    
    @Test
    @DisplayName("Should extract subject from token")
    void shouldExtractSubjectFromToken() {
        // Given
        String token = jwtService.generateToken(userDetails);
        
        // When
        Claims claims = extractClaimsForTest(token);
        
        // Then
        assertThat(claims.getSubject()).isEqualTo("john.doe@example.com");
    }
    
    @Test
    @DisplayName("Should extract issued at from token")
    void shouldExtractIssuedAtFromToken() {
        // Given
        long beforeTokenGeneration = System.currentTimeMillis();
        String token = jwtService.generateToken(userDetails);
        long afterTokenGeneration = System.currentTimeMillis();
        
        // When
        Claims claims = extractClaimsForTest(token);
        
        // Then
        assertThat(claims.getIssuedAt()).isNotNull();
        long issuedAtTime = claims.getIssuedAt().getTime();
        assertThat(issuedAtTime).isBetween(beforeTokenGeneration, afterTokenGeneration);
    }
    
    /**
     * Helper method to extract claims for testing purposes
     * This duplicates some logic from JwtService but is necessary for testing
     */
    private Claims extractClaimsForTest(String token) {
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(testSecretKey));
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
