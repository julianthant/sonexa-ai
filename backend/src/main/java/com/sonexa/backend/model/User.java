package com.sonexa.backend.model;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "users") // 'user' is a reserved keyword in some DBs
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column
    private String company;

    @Column
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id")
    private Organization organization;

    @Column(unique = true)
    private String customVoiceEmail;  // "john@voice.sonexa.ai"

    @Column
    private String timezone;

    // Notification preferences
    @Column
    private boolean emailNotifications = true;

    @Column
    private boolean pushNotifications = true;

    @Column
    private boolean smsNotifications = false;

    @Column
    private boolean voiceNotifications = true;

    @Column
    private boolean marketingEmails = false;

    @Column
    private boolean securityAlerts = true;

    // Privacy & Security settings
    @Column
    private boolean profileVisibility = true;

    @Column
    private boolean dataCollection = true;

    @Column
    private boolean analyticsTracking = true;

    @Column
    private boolean thirdPartySharing = false;

    @Column
    private boolean twoFactorEnabled = false;

    @Column
    private String twoFactorSecret;

    @Column
    private boolean sessionTimeout = true;

    @Column
    private int sessionTimeoutMinutes = 30;

    // Regional settings
    @Column
    private String language = "en";

    @Column
    private String currency = "USD";

    @Column
    private String dateFormat = "MM/dd/yyyy";

    @Column
    private String timeFormat = "12h";

    // Voice settings
    @Column
    private String preferredVoice = "alloy";

    @Column
    private double voiceSpeed = 1.0;

    @Column
    private boolean transcriptionEnabled = true;

    @Column
    private boolean autoTranscribe = true;

    @Column
    private String transcriptionLanguage = "en";

    // Email integration settings
    @Column
    private String gmailAccessToken;

    @Column
    private String outlookAccessToken;

    @Column
    private boolean emailIntegrationEnabled = false;

    @Column
    private String primaryEmailService;

    // Storage preferences
    @Column
    private long storageQuotaBytes = 5368709120L; // 5GB default

    @Column
    private long storageUsedBytes = 0L;

    @Column
    private boolean autoDeleteOldFiles = false;

    @Column
    private int autoDeleteDays = 30;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // Constructors
    public User() {
    }

    public User(String email, String password, Role role, String firstName, String lastName) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFullName() {
        return firstName + " " + lastName;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public String getCustomVoiceEmail() {
        return customVoiceEmail;
    }

    public void setCustomVoiceEmail(String customVoiceEmail) {
        this.customVoiceEmail = customVoiceEmail;
    }

    public String getTimezone() {
        return timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }

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

    public String getTwoFactorSecret() {
        return twoFactorSecret;
    }

    public void setTwoFactorSecret(String twoFactorSecret) {
        this.twoFactorSecret = twoFactorSecret;
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

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getDateFormat() {
        return dateFormat;
    }

    public void setDateFormat(String dateFormat) {
        this.dateFormat = dateFormat;
    }

    public String getTimeFormat() {
        return timeFormat;
    }

    public void setTimeFormat(String timeFormat) {
        this.timeFormat = timeFormat;
    }

    public String getPreferredVoice() {
        return preferredVoice;
    }

    public void setPreferredVoice(String preferredVoice) {
        this.preferredVoice = preferredVoice;
    }

    public double getVoiceSpeed() {
        return voiceSpeed;
    }

    public void setVoiceSpeed(double voiceSpeed) {
        this.voiceSpeed = voiceSpeed;
    }

    public boolean isTranscriptionEnabled() {
        return transcriptionEnabled;
    }

    public void setTranscriptionEnabled(boolean transcriptionEnabled) {
        this.transcriptionEnabled = transcriptionEnabled;
    }

    public boolean isAutoTranscribe() {
        return autoTranscribe;
    }

    public void setAutoTranscribe(boolean autoTranscribe) {
        this.autoTranscribe = autoTranscribe;
    }

    public String getTranscriptionLanguage() {
        return transcriptionLanguage;
    }

    public void setTranscriptionLanguage(String transcriptionLanguage) {
        this.transcriptionLanguage = transcriptionLanguage;
    }

    public String getGmailAccessToken() {
        return gmailAccessToken;
    }

    public void setGmailAccessToken(String gmailAccessToken) {
        this.gmailAccessToken = gmailAccessToken;
    }

    public String getOutlookAccessToken() {
        return outlookAccessToken;
    }

    public void setOutlookAccessToken(String outlookAccessToken) {
        this.outlookAccessToken = outlookAccessToken;
    }

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

    public long getStorageQuotaBytes() {
        return storageQuotaBytes;
    }

    public void setStorageQuotaBytes(long storageQuotaBytes) {
        this.storageQuotaBytes = storageQuotaBytes;
    }

    public long getStorageUsedBytes() {
        return storageUsedBytes;
    }

    public void setStorageUsedBytes(long storageUsedBytes) {
        this.storageUsedBytes = storageUsedBytes;
    }

    public boolean isAutoDeleteOldFiles() {
        return autoDeleteOldFiles;
    }

    public void setAutoDeleteOldFiles(boolean autoDeleteOldFiles) {
        this.autoDeleteOldFiles = autoDeleteOldFiles;
    }

    public int getAutoDeleteDays() {
        return autoDeleteDays;
    }

    public void setAutoDeleteDays(int autoDeleteDays) {
        this.autoDeleteDays = autoDeleteDays;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
