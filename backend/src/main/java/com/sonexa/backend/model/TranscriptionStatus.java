package com.sonexa.backend.model;

/**
 * Enhanced TranscriptionStatus that tracks all possible states of a voice
 * message.
 *
 * WORKFLOW STATES: - PENDING: Just received, waiting for AI analysis -
 * IN_PROGRESS: Currently being processed by AI or transcription service -
 * COMPLETED: Successfully transcribed and added to Excel
 *
 * REJECTION STATES (message kept for audit, but not transcribed): - All
 * REJECTED_* statuses mean the file is preserved but marked as spam/invalid
 *
 * REVIEW STATES: - QUARANTINED_*: AI wasn't confident, needs human review
 */
public enum TranscriptionStatus {
    // Normal processing workflow
    PENDING, // Just received, waiting for analysis
    IN_PROGRESS, // AI is analyzing or transcribing
    COMPLETED, // Successfully transcribed

    // Rejection categories (file kept, but marked as rejected)
    REJECTED_SPAM, // AI detected spam/marketing content
    REJECTED_GIBBERISH, // Not real human speech (noise, music, etc.)
    REJECTED_DUPLICATE, // Same message already received
    REJECTED_INAPPROPRIATE, // Contains profanity, threats, etc.
    REJECTED_TECHNICAL_ERROR, // Corrupted file, unsupported format
    REJECTED_SUSPICIOUS_SENDER, // Sender appears to be malicious
    REJECTED_LOW_QUALITY, // Audio too poor to transcribe reliably
    REJECTED_USAGE_LIMIT_EXCEEDED, // User hit their monthly message limit
    REJECTED_SUBSCRIPTION_EXPIRED, // User's payment failed or subscription ended

    // Manual review needed (rare cases where AI isn't confident)
    QUARANTINED_PENDING_REVIEW, // Waiting for admin to decide
    QUARANTINED_APPROVED, // Admin said it's good, process it
    QUARANTINED_REJECTED, // Admin said it's bad, reject it

    // Legacy status for backwards compatibility
    FAILED                          // Old generic failure status
}
