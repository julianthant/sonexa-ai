package com.sonexa.backend.config;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.sonexa.backend.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        // Skip JWT authentication for public endpoints
        String requestPath = request.getServletPath();
        if (requestPath.startsWith("/api/auth/") || requestPath.startsWith("/api/public/")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Step 1: Extract the Authorization header
        String authHeader = request.getHeader("Authorization");

        // Step 2: Check if header exists and starts with "Bearer "
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Step 3: Extract the JWT token (remove "Bearer " prefix)
        String token = authHeader.substring(7);

        try {
            // Step 4: Extract user email from token
            String userEmail = jwtService.extractEmail(token);

            // Step 5: Check if user is not already authenticated
            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                // Step 6: Validate the token
                if (jwtService.validateToken(token, userEmail)) {

                    // Step 7: Extract user role from token
                    String role = jwtService.extractRole(token);

                    // Step 8: Create authentication object
                    UsernamePasswordAuthenticationToken authToken
                            = new UsernamePasswordAuthenticationToken(
                                    userEmail,
                                    null,
                                    List.of(new SimpleGrantedAuthority("ROLE_" + role))
                            );

                    // Step 9: Set additional details
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    // Step 10: Set authentication in Spring Security context
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        } catch (Exception e) {
            // If token parsing fails, just continue without authentication
            logger.error("JWT token validation failed: " + e.getMessage());
        }

        // Step 11: Continue with the request
        filterChain.doFilter(request, response);
    }
}
