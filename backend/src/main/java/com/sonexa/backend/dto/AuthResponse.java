package com.sonexa.backend.dto;

import com.sonexa.backend.model.User;

public class AuthResponse {

    private String token;
    private UserDto user;

    public AuthResponse() {
    }

    public AuthResponse(String token, User user) {
        this.token = token;
        this.user = new UserDto(user);
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    // Inner class for user information in responses
    public static class UserDto {

        private String id;
        private String username;
        private String email;
        private String firstName;
        private String lastName;
        private String company;
        private String role;
        private String customVoiceEmail;
        private String createdAt;

        public UserDto(User user) {
            this.id = user.getId().toString();
            this.username = user.getFirstName() + " " + user.getLastName();
            this.email = user.getEmail();
            this.firstName = user.getFirstName();
            this.lastName = user.getLastName();
            this.company = user.getCompany();
            this.role = user.getRole().name();
            this.customVoiceEmail = user.getCustomVoiceEmail();
            this.createdAt = user.getCreatedAt() != null ? user.getCreatedAt().toString() : "2024-01-01T00:00:00";
        }

        // Getters
        public String getId() {
            return id;
        }

        public String getUsername() {
            return username;
        }

        public String getEmail() {
            return email;
        }

        public String getFirstName() {
            return firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public String getCompany() {
            return company;
        }

        public String getRole() {
            return role;
        }

        public String getCustomVoiceEmail() {
            return customVoiceEmail;
        }

        public String getCreatedAt() {
            return createdAt;
        }

        // Setters
        public void setId(String id) {
            this.id = id;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }

        public void setCompany(String company) {
            this.company = company;
        }

        public void setRole(String role) {
            this.role = role;
        }

        public void setCustomVoiceEmail(String customVoiceEmail) {
            this.customVoiceEmail = customVoiceEmail;
        }

        public void setCreatedAt(String createdAt) {
            this.createdAt = createdAt;
        }
    }
}
