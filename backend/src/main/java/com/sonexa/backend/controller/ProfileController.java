package com.sonexa.backend.controller;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sonexa.backend.dto.AuthResponse;
import com.sonexa.backend.model.User;
import com.sonexa.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private static final Logger logger = LoggerFactory.getLogger(ProfileController.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<?> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        logger.info("Fetching profile for user: {}", userDetails.getUsername());

        try {
            Optional<User> userOpt = userRepository.findByEmail(userDetails.getUsername());
            if (!userOpt.isPresent()) {
                logger.warn("User not found: {}", userDetails.getUsername());
                return ResponseEntity.status(404).body(createErrorResponse("USER_NOT_FOUND", "User not found"));
            }

            User user = userOpt.get();
            return ResponseEntity.ok(new AuthResponse.UserDto(user));

        } catch (Exception e) {
            logger.error("Error fetching profile for user: {} - {}", userDetails.getUsername(), e.getMessage(), e);
            return ResponseEntity.status(500).body(createErrorResponse("PROFILE_FETCH_FAILED", "Failed to fetch profile"));
        }
    }

    @PutMapping
    public ResponseEntity<?> updateProfile(@AuthenticationPrincipal UserDetails userDetails,
            @RequestBody ProfileUpdateRequest request) {
        logger.info("Updating profile for user: {}", userDetails.getUsername());

        try {
            Optional<User> userOpt = userRepository.findByEmail(userDetails.getUsername());
            if (!userOpt.isPresent()) {
                logger.warn("User not found: {}", userDetails.getUsername());
                return ResponseEntity.status(404).body(createErrorResponse("USER_NOT_FOUND", "User not found"));
            }

            User user = userOpt.get();

            // Update user fields
            if (request.getFirstName() != null && !request.getFirstName().trim().isEmpty()) {
                user.setFirstName(request.getFirstName().trim());
            }
            if (request.getLastName() != null && !request.getLastName().trim().isEmpty()) {
                user.setLastName(request.getLastName().trim());
            }
            if (request.getCompany() != null) {
                user.setCompany(request.getCompany().trim().isEmpty() ? null : request.getCompany().trim());
            }
            if (request.getPhoneNumber() != null) {
                user.setPhoneNumber(request.getPhoneNumber().trim().isEmpty() ? null : request.getPhoneNumber().trim());
            }
            if (request.getTimezone() != null) {
                user.setTimezone(request.getTimezone().trim().isEmpty() ? null : request.getTimezone().trim());
            }
            if (request.getEmailNotifications() != null) {
                user.setEmailNotifications(request.getEmailNotifications());
            }
            if (request.getVoiceNotifications() != null) {
                user.setVoiceNotifications(request.getVoiceNotifications());
            }

            User savedUser = userRepository.save(user);
            logger.info("Profile updated successfully for user: {}", userDetails.getUsername());

            return ResponseEntity.ok(new AuthResponse.UserDto(savedUser));

        } catch (Exception e) {
            logger.error("Error updating profile for user: {} - {}", userDetails.getUsername(), e.getMessage(), e);
            return ResponseEntity.status(500).body(createErrorResponse("PROFILE_UPDATE_FAILED", "Failed to update profile"));
        }
    }

    @PutMapping("/password")
    public ResponseEntity<?> changePassword(@AuthenticationPrincipal UserDetails userDetails,
            @RequestBody PasswordChangeRequest request) {
        logger.info("Changing password for user: {}", userDetails.getUsername());

        try {
            // Validate request
            if (request.getCurrentPassword() == null || request.getCurrentPassword().isEmpty()) {
                return ResponseEntity.status(400).body(createErrorResponse("CURRENT_PASSWORD_REQUIRED", "Current password is required"));
            }
            if (request.getNewPassword() == null || request.getNewPassword().length() < 6) {
                return ResponseEntity.status(400).body(createErrorResponse("INVALID_NEW_PASSWORD", "New password must be at least 6 characters"));
            }

            Optional<User> userOpt = userRepository.findByEmail(userDetails.getUsername());
            if (!userOpt.isPresent()) {
                logger.warn("User not found: {}", userDetails.getUsername());
                return ResponseEntity.status(404).body(createErrorResponse("USER_NOT_FOUND", "User not found"));
            }

            User user = userOpt.get();

            // Verify current password
            if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
                logger.warn("Invalid current password for user: {}", userDetails.getUsername());
                return ResponseEntity.status(400).body(createErrorResponse("INVALID_CURRENT_PASSWORD", "Current password is incorrect"));
            }

            // Update password
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            userRepository.save(user);

            logger.info("Password changed successfully for user: {}", userDetails.getUsername());
            return ResponseEntity.ok(createSuccessResponse("Password changed successfully"));

        } catch (Exception e) {
            logger.error("Error changing password for user: {} - {}", userDetails.getUsername(), e.getMessage(), e);
            return ResponseEntity.status(500).body(createErrorResponse("PASSWORD_CHANGE_FAILED", "Failed to change password"));
        }
    }

    // Helper classes for request/response
    public static class ProfileUpdateRequest {

        private String firstName;
        private String lastName;
        private String company;
        private String phoneNumber;
        private String timezone;
        private Boolean emailNotifications;
        private Boolean voiceNotifications;

        // Getters and setters
        public String getFirstName() {
            return firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }

        public String getCompany() {
            return company;
        }

        public void setCompany(String company) {
            this.company = company;
        }

        public String getPhoneNumber() {
            return phoneNumber;
        }

        public void setPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
        }

        public String getTimezone() {
            return timezone;
        }

        public void setTimezone(String timezone) {
            this.timezone = timezone;
        }

        public Boolean getEmailNotifications() {
            return emailNotifications;
        }

        public void setEmailNotifications(Boolean emailNotifications) {
            this.emailNotifications = emailNotifications;
        }

        public Boolean getVoiceNotifications() {
            return voiceNotifications;
        }

        public void setVoiceNotifications(Boolean voiceNotifications) {
            this.voiceNotifications = voiceNotifications;
        }
    }

    public static class PasswordChangeRequest {

        private String currentPassword;
        private String newPassword;

        public String getCurrentPassword() {
            return currentPassword;
        }

        public void setCurrentPassword(String currentPassword) {
            this.currentPassword = currentPassword;
        }

        public String getNewPassword() {
            return newPassword;
        }

        public void setNewPassword(String newPassword) {
            this.newPassword = newPassword;
        }
    }

    private Object createErrorResponse(String code, String message) {
        return new ErrorResponse(code, message);
    }

    private Object createSuccessResponse(String message) {
        return new SuccessResponse(message);
    }

    private static class ErrorResponse {

        private final String code;
        private final String message;

        public ErrorResponse(String code, String message) {
            this.code = code;
            this.message = message;
        }

        public String getCode() {
            return code;
        }

        public String getMessage() {
            return message;
        }
    }

    private static class SuccessResponse {

        private final String message;

        public SuccessResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }
}
