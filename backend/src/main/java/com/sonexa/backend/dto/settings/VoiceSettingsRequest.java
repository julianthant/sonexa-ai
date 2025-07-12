package com.sonexa.backend.dto.settings;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public class VoiceSettingsRequest {

    @Size(max = 20, message = "Preferred voice must be less than 20 characters")
    private String preferredVoice;

    @Min(value = 0, message = "Voice speed must be at least 0.5")
    @Max(value = 2, message = "Voice speed must be at most 2.0")
    private double voiceSpeed;

    private boolean transcriptionEnabled;
    private boolean autoTranscribe;

    @Size(max = 10, message = "Transcription language must be less than 10 characters")
    private String transcriptionLanguage;

    // Constructors
    public VoiceSettingsRequest() {
    }

    // Getters and Setters
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
}
