package com.sonexa.backend.dto.settings;

public class NotificationSettingsRequest {

    private boolean emailNotifications;
    private boolean pushNotifications;
    private boolean smsNotifications;
    private boolean voiceNotifications;
    private boolean marketingEmails;
    private boolean securityAlerts;

    // Constructors
    public NotificationSettingsRequest() {
    }

    // Getters and Setters
    public boolean isEmailNotifications() {
        return emailNotifications;
    }

    public void setEmailNotifications(boolean emailNotifications) {
        this.emailNotifications = emailNotifications;
    }

    public boolean isPushNotifications() {
        return pushNotifications;
    }

    public void setPushNotifications(boolean pushNotifications) {
        this.pushNotifications = pushNotifications;
    }

    public boolean isSmsNotifications() {
        return smsNotifications;
    }

    public void setSmsNotifications(boolean smsNotifications) {
        this.smsNotifications = smsNotifications;
    }

    public boolean isVoiceNotifications() {
        return voiceNotifications;
    }

    public void setVoiceNotifications(boolean voiceNotifications) {
        this.voiceNotifications = voiceNotifications;
    }

    public boolean isMarketingEmails() {
        return marketingEmails;
    }

    public void setMarketingEmails(boolean marketingEmails) {
        this.marketingEmails = marketingEmails;
    }

    public boolean isSecurityAlerts() {
        return securityAlerts;
    }

    public void setSecurityAlerts(boolean securityAlerts) {
        this.securityAlerts = securityAlerts;
    }
}
