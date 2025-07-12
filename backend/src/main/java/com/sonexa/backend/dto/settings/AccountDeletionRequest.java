package com.sonexa.backend.dto.settings;

import jakarta.validation.constraints.NotBlank;

public class AccountDeletionRequest {

    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "Confirmation is required")
    private String confirmation; // Must be "DELETE"

    private String reason;

    // Constructors
    public AccountDeletionRequest() {
    }

    public AccountDeletionRequest(String password, String confirmation, String reason) {
        this.password = password;
        this.confirmation = confirmation;
        this.reason = reason;
    }

    // Getters and Setters
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmation() {
        return confirmation;
    }

    public void setConfirmation(String confirmation) {
        this.confirmation = confirmation;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
