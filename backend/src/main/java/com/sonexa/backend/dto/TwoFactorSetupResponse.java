package com.sonexa.backend.dto;

public class TwoFactorSetupResponse {

    private String qrCodeUrl;
    private String secret;
    private String backupCodes;

    // Constructors
    public TwoFactorSetupResponse() {
    }

    public TwoFactorSetupResponse(String qrCodeUrl, String secret, String backupCodes) {
        this.qrCodeUrl = qrCodeUrl;
        this.secret = secret;
        this.backupCodes = backupCodes;
    }

    // Getters and Setters
    public String getQrCodeUrl() {
        return qrCodeUrl;
    }

    public void setQrCodeUrl(String qrCodeUrl) {
        this.qrCodeUrl = qrCodeUrl;
    }

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public String getBackupCodes() {
        return backupCodes;
    }

    public void setBackupCodes(String backupCodes) {
        this.backupCodes = backupCodes;
    }
}
