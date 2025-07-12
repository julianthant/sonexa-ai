package com.sonexa.backend.dto.settings;

public class EmailIntegrationResponse {

    private boolean emailIntegrationEnabled;
    private String primaryEmailService;
    private boolean gmailConnected;
    private boolean outlookConnected;

    // Constructors
    public EmailIntegrationResponse() {
    }

    public EmailIntegrationResponse(boolean emailIntegrationEnabled, String primaryEmailService,
            boolean gmailConnected, boolean outlookConnected) {
        this.emailIntegrationEnabled = emailIntegrationEnabled;
        this.primaryEmailService = primaryEmailService;
        this.gmailConnected = gmailConnected;
        this.outlookConnected = outlookConnected;
    }

    // Getters and Setters
    public boolean isEmailIntegrationEnabled() {
        return emailIntegrationEnabled;
    }

    public void setEmailIntegrationEnabled(boolean emailIntegrationEnabled) {
        this.emailIntegrationEnabled = emailIntegrationEnabled;
    }

    public String getPrimaryEmailService() {
        return primaryEmailService;
    }

    public void setPrimaryEmailService(String primaryEmailService) {
        this.primaryEmailService = primaryEmailService;
    }

    public boolean isGmailConnected() {
        return gmailConnected;
    }

    public void setGmailConnected(boolean gmailConnected) {
        this.gmailConnected = gmailConnected;
    }

    public boolean isOutlookConnected() {
        return outlookConnected;
    }

    public void setOutlookConnected(boolean outlookConnected) {
        this.outlookConnected = outlookConnected;
    }
}
