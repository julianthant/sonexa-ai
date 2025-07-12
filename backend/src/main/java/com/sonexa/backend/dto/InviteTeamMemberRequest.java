package com.sonexa.backend.dto;

import com.sonexa.backend.model.TeamMember.TeamRole;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class InviteTeamMemberRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Valid email is required")
    private String email;

    @NotNull(message = "Role is required")
    private TeamRole role;

    private String message; // Optional invitation message

    // Constructors
    public InviteTeamMemberRequest() {
    }

    public InviteTeamMemberRequest(String email, TeamRole role, String message) {
        this.email = email;
        this.role = role;
        this.message = message;
    }

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public TeamRole getRole() {
        return role;
    }

    public void setRole(TeamRole role) {
        this.role = role;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
