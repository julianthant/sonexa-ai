package com.sonexa.backend.service;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.sonexa.backend.model.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

@Service
public class JwtService {

    private static final Logger logger = LoggerFactory.getLogger(JwtService.class);

    private final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 24 hours

    public String generateToken(User user) {
        logger.debug("Generating JWT token for user: {}", user.getEmail());

        try {
            String token = Jwts.builder()
                    .setSubject(user.getEmail())
                    .claim("role", user.getRole().name())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                    .signWith(secretKey)
                    .compact();

            logger.info("JWT token generated successfully for user: {}", user.getEmail());
            return token;

        } catch (Exception e) {
            logger.error("Failed to generate JWT token for user: {} - {}", user.getEmail(), e.getMessage(), e);
            throw new RuntimeException("Failed to generate JWT token", e);
        }
    }

    public String extractEmail(String token) {
        logger.debug("Extracting email from JWT token");

        try {
            String email = extractClaim(token, Claims::getSubject);
            logger.debug("Successfully extracted email from token: {}", email);
            return email;

        } catch (ExpiredJwtException e) {
            logger.warn("JWT token is expired: {}", e.getMessage());
            throw e;
        } catch (MalformedJwtException e) {
            logger.error("JWT token is malformed: {}", e.getMessage());
            throw e;
        } catch (SignatureException e) {
            logger.error("JWT token signature is invalid: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            logger.error("Failed to extract email from JWT token: {}", e.getMessage(), e);
            throw new JwtException("Failed to extract email from token", e);
        }
    }

    public String extractRole(String token) {
        logger.debug("Extracting role from JWT token");

        try {
            String role = extractClaim(token, claims -> claims.get("role", String.class));
            logger.debug("Successfully extracted role from token: {}", role);
            return role;

        } catch (Exception e) {
            logger.error("Failed to extract role from JWT token: {}", e.getMessage(), e);
            throw new JwtException("Failed to extract role from token", e);
        }
    }

    public Date extractExpiration(String token) {
        try {
            return extractClaim(token, Claims::getExpiration);
        } catch (Exception e) {
            logger.error("Failed to extract expiration from JWT token: {}", e.getMessage());
            throw new JwtException("Failed to extract expiration from token", e);
        }
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

        } catch (ExpiredJwtException e) {
            logger.warn("JWT token is expired");
            throw e;
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
            throw e;
        } catch (MalformedJwtException e) {
            logger.error("JWT token is malformed: {}", e.getMessage());
            throw e;
        } catch (SignatureException e) {
            logger.error("JWT token signature is invalid: {}", e.getMessage());
            throw e;
        } catch (IllegalArgumentException e) {
            logger.error("JWT token compact of handler are invalid: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            logger.error("Unexpected error parsing JWT token: {}", e.getMessage(), e);
            throw new JwtException("Failed to parse JWT token", e);
        }
    }

    public Boolean isTokenExpired(String token) {
        try {
            boolean expired = extractExpiration(token).before(new Date());
            if (expired) {
                logger.debug("JWT token is expired");
            }
            return expired;
        } catch (Exception e) {
            logger.error("Error checking token expiration: {}", e.getMessage());
            return true; // Consider expired if we can't determine
        }
    }

    public Boolean validateToken(String token, String userEmail) {
        logger.debug("Validating JWT token for user: {}", userEmail);

        try {
            final String email = extractEmail(token);
            boolean isValid = (email.equals(userEmail) && !isTokenExpired(token));

            if (isValid) {
                logger.debug("JWT token is valid for user: {}", userEmail);
            } else {
                logger.warn("JWT token validation failed for user: {} (email match: {}, expired: {})",
                        userEmail, email.equals(userEmail), isTokenExpired(token));
            }

            return isValid;

        } catch (Exception e) {
            logger.error("JWT token validation failed for user: {} - {}", userEmail, e.getMessage());
            return false;
        }
    }
}
