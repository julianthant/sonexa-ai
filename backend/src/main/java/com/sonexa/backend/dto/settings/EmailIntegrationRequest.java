package com.sonexa.backend.dto.settings;

import jakarta.validation.constraints.NotBlank;

public class EmailIntegrationRequest {

    @NotBlank(message = "Service is required")
    private String service; // "gmail" or "outlook"

    private String redirectUri;

    // Constructors
    public EmailIntegrationRequest() {
    }

    public EmailIntegrationRequest(String service, String redirectUri) {
        this.service = service;
        this.redirectUri = redirectUri;
    }

    // Getters and Setters
    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getRedirectUri() {
        return redirectUri;
    }

    public void setRedirectUri(String redirectUri) {
        this.redirectUri = redirectUri;
    }
}
