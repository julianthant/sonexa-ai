package com.sonexa.backend.model;

/**
 * Detailed reasons why a voice message was rejected. Each reason includes a
 * user-friendly description that explains the problem clearly.
 *
 * This helps users understand what went wrong and how to fix it. It also helps
 * admins analyze patterns and improve the AI over time.
 */
public enum RejectionReason {

    // ==================== CONTENT QUALITY ISSUES ====================
    GIBBERISH_CONTENT(
            "The audio contains unintelligible speech, random sounds, or no recognizable words",
            "Try recording in a quiet environment and speak clearly"
    ),
    NO_SPEECH_DETECTED(
            "No human speech was detected in the audio file",
            "Make sure you're speaking into the microphone and the file isn't just silence"
    ),
    POOR_AUDIO_QUALITY(
            "The audio quality is too low for reliable transcription",
            "Record in a quieter environment or closer to the microphone"
    ),
    TOO_MUCH_BACKGROUND_NOISE(
            "Background noise is overwhelming the speech",
            "Find a quieter location or use a better microphone"
    ),
    AUDIO_TOO_SHORT(
            "The voice message is too short (less than 2 seconds)",
            "Please record a longer message with your complete thought"
    ),
    AUDIO_TOO_LONG(
            "The voice message exceeds the maximum duration (10 minutes)",
            "Please break your message into shorter segments"
    ),
    // ==================== SPAM DETECTION ====================
    MARKETING_SPAM(
            "The message appears to be promotional or marketing content",
            "This service is for legitimate business communication only"
    ),
    REPETITIVE_CONTENT(
            "You've sent the same or very similar message multiple times",
            "Avoid sending duplicate messages"
    ),
    BULK_SENDER_PATTERN(
            "Your sending pattern indicates automated or bulk messaging",
            "Send messages individually and space them out over time"
    ),
    AUTOMATED_VOICE(
            "The voice appears to be artificially generated or robotic",
            "Please use your real voice, not text-to-speech software"
    ),
    // ==================== DUPLICATE DETECTION ====================
    EXACT_DUPLICATE(
            "This exact audio file has already been processed",
            "This appears to be a duplicate submission"
    ),
    NEAR_DUPLICATE(
            "This message is very similar to one you recently sent",
            "If this is a new message, try varying your wording"
    ),
    REPEATED_MESSAGE(
            "You've sent the same message content multiple times",
            "We received your previous message - no need to resend"
    ),
    // ==================== CONTENT POLICY VIOLATIONS ====================
    INAPPROPRIATE_LANGUAGE(
            "The message contains profanity or inappropriate language",
            "Please use professional language in your messages"
    ),
    THREATENING_CONTENT(
            "The message contains threats or aggressive language",
            "Please communicate respectfully and professionally"
    ),
    PRIVATE_INFORMATION(
            "The message contains sensitive personal information (SSN, credit cards, etc.)",
            "Don't include sensitive data in voice messages for security reasons"
    ),
    COPYRIGHTED_CONTENT(
            "The audio contains copyrighted music or material",
            "Please only include your own voice and content"
    ),
    // ==================== SENDER TRUST ISSUES ====================
    UNTRUSTED_NEW_SENDER(
            "New senders require verification before their messages are processed",
            "Check your email for a verification link to confirm your identity"
    ),
    SENDER_BLACKLISTED(
            "Your email address has been flagged for previous violations",
            "Contact support if you believe this is an error"
    ),
    SUSPICIOUS_EMAIL_PATTERN(
            "Your email address matches suspicious patterns",
            "Use a recognizable business or personal email address"
    ),
    RATE_LIMIT_EXCEEDED(
            "You've exceeded the maximum number of messages allowed per hour",
            "Please wait before sending additional messages"
    ),
    // ==================== TECHNICAL ISSUES ====================
    CORRUPTED_AUDIO_FILE(
            "The audio file appears to be corrupted or damaged",
            "Try re-recording and sending again"
    ),
    UNSUPPORTED_FORMAT(
            "This audio format is not supported",
            "Please use common formats like MP3, WAV, or M4A"
    ),
    FILE_SIZE_VIOLATION(
            "The file size is outside acceptable limits",
            "Keep files between 1KB and 50MB"
    ),
    PROCESSING_ERROR(
            "A technical error occurred during analysis",
            "This is our fault - please try again in a few minutes"
    ),
    // ==================== SECURITY CONCERNS ====================
    POTENTIAL_SECURITY_THREAT(
            "The file was flagged as a potential security risk",
            "Make sure you're sending legitimate audio files only"
    ),
    SUSPICIOUS_ATTACHMENT(
            "The email contained suspicious attachments",
            "Only include audio files, no executables or scripts"
    ),
    MALWARE_DETECTED(
            "Security scanning detected potential malware",
            "Scan your device for viruses and try again"
    ),
    // ==================== BUSINESS RULES ====================
    OUTSIDE_BUSINESS_HOURS(
            "Messages are only processed during business hours",
            "Your message will be processed when business hours resume"
    ),
    GEOGRAPHIC_RESTRICTION(
            "Your location is not currently supported",
            "Contact support for information about service in your area"
    ),
    SUBSCRIPTION_EXPIRED(
            "Your subscription has expired or payment failed",
            "Please update your payment information to continue using the service"
    ),
    FEATURE_NOT_ENABLED(
            "Email-based voice message uploads are not enabled for your account",
            "Contact support to enable this feature"
    );

    private final String description;
    private final String userGuidance;

    RejectionReason(String description, String userGuidance) {
        this.description = description;
        this.userGuidance = userGuidance;
    }

    /**
     * Technical description of why the message was rejected
     */
    public String getDescription() {
        return description;
    }

    /**
     * User-friendly guidance on how to fix the problem
     */
    public String getUserGuidance() {
        return userGuidance;
    }

    /**
     * Creates a complete user-friendly explanation
     */
    public String getFullExplanation() {
        return String.format("ISSUE: %s\n\nHOW TO FIX: %s", description, userGuidance);
    }
}
