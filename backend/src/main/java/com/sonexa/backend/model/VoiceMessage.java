package com.sonexa.backend.model;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "voice_messages")
public class VoiceMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String voiceMessageId; // Format: sonexa-vm-{5digits}-{6chars}

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String fromNumber;

    @Column(nullable = false)
    private String toNumber; // The custom voice email converted to number

    @Column(nullable = false)
    private String messageContent;

    @Column
    private String audioFileUrl; // URL to the voice message audio file

    @Column
    private Integer duration; // Duration in seconds

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MessageStatus status = MessageStatus.RECEIVED;

    @Enumerated(EnumType.STRING)
    @Column
    private MessageResponse response;

    @Column
    private String responseText;

    @Column
    private String aiAnalysis; // AI analysis of the voice message

    @Column(nullable = false)
    private LocalDateTime receivedAt;

    @Column
    private LocalDateTime respondedAt;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public enum MessageStatus {
        RECEIVED,
        PROCESSING,
        ANALYZED,
        RESPONDED,
        ARCHIVED
    }

    public enum MessageResponse {
        POSITIVE,
        NEGATIVE,
        NEUTRAL,
        ESCALATE,
        CALLBACK_REQUESTED,
        INFORMATION_PROVIDED
    }

    // Constructors
    public VoiceMessage() {
    }

    public VoiceMessage(User user, String fromNumber, String toNumber, String messageContent) {
        this.user = user;
        this.fromNumber = fromNumber;
        this.toNumber = toNumber;
        this.messageContent = messageContent;
        this.receivedAt = LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (receivedAt == null) {
            receivedAt = LocalDateTime.now();
        }
        if (voiceMessageId == null) {
            voiceMessageId = generateVoiceMessageId();
        }
    }

    // Generate voice message ID in format: sonexa-vm-{5digits}-{6chars}
    private String generateVoiceMessageId() {
        String digits = String.format("%05d", (int) (Math.random() * 100000));
        String chars = "";
        String characters = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (int i = 0; i < 6; i++) {
            chars += characters.charAt((int) (Math.random() * characters.length()));
        }
        return "sonexa-vm-" + digits + "-" + chars;
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

    public String getVoiceMessageId() {
        return voiceMessageId;
    }

    public void setVoiceMessageId(String voiceMessageId) {
        this.voiceMessageId = voiceMessageId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getFromNumber() {
        return fromNumber;
    }

    public void setFromNumber(String fromNumber) {
        this.fromNumber = fromNumber;
    }

    public String getToNumber() {
        return toNumber;
    }

    public void setToNumber(String toNumber) {
        this.toNumber = toNumber;
    }

    public String getMessageContent() {
        return messageContent;
    }

    public void setMessageContent(String messageContent) {
        this.messageContent = messageContent;
    }

    public String getAudioFileUrl() {
        return audioFileUrl;
    }

    public void setAudioFileUrl(String audioFileUrl) {
        this.audioFileUrl = audioFileUrl;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public MessageStatus getStatus() {
        return status;
    }

    public void setStatus(MessageStatus status) {
        this.status = status;
    }

    public MessageResponse getResponse() {
        return response;
    }

    public void setResponse(MessageResponse response) {
        this.response = response;
        if (response != null && respondedAt == null) {
            respondedAt = LocalDateTime.now();
        }
    }

    public String getResponseText() {
        return responseText;
    }

    public void setResponseText(String responseText) {
        this.responseText = responseText;
    }

    public String getAiAnalysis() {
        return aiAnalysis;
    }

    public void setAiAnalysis(String aiAnalysis) {
        this.aiAnalysis = aiAnalysis;
    }

    public LocalDateTime getReceivedAt() {
        return receivedAt;
    }

    public void setReceivedAt(LocalDateTime receivedAt) {
        this.receivedAt = receivedAt;
    }

    public LocalDateTime getRespondedAt() {
        return respondedAt;
    }

    public void setRespondedAt(LocalDateTime respondedAt) {
        this.respondedAt = respondedAt;
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
