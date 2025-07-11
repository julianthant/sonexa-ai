package com.sonexa.backend.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "voice_files")
public class VoiceFile {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String originalFilename;

    @Column(nullable = false)
    private String contentType;

    @Column(nullable = false)
    private Long fileSize;

    @Column(nullable = false)
    private String azureBlobUrl;

    @Column(nullable = false)
    private String userEmail;

    @Column(nullable = false)
    private LocalDateTime uploadedAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TranscriptionStatus transcriptionStatus;

    @Column(columnDefinition = "TEXT")
    private String transcriptionText;

    @Column
    private LocalDateTime transcribedAt;

    // Email-specific fields for voice messages received via email
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UploadSource uploadSource;

    @Column
    private String senderEmail;  // Original sender's email (for forwarded messages)

    @Column
    private String emailSubject; // Email subject line

    @Column(columnDefinition = "TEXT")
    private String emailBody;    // Email body content

    @Column
    private String customUserEmail; // user123@voice.sonexa.ai

    // AI Analysis and Processing Fields
    @Column
    private Double aiConfidenceScore; // How confident the AI is about its decision (0.0-1.0)

    @Column(columnDefinition = "TEXT")
    private String aiAnalysisDetails; // JSON string with detailed AI analysis results

    @Column
    private String aiModelsUsed; // Which AI services were used (e.g., "Azure Speech, OpenAI GPT-4")

    @Column
    private String audioFingerprint; // Unique hash for duplicate detection

    // Subscription and Billing Context
    @Enumerated(EnumType.STRING)
    @Column
    private SubscriptionTier userSubscriptionTier; // What tier the user had when this was processed

    @Column
    private Boolean usedAdvancedAI; // Whether expensive AI was used for this file

    @Column
    private BigDecimal processingCost; // How much this message cost to process

    // Processing Audit Trail
    @Column(nullable = false)
    private LocalDateTime processedAt; // When AI analysis completed

    @Column(nullable = false)
    private String processedBy; // "AI_SYSTEM", "ADMIN_MANUAL", etc.

    @Column
    private Integer processingAttempts; // How many times we tried to process this

    // User Communication Tracking
    @Column
    private Boolean userNotified; // Whether we told the user about the result

    @Column
    private LocalDateTime userNotifiedAt; // When we sent the notification

    @Column
    private String notificationMethod; // "EMAIL", "DASHBOARD", "SMS"

    @Column
    private String notificationDetails; // What we told the user

    // Constructors
    public VoiceFile() {
    }

    public VoiceFile(String originalFilename, String contentType, Long fileSize,
            String azureBlobUrl, String userEmail) {
        this.originalFilename = originalFilename;
        this.contentType = contentType;
        this.fileSize = fileSize;
        this.azureBlobUrl = azureBlobUrl;
        this.userEmail = userEmail;
        this.uploadedAt = LocalDateTime.now();
        this.transcriptionStatus = TranscriptionStatus.PENDING;
        this.uploadSource = UploadSource.DIRECT_UPLOAD; // Default for direct uploads
    }

    // Constructor for email-based uploads
    public VoiceFile(String originalFilename, String contentType, Long fileSize,
            String azureBlobUrl, String userEmail, UploadSource uploadSource,
            String senderEmail, String emailSubject, String emailBody, String customUserEmail) {
        this.originalFilename = originalFilename;
        this.contentType = contentType;
        this.fileSize = fileSize;
        this.azureBlobUrl = azureBlobUrl;
        this.userEmail = userEmail;
        this.uploadedAt = LocalDateTime.now();
        this.transcriptionStatus = TranscriptionStatus.PENDING;
        this.uploadSource = uploadSource;
        this.senderEmail = senderEmail;
        this.emailSubject = emailSubject;
        this.emailBody = emailBody;
        this.customUserEmail = customUserEmail;
    }

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getOriginalFilename() {
        return originalFilename;
    }

