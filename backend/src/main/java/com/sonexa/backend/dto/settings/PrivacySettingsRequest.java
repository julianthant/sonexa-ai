package com.sonexa.backend.dto.settings;

public class PrivacySettingsRequest {

    private boolean profileVisibility;
    private boolean dataCollection;
    private boolean analyticsTracking;
    private boolean thirdPartySharing;
    private boolean twoFactorEnabled;
    private boolean sessionTimeout;
    private int sessionTimeoutMinutes;

    // Constructors
    public PrivacySettingsRequest() {
    }

    // Getters and Setters
    public boolean isProfileVisibility() {
        return profileVisibility;
    }

    public void setProfileVisibility(boolean profileVisibility) {
        this.profileVisibility = profileVisibility;
    }

    public boolean isDataCollection() {
        return dataCollection;
    }

    public void setDataCollection(boolean dataCollection) {
        this.dataCollection = dataCollection;
    }

    public boolean isAnalyticsTracking() {
        return analyticsTracking;
    }

    public void setAnalyticsTracking(boolean analyticsTracking) {
        this.analyticsTracking = analyticsTracking;
    }

    public boolean isThirdPartySharing() {
        return thirdPartySharing;
    }

    public void setThirdPartySharing(boolean thirdPartySharing) {
        this.thirdPartySharing = thirdPartySharing;
    }

    public boolean isTwoFactorEnabled() {
        return twoFactorEnabled;
    }

    public void setTwoFactorEnabled(boolean twoFactorEnabled) {
        this.twoFactorEnabled = twoFactorEnabled;
    }

    public boolean isSessionTimeout() {
        return sessionTimeout;
    }

    public void setSessionTimeout(boolean sessionTimeout) {
        this.sessionTimeout = sessionTimeout;
    }

    public int getSessionTimeoutMinutes() {
        return sessionTimeoutMinutes;
    }

    public void setSessionTimeoutMinutes(int sessionTimeoutMinutes) {
        this.sessionTimeoutMinutes = sessionTimeoutMinutes;
    }
}
