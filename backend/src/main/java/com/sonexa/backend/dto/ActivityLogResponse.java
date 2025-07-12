package com.sonexa.backend.dto;

import java.time.LocalDateTime;

public class ActivityLogResponse {

    private Long id;
    private String action;
    private String description;
    private String ipAddress;
    private String userAgent;
    private LocalDateTime timestamp;

    // Constructors
    public ActivityLogResponse() {
    }

    public ActivityLogResponse(Long id, String action, String description,
            String ipAddress, String userAgent, LocalDateTime timestamp) {
        this.id = id;
        this.action = action;
        this.description = description;
        this.ipAddress = ipAddress;
        this.userAgent = userAgent;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getUserAgent() {
        return userAgent;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
