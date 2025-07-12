package com.sonexa.backend.model;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "voice_message_comments")
public class VoiceMessageComment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "shared_voice_message_id", nullable = false)
    private SharedVoiceMessage sharedVoiceMessage;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @Column(nullable = false, length = 2000)
    private String content;

    @Column
    private UUID parentCommentId; // For threaded comments

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // Constructors
    public VoiceMessageComment() {
    }

    public VoiceMessageComment(SharedVoiceMessage sharedVoiceMessage, User author, String content) {
        this.sharedVoiceMessage = sharedVoiceMessage;
        this.author = author;
        this.content = content;
    }

    public VoiceMessageComment(SharedVoiceMessage sharedVoiceMessage, User author, String content, UUID parentCommentId) {
        this.sharedVoiceMessage = sharedVoiceMessage;
        this.author = author;
        this.content = content;
        this.parentCommentId = parentCommentId;
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

    public SharedVoiceMessage getSharedVoiceMessage() {
        return sharedVoiceMessage;
    }

    public void setSharedVoiceMessage(SharedVoiceMessage sharedVoiceMessage) {
        this.sharedVoiceMessage = sharedVoiceMessage;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public UUID getParentCommentId() {
        return parentCommentId;
    }

    public void setParentCommentId(UUID parentCommentId) {
        this.parentCommentId = parentCommentId;
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