    public void setOriginalFilename(String originalFilename) {
        this.originalFilename = originalFilename;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public String getAzureBlobUrl() {
        return azureBlobUrl;
    }

    public void setAzureBlobUrl(String azureBlobUrl) {
        this.azureBlobUrl = azureBlobUrl;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(LocalDateTime uploadedAt) {
        this.uploadedAt = uploadedAt;
    }

    public TranscriptionStatus getTranscriptionStatus() {
        return transcriptionStatus;
    }

    public void setTranscriptionStatus(TranscriptionStatus transcriptionStatus) {
        this.transcriptionStatus = transcriptionStatus;
    }

    public String getTranscriptionText() {
        return transcriptionText;
    }

    public void setTranscriptionText(String transcriptionText) {
        this.transcriptionText = transcriptionText;
        this.transcribedAt = LocalDateTime.now();
        this.transcriptionStatus = TranscriptionStatus.COMPLETED;
    }

    public LocalDateTime getTranscribedAt() {
        return transcribedAt;
    }

    public void setTranscribedAt(LocalDateTime transcribedAt) {
        this.transcribedAt = transcribedAt;
    }

    public UploadSource getUploadSource() {
        return uploadSource;
    }

    public void setUploadSource(UploadSource uploadSource) {
        this.uploadSource = uploadSource;
    }

    public String getSenderEmail() {
        return senderEmail;
    }

    public void setSenderEmail(String senderEmail) {
        this.senderEmail = senderEmail;
    }

    public String getEmailSubject() {
        return emailSubject;
    }

    public void setEmailSubject(String emailSubject) {
        this.emailSubject = emailSubject;
    }

    public String getEmailBody() {
        return emailBody;
    }

    public void setEmailBody(String emailBody) {
        this.emailBody = emailBody;
    }

    public String getCustomUserEmail() {
        return customUserEmail;
    }

    public void setCustomUserEmail(String customUserEmail) {
        this.customUserEmail = customUserEmail;
    }

    // AI Analysis Fields Getters and Setters
    public Double getAiConfidenceScore() {
        return aiConfidenceScore;
    }

    public void setAiConfidenceScore(Double aiConfidenceScore) {
        this.aiConfidenceScore = aiConfidenceScore;
    }

    public String getAiAnalysisDetails() {
        return aiAnalysisDetails;
    }

    public void setAiAnalysisDetails(String aiAnalysisDetails) {
        this.aiAnalysisDetails = aiAnalysisDetails;
    }

    public String getAiModelsUsed() {
        return aiModelsUsed;
    }

    public void setAiModelsUsed(String aiModelsUsed) {
        this.aiModelsUsed = aiModelsUsed;
    }

    public String getAudioFingerprint() {
        return audioFingerprint;
    }

    public void setAudioFingerprint(String audioFingerprint) {
        this.audioFingerprint = audioFingerprint;
    }

    // Subscription Fields Getters and Setters
    public SubscriptionTier getUserSubscriptionTier() {
        return userSubscriptionTier;
    }

    public void setUserSubscriptionTier(SubscriptionTier userSubscriptionTier) {
        this.userSubscriptionTier = userSubscriptionTier;
    }

    public Boolean getUsedAdvancedAI() {
        return usedAdvancedAI;
    }

    public void setUsedAdvancedAI(Boolean usedAdvancedAI) {
        this.usedAdvancedAI = usedAdvancedAI;
    }

    public BigDecimal getProcessingCost() {
        return processingCost;
    }

    public void setProcessingCost(BigDecimal processingCost) {
        this.processingCost = processingCost;
    }

    // Processing Audit Fields Getters and Setters
    public LocalDateTime getProcessedAt() {
        return processedAt;
    }

    public void setProcessedAt(LocalDateTime processedAt) {
        this.processedAt = processedAt;
    }

    public String getProcessedBy() {
        return processedBy;
    }

    public void setProcessedBy(String processedBy) {
        this.processedBy = processedBy;
    }

    public Integer getProcessingAttempts() {
        return processingAttempts;
    }

    public void setProcessingAttempts(Integer processingAttempts) {
        this.processingAttempts = processingAttempts;
    }

    // User Communication Fields Getters and Setters
    public Boolean getUserNotified() {
        return userNotified;
    }

    public void setUserNotified(Boolean userNotified) {
        this.userNotified = userNotified;
    }

    public LocalDateTime getUserNotifiedAt() {
        return userNotifiedAt;
    }

    public void setUserNotifiedAt(LocalDateTime userNotifiedAt) {
        this.userNotifiedAt = userNotifiedAt;
    }

    public String getNotificationMethod() {
        return notificationMethod;
    }

    public void setNotificationMethod(String notificationMethod) {
        this.notificationMethod = notificationMethod;
    }

    public String getNotificationDetails() {
        return notificationDetails;
    }

    public void setNotificationDetails(String notificationDetails) {
        this.notificationDetails = notificationDetails;
    }
}
