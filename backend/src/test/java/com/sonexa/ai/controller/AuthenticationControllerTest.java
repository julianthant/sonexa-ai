package com.sonexa.ai.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sonexa.ai.dto.auth.AuthenticationRequest;
import com.sonexa.ai.dto.auth.AuthenticationResponse;
import com.sonexa.ai.dto.auth.RegisterRequest;
import com.sonexa.ai.service.AuthenticationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Unit Tests for Authentication Controller
 * 
 * This test class provides comprehensive testing for the AuthenticationController
 * including all REST endpoints and error handling scenarios.
 * 
 * Test Coverage:
 * - Registration endpoint
 * - Login endpoint
 * - Token refresh endpoint
 * - Email check endpoint
 * - Health check endpoint
 * - Validation and error handling
 * 
 * @author Sonexa AI Team
 * @version 1.0.0
 * @since 2025-01-13
 */
@WebMvcTest(AuthenticationController.class)
@DisplayName("Authentication Controller Tests")
class AuthenticationControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private AuthenticationService authenticationService;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    private RegisterRequest registerRequest;
    private AuthenticationRequest authenticationRequest;
    private AuthenticationResponse authenticationResponse;
    
    @BeforeEach
    void setUp() {
        registerRequest = RegisterRequest.builder()
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .password("password123")
                .build();
        
        authenticationRequest = AuthenticationRequest.builder()
                .email("john.doe@example.com")
                .password("password123")
                .build();
        
        AuthenticationResponse.UserResponse userResponse = AuthenticationResponse.UserResponse.builder()
                .id(1L)
                .email("john.doe@example.com")
                .firstName("John")
                .lastName("Doe")
                .role("USER")
                .createdAt(LocalDateTime.now())
                .build();
        
        authenticationResponse = AuthenticationResponse.builder()
                .accessToken("access-token")
                .refreshToken("refresh-token")
                .tokenType("Bearer")
                .expiresIn(86400000L)
                .user(userResponse)
                .build();
    }
    
    @Test
    @DisplayName("Should register user successfully")
    void shouldRegisterUserSuccessfully() throws Exception {
        // Given
        when(authenticationService.register(any(RegisterRequest.class)))
                .thenReturn(authenticationResponse);
        
        // When & Then
        mockMvc.perform(post("/api/auth/register")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.accessToken").value("access-token"))
                .andExpect(jsonPath("$.refreshToken").value("refresh-token"))
                .andExpect(jsonPath("$.tokenType").value("Bearer"))
                .andExpect(jsonPath("$.user.email").value("john.doe@example.com"));
    }
    
    @Test
    @DisplayName("Should return conflict when email already exists")
    void shouldReturnConflictWhenEmailAlreadyExists() throws Exception {
        // Given
        when(authenticationService.register(any(RegisterRequest.class)))
                .thenThrow(new IllegalArgumentException("Email already registered"));
        
        // When & Then
        mockMvc.perform(post("/api/auth/register")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isConflict());
    }
    
    @Test
    @DisplayName("Should return bad request for invalid registration data")
    void shouldReturnBadRequestForInvalidRegistrationData() throws Exception {
        // Given
        RegisterRequest invalidRequest = RegisterRequest.builder()
                .firstName("") // Invalid: empty first name
                .lastName("Doe")
                .email("invalid-email") // Invalid: bad email format
                .password("123") // Invalid: too short password
                .build();
        
        // When & Then
        mockMvc.perform(post("/api/auth/register")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());
    }
    
    @Test
    @DisplayName("Should authenticate user successfully")
    void shouldAuthenticateUserSuccessfully() throws Exception {
        // Given
        when(authenticationService.authenticate(any(AuthenticationRequest.class)))
                .thenReturn(authenticationResponse);
        
        // When & Then
        mockMvc.perform(post("/api/auth/login")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(authenticationRequest)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.accessToken").value("access-token"))
                .andExpect(jsonPath("$.refreshToken").value("refresh-token"))
                .andExpect(jsonPath("$.user.email").value("john.doe@example.com"));
    }
    
    @Test
    @DisplayName("Should return unauthorized for invalid credentials")
    void shouldReturnUnauthorizedForInvalidCredentials() throws Exception {
        // Given
        when(authenticationService.authenticate(any(AuthenticationRequest.class)))
                .thenThrow(new RuntimeException("Invalid credentials"));
        
        // When & Then
        mockMvc.perform(post("/api/auth/login")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(authenticationRequest)))
                .andExpect(status().isUnauthorized());
    }
    
    @Test
    @DisplayName("Should return bad request for invalid login data")
    void shouldReturnBadRequestForInvalidLoginData() throws Exception {
        // Given
        AuthenticationRequest invalidRequest = AuthenticationRequest.builder()
                .email("invalid-email") // Invalid: bad email format
                .password("") // Invalid: empty password
                .build();
        
        // When & Then
        mockMvc.perform(post("/api/auth/login")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());
    }
    
    @Test
    @DisplayName("Should refresh token successfully")
    void shouldRefreshTokenSuccessfully() throws Exception {
        // Given
        when(authenticationService.refreshToken(anyString()))
                .thenReturn(authenticationResponse);
        
        // When & Then
        mockMvc.perform(post("/api/auth/refresh")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("refresh-token"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.accessToken").value("access-token"));
    }
    
    @Test
    @DisplayName("Should return unauthorized for invalid refresh token")
    void shouldReturnUnauthorizedForInvalidRefreshToken() throws Exception {
        // Given
        when(authenticationService.refreshToken(anyString()))
                .thenThrow(new IllegalArgumentException("Invalid refresh token"));
        
        // When & Then
        mockMvc.perform(post("/api/auth/refresh")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("invalid-refresh-token"))
                .andExpect(status().isUnauthorized());
    }
    
    @Test
    @DisplayName("Should check email existence successfully")
    void shouldCheckEmailExistenceSuccessfully() throws Exception {
        // Given
        when(authenticationService.existsByEmail("existing@example.com")).thenReturn(true);
        when(authenticationService.existsByEmail("nonexistent@example.com")).thenReturn(false);
        
        // When & Then - Existing email
        mockMvc.perform(get("/api/auth/check-email")
                        .param("email", "existing@example.com"))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
        
        // When & Then - Non-existing email
        mockMvc.perform(get("/api/auth/check-email")
                        .param("email", "nonexistent@example.com"))
                .andExpect(status().isOk())
                .andExpect(content().string("false"));
    }
    
    @Test
    @DisplayName("Should return health status")
    @WithMockUser
    void shouldReturnHealthStatus() throws Exception {
        // When & Then
        mockMvc.perform(get("/api/auth/health"))
                .andExpect(status().isOk())
                .andExpect(content().string("Authentication service is running"));
    }
}
