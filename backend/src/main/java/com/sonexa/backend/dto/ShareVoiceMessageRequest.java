package com.sonexa.backend.dto;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ShareVoiceMessageRequest {

    @NotBlank(message = "Voice message ID is required")
    private String voiceMessageId;

    @NotNull(message = "Team ID is required")
    private UUID teamId;

    @Size(max = 500, message = "Notes cannot exceed 500 characters")
    private String notes;

    // Constructors
    public ShareVoiceMessageRequest() {
    }

    public ShareVoiceMessageRequest(String voiceMessageId, UUID teamId, String notes) {
        this.voiceMessageId = voiceMessageId;
        this.teamId = teamId;
        this.notes = notes;
    }

    // Getters and Setters
    public String getVoiceMessageId() {
        return voiceMessageId;
    }

    public void setVoiceMessageId(String voiceMessageId) {
        this.voiceMessageId = voiceMessageId;
    }

    public UUID getTeamId() {
        return teamId;
    }

    public void setTeamId(UUID teamId) {
        this.teamId = teamId;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
