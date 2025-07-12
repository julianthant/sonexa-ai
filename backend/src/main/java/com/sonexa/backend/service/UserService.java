package com.sonexa.backend.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sonexa.backend.dto.AuthRequest;
import com.sonexa.backend.dto.RegisterRequest;
import com.sonexa.backend.model.Role;
import com.sonexa.backend.model.User;
import com.sonexa.backend.repository.UserRepository;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String register(RegisterRequest request) throws Exception {
        logger.info("Starting registration process for email: {}", request.getEmail());

        try {
            // Check if user already exists
            Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
            if (existingUser.isPresent()) {
                logger.warn("Registration failed: User already exists with email: {}", request.getEmail());
                throw new IllegalArgumentException("User with this email already exists");
            }

            // Encode password
            logger.debug("Encoding password for user: {}", request.getEmail());
            String encodedPassword = passwordEncoder.encode(request.getPassword());

            // Create user
            User user = new User(request.getEmail(), encodedPassword, Role.USER,
                    request.getFirstName() != null ? request.getFirstName() : "User",
                    request.getLastName() != null ? request.getLastName() : "");
            if (request.getCompany() != null && !request.getCompany().trim().isEmpty()) {
                user.setCompany(request.getCompany());
            }
            logger.debug("Created user object for: {}", request.getEmail());

            // Generate unique custom email for voice messages
            String customVoiceEmail = generateCustomVoiceEmail(request.getEmail());
            user.setCustomVoiceEmail(customVoiceEmail);
            logger.debug("Generated custom voice email: {} for user: {}", customVoiceEmail, request.getEmail());

            // Save user to database
            logger.debug("Saving user to database: {}", request.getEmail());
            User savedUser = userRepository.save(user);
            logger.info("User successfully saved to database with ID: {} for email: {}", savedUser.getId(), request.getEmail());

            // Generate JWT token
            logger.debug("Generating JWT token for user: {}", request.getEmail());
            String token = jwtService.generateToken(savedUser);
            logger.info("Registration completed successfully for email: {}", request.getEmail());

            return token;

        } catch (DataIntegrityViolationException e) {
            logger.error("Data integrity violation during registration for email: {} - {}", request.getEmail(), e.getMessage());
            throw new IllegalArgumentException("Email already exists", e);
        } catch (Exception e) {
            logger.error("Unexpected error during registration for email: {} - {}", request.getEmail(), e.getMessage(), e);
            throw new Exception("Registration failed: " + e.getMessage(), e);
        }
    }

    private String generateCustomVoiceEmail(String userEmail) {
        logger.debug("Generating custom voice email for: {}", userEmail);

        try {
            // Convert john.doe@gmail.com -> sonexa.voice.ai+john-doe@gmail.com
            String localPart = userEmail.split("@")[0];
            String sanitized = localPart.toLowerCase()
                    .replaceAll("[^a-z0-9]", "-")
                    .replaceAll("-+", "-")
                    .replaceAll("^-|-$", "");

            // Use Gmail + addressing (completely free!)
            String baseEmail = "sonexa.voice.ai+" + sanitized + "@gmail.com";
            String finalEmail = baseEmail;
            int counter = 1;

            // Ensure uniqueness by adding number if needed
            while (userRepository.findByCustomVoiceEmail(finalEmail).isPresent()) {
                finalEmail = "sonexa.voice.ai+" + sanitized + counter + "@gmail.com";
                counter++;
                logger.debug("Custom voice email already exists, trying: {}", finalEmail);
            }

            logger.debug("Generated unique custom voice email: {}", finalEmail);
            return finalEmail;

        } catch (Exception e) {
            logger.error("Error generating custom voice email for: {} - {}", userEmail, e.getMessage());
            // Fallback to a simple email
            return "sonexa.voice.ai+" + System.currentTimeMillis() + "@gmail.com";
        }
    }

    public Optional<String> authenticate(AuthRequest request) {
        logger.info("Starting authentication process for email: {}", request.getEmail());

        try {
            // Find user by email
            logger.debug("Looking up user by email: {}", request.getEmail());
            Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

            if (!userOpt.isPresent()) {
                logger.warn("Authentication failed: User not found for email: {}", request.getEmail());
                return Optional.empty();
            }

            User user = userOpt.get();
            logger.debug("User found for email: {}, checking password", request.getEmail());

            // Check password
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                logger.info("Authentication successful for email: {}", request.getEmail());

                // Generate JWT token
                logger.debug("Generating JWT token for authenticated user: {}", request.getEmail());
                String token = jwtService.generateToken(user);
                return Optional.of(token);
            } else {
                logger.warn("Authentication failed: Invalid password for email: {}", request.getEmail());
                return Optional.empty();
            }

        } catch (Exception e) {
            logger.error("Unexpected error during authentication for email: {} - {}", request.getEmail(), e.getMessage(), e);
            return Optional.empty();
        }
    }

    // Authentication result class
    public static class AuthResult {

        private final String token;
        private final User user;

        public AuthResult(String token, User user) {
            this.token = token;
            this.user = user;
        }

        public String getToken() {
            return token;
        }

        public User getUser() {
            return user;
        }
    }

    public Optional<AuthResult> authenticateWithUser(AuthRequest request) {
        logger.info("Starting authentication process with user data for email: {}", request.getEmail());

        try {
            // Find user by email
            logger.debug("Looking up user by email: {}", request.getEmail());
            Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

            if (!userOpt.isPresent()) {
                logger.warn("Authentication failed: User not found for email: {}", request.getEmail());
                return Optional.empty();
            }

            User user = userOpt.get();
            logger.debug("User found for email: {}, checking password", request.getEmail());

            // Check password
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                logger.info("Authentication successful for email: {}", request.getEmail());

                // Generate JWT token
                logger.debug("Generating JWT token for authenticated user: {}", request.getEmail());
                String token = jwtService.generateToken(user);
                return Optional.of(new AuthResult(token, user));
            } else {
                logger.warn("Authentication failed: Invalid password for email: {}", request.getEmail());
                return Optional.empty();
            }

        } catch (Exception e) {
            logger.error("Unexpected error during authentication for email: {} - {}", request.getEmail(), e.getMessage(), e);
            return Optional.empty();
        }
    }

    public AuthResult registerWithUser(RegisterRequest request) throws Exception {
        logger.info("Starting registration process with user data for email: {}", request.getEmail());

        try {
            // Check if user already exists
            Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
            if (existingUser.isPresent()) {
                logger.warn("Registration failed: User already exists with email: {}", request.getEmail());
                throw new IllegalArgumentException("User with this email already exists");
            }

            // Encode password
            logger.debug("Encoding password for user: {}", request.getEmail());
            String encodedPassword = passwordEncoder.encode(request.getPassword());

            // Create user
            User user = new User(request.getEmail(), encodedPassword, Role.USER,
                    request.getFirstName() != null ? request.getFirstName() : "User",
                    request.getLastName() != null ? request.getLastName() : "");
            if (request.getCompany() != null && !request.getCompany().trim().isEmpty()) {
                user.setCompany(request.getCompany());
            }
            logger.debug("Created user object for: {}", request.getEmail());

            // Generate unique custom email for voice messages
            String customVoiceEmail = generateCustomVoiceEmail(request.getEmail());
            user.setCustomVoiceEmail(customVoiceEmail);
            logger.debug("Generated custom voice email: {} for user: {}", customVoiceEmail, request.getEmail());

            // Save user to database
            logger.debug("Saving user to database: {}", request.getEmail());
            User savedUser = userRepository.save(user);
            logger.info("User successfully saved to database with ID: {} for email: {}", savedUser.getId(), request.getEmail());

            // Generate JWT token
            logger.debug("Generating JWT token for user: {}", request.getEmail());
            String token = jwtService.generateToken(savedUser);
            logger.info("Registration completed successfully for email: {}", request.getEmail());

            return new AuthResult(token, savedUser);

        } catch (DataIntegrityViolationException e) {
            logger.error("Data integrity violation during registration for email: {} - {}", request.getEmail(), e.getMessage());
            throw new IllegalArgumentException("Email already exists", e);
        } catch (Exception e) {
            logger.error("Unexpected error during registration for email: {} - {}", request.getEmail(), e.getMessage(), e);
            throw new Exception("Registration failed: " + e.getMessage(), e);
        }
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
