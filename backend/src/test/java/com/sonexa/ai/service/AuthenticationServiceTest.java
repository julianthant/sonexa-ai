package com.sonexa.ai.service;

import com.sonexa.ai.dto.auth.AuthenticationRequest;
import com.sonexa.ai.dto.auth.AuthenticationResponse;
import com.sonexa.ai.dto.auth.RegisterRequest;
import com.sonexa.ai.entity.User;
import com.sonexa.ai.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

/**
 * Unit Tests for Authentication Service
 * 
 * This test class provides comprehensive testing for the AuthenticationService
 * including user registration, authentication, and token management.
 * 
 * Test Coverage:
 * - User registration scenarios
 * - Authentication success and failure cases
 * - Token refresh functionality
 * - Email validation
 * - Error handling
 * 
 * @author Sonexa AI Team
 * @version 1.0.0
 * @since 2025-01-13
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("Authentication Service Tests")
class AuthenticationServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @Mock
    private PasswordEncoder passwordEncoder;
    
    @Mock
    private JwtService jwtService;
    
    @Mock
    private AuthenticationManager authenticationManager;
    
    @InjectMocks
    private AuthenticationService authenticationService;
    
    private RegisterRequest registerRequest;
    private AuthenticationRequest authenticationRequest;
    private User testUser;
    
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
        
        testUser = User.builder()
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
    @DisplayName("Should register new user successfully")
    void shouldRegisterNewUserSuccessfully() {
        // Given
        when(userRepository.existsByEmail(registerRequest.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(registerRequest.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(testUser);
        when(jwtService.generateToken(any(User.class))).thenReturn("access-token");
        when(jwtService.generateRefreshToken(any(User.class))).thenReturn("refresh-token");
        when(jwtService.getExpirationTime()).thenReturn(86400000L);
        
        // When
        AuthenticationResponse response = authenticationService.register(registerRequest);
        
        // Then
        assertThat(response).isNotNull();
        assertThat(response.getAccessToken()).isEqualTo("access-token");
        assertThat(response.getRefreshToken()).isEqualTo("refresh-token");
        assertThat(response.getTokenType()).isEqualTo("Bearer");
        assertThat(response.getExpiresIn()).isEqualTo(86400000L);
        assertThat(response.getUser()).isNotNull();
        assertThat(response.getUser().getEmail()).isEqualTo("john.doe@example.com");
        
        verify(userRepository).existsByEmail(registerRequest.getEmail());
        verify(passwordEncoder).encode(registerRequest.getPassword());
        verify(userRepository).save(any(User.class));
        verify(jwtService).generateToken(any(User.class));
        verify(jwtService).generateRefreshToken(any(User.class));
    }
    
    @Test
    @DisplayName("Should throw exception when email already exists")
    void shouldThrowExceptionWhenEmailAlreadyExists() {
        // Given
        when(userRepository.existsByEmail(registerRequest.getEmail())).thenReturn(true);
        
        // When & Then
        assertThatThrownBy(() -> authenticationService.register(registerRequest))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Email already registered");
        
        verify(userRepository).existsByEmail(registerRequest.getEmail());
        verify(passwordEncoder, never()).encode(anyString());
        verify(userRepository, never()).save(any(User.class));
    }
    
    @Test
    @DisplayName("Should authenticate user successfully")
    void shouldAuthenticateUserSuccessfully() {
        // Given
        when(userRepository.findByEmail(authenticationRequest.getEmail())).thenReturn(Optional.of(testUser));
        when(jwtService.generateToken(testUser)).thenReturn("access-token");
        when(jwtService.generateRefreshToken(testUser)).thenReturn("refresh-token");
        when(jwtService.getExpirationTime()).thenReturn(86400000L);
        
        // When
        AuthenticationResponse response = authenticationService.authenticate(authenticationRequest);
        
        // Then
        assertThat(response).isNotNull();
        assertThat(response.getAccessToken()).isEqualTo("access-token");
        assertThat(response.getRefreshToken()).isEqualTo("refresh-token");
        assertThat(response.getUser().getEmail()).isEqualTo("john.doe@example.com");
        
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userRepository).findByEmail(authenticationRequest.getEmail());
        verify(jwtService).generateToken(testUser);
        verify(jwtService).generateRefreshToken(testUser);
    }
    
    @Test
    @DisplayName("Should throw exception when user not found during authentication")
    void shouldThrowExceptionWhenUserNotFoundDuringAuthentication() {
        // Given
        when(userRepository.findByEmail(authenticationRequest.getEmail())).thenReturn(Optional.empty());
        
        // When & Then
        assertThatThrownBy(() -> authenticationService.authenticate(authenticationRequest))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("User not found");
        
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userRepository).findByEmail(authenticationRequest.getEmail());
        verify(jwtService, never()).generateToken(any());
    }
    
    @Test
    @DisplayName("Should refresh token successfully")
    void shouldRefreshTokenSuccessfully() {
        // Given
        String refreshToken = "valid-refresh-token";
        when(jwtService.extractUsername(refreshToken)).thenReturn("john.doe@example.com");
        when(userRepository.findByEmail("john.doe@example.com")).thenReturn(Optional.of(testUser));
        when(jwtService.isTokenValid(refreshToken, testUser)).thenReturn(true);
        when(jwtService.generateToken(testUser)).thenReturn("new-access-token");
        when(jwtService.getExpirationTime()).thenReturn(86400000L);
        
        // When
        AuthenticationResponse response = authenticationService.refreshToken(refreshToken);
        
        // Then
        assertThat(response).isNotNull();
        assertThat(response.getAccessToken()).isEqualTo("new-access-token");
        assertThat(response.getRefreshToken()).isEqualTo(refreshToken);
        
        verify(jwtService).extractUsername(refreshToken);
        verify(userRepository).findByEmail("john.doe@example.com");
        verify(jwtService).isTokenValid(refreshToken, testUser);
        verify(jwtService).generateToken(testUser);
    }
    
    @Test
    @DisplayName("Should throw exception for invalid refresh token")
    void shouldThrowExceptionForInvalidRefreshToken() {
        // Given
        String refreshToken = "invalid-refresh-token";
        when(jwtService.extractUsername(refreshToken)).thenReturn("john.doe@example.com");
        when(userRepository.findByEmail("john.doe@example.com")).thenReturn(Optional.of(testUser));
        when(jwtService.isTokenValid(refreshToken, testUser)).thenReturn(false);
        
        // When & Then
        assertThatThrownBy(() -> authenticationService.refreshToken(refreshToken))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Invalid refresh token");
        
        verify(jwtService).extractUsername(refreshToken);
        verify(userRepository).findByEmail("john.doe@example.com");
        verify(jwtService).isTokenValid(refreshToken, testUser);
        verify(jwtService, never()).generateToken(any());
    }
    
    @Test
    @DisplayName("Should get user by email successfully")
    void shouldGetUserByEmailSuccessfully() {
        // Given
        when(userRepository.findByEmail("john.doe@example.com")).thenReturn(Optional.of(testUser));
        
        // When
        User result = authenticationService.getUserByEmail("john.doe@example.com");
        
        // Then
        assertThat(result).isNotNull();
        assertThat(result.getEmail()).isEqualTo("john.doe@example.com");
        
        verify(userRepository).findByEmail("john.doe@example.com");
    }
    
    @Test
    @DisplayName("Should throw exception when user not found by email")
    void shouldThrowExceptionWhenUserNotFoundByEmail() {
        // Given
        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());
        
        // When & Then
        assertThatThrownBy(() -> authenticationService.getUserByEmail("nonexistent@example.com"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("User not found with email: nonexistent@example.com");
        
        verify(userRepository).findByEmail("nonexistent@example.com");
    }
    
    @Test
    @DisplayName("Should check if email exists correctly")
    void shouldCheckIfEmailExistsCorrectly() {
        // Given
        when(userRepository.existsByEmail("existing@example.com")).thenReturn(true);
        when(userRepository.existsByEmail("nonexistent@example.com")).thenReturn(false);
        
        // When & Then
        assertThat(authenticationService.existsByEmail("existing@example.com")).isTrue();
        assertThat(authenticationService.existsByEmail("nonexistent@example.com")).isFalse();
        
        verify(userRepository).existsByEmail("existing@example.com");
        verify(userRepository).existsByEmail("nonexistent@example.com");
    }
}
