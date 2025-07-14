package com.sonexa.ai.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * JWT Authentication Entry Point
 * 
 * This component handles authentication errors and sends appropriate
 * responses for unauthorized access attempts.
 * 
 * Features:
 * - Unauthorized access handling
 * - Structured error responses
 * - Logging for security events
 * 
 * @author Sonexa AI Team
 * @version 1.0.0
 * @since 2025-01-13
 */
@Component
@Slf4j
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    
    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException
    ) throws IOException, ServletException {
        
        log.warn("Unauthorized access attempt: {} from IP: {}", 
                 request.getRequestURI(), 
                 getClientIpAddress(request));
        
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        
        String errorMessage = "{" +
                "\"error\":\"Unauthorized\"," +
                "\"message\":\"Authentication required to access this resource\"," +
                "\"path\":\"" + request.getRequestURI() + "\"," +
                "\"timestamp\":\"" + System.currentTimeMillis() + "\"" +
                "}";
        
        response.getWriter().write(errorMessage);
    }
    
    /**
     * Extract client IP address from request
     * 
     * @param request HTTP request
     * @return client IP address
     */
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }
        
        return request.getRemoteAddr();
    }
}
