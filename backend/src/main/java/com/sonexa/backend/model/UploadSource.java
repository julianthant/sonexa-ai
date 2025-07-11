package com.sonexa.backend.model;

public enum UploadSource {
    DIRECT_UPLOAD, // User uploaded via web interface
    EMAIL_ATTACHMENT, // Received via user's custom email
    EMAIL_FORWARD, // User forwarded email with attachment
    API_UPLOAD, // Uploaded via REST API
    MOBILE_APP        // Future: mobile app upload
}
