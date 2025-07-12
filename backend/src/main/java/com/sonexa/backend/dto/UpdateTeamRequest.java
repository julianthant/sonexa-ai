package com.sonexa.backend.dto;

import jakarta.validation.constraints.Size;

public class UpdateTeamRequest {

    @Size(max = 100, message = "Team name cannot exceed 100 characters")
    private String name;

    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;

    // Constructors
    public UpdateTeamRequest() {
    }

    public UpdateTeamRequest(String name, String description) {
        this.name = name;
        this.description = description;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
