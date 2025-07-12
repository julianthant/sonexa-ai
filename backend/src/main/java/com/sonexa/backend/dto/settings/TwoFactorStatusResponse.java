package com.sonexa.backend.dto.settings;

public class TwoFactorStatusResponse {

    private boolean enabled;
    private boolean verified;
    private String[] backupCodes;

    // Constructors
    public TwoFactorStatusResponse() {
    }

    public TwoFactorStatusResponse(boolean enabled, boolean verified, String[] backupCodes) {
        this.enabled = enabled;
        this.verified = verified;
        this.backupCodes = backupCodes;
    }

    // Getters and Setters
    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public String[] getBackupCodes() {
        return backupCodes;
    }

    public void setBackupCodes(String[] backupCodes) {
        this.backupCodes = backupCodes;
    }
}
