package com.sonexa.backend.dto;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class VoiceMessageCommentRequest {

    @NotBlank(message = "Comment content is required")
    @Size(max = 2000, message = "Comment cannot exceed 2000 characters")
    private String content;

    private UUID parentCommentId; // For threaded comments (optional)

    // Constructors
    public VoiceMessageCommentRequest() {
    }

    public VoiceMessageCommentRequest(String content, UUID parentCommentId) {
        this.content = content;
        this.parentCommentId = parentCommentId;
    }

    // Getters and Setters
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
}
