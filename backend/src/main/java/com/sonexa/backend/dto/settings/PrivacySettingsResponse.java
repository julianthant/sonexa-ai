package com.sonexa.backend.dto.settings;

public class PrivacySettingsResponse {

    private boolean profileVisibility;
    private boolean dataCollection;
    private boolean analyticsTracking;
    private boolean thirdPartySharing;
    private boolean twoFactorEnabled;
    private boolean sessionTimeout;
    private int sessionTimeoutMinutes;

    // Constructors
    public PrivacySettingsResponse() {
    }

    public PrivacySettingsResponse(boolean profileVisibility, boolean dataCollection,
            boolean analyticsTracking, boolean thirdPartySharing,
            boolean twoFactorEnabled, boolean sessionTimeout,
            int sessionTimeoutMinutes) {
        this.profileVisibility = profileVisibility;
        this.dataCollection = dataCollection;
        this.analyticsTracking = analyticsTracking;
        this.thirdPartySharing = thirdPartySharing;
        this.twoFactorEnabled = twoFactorEnabled;
        this.sessionTimeout = sessionTimeout;
        this.sessionTimeoutMinutes = sessionTimeoutMinutes;
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
