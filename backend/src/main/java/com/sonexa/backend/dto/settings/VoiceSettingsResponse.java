package com.sonexa.backend.dto.settings;

public class VoiceSettingsResponse {

    private String preferredVoice;
    private double voiceSpeed;
    private boolean transcriptionEnabled;
    private boolean autoTranscribe;
    private String transcriptionLanguage;

    // Constructors
    public VoiceSettingsResponse() {
    }

    public VoiceSettingsResponse(String preferredVoice, double voiceSpeed, boolean transcriptionEnabled,
            boolean autoTranscribe, String transcriptionLanguage) {
        this.preferredVoice = preferredVoice;
        this.voiceSpeed = voiceSpeed;
        this.transcriptionEnabled = transcriptionEnabled;
        this.autoTranscribe = autoTranscribe;
        this.transcriptionLanguage = transcriptionLanguage;
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
