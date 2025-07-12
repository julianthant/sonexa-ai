package com.sonexa.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sonexa.backend.model.EmailVerification;
import com.sonexa.backend.model.VerificationStatus;
import com.sonexa.backend.repository.EmailVerificationRepository;

@Service
@Transactional
public class EmailVerificationService {

    @Autowired
    private EmailVerificationRepository emailVerificationRepository;

    public EmailVerification initiateVerification(String senderEmail, String voiceMessageId) {
        // Check if there's already a pending verification for this email
        Optional<EmailVerification> existingVerification = emailVerificationRepository
                .findActivePendingVerification(senderEmail, LocalDateTime.now());

        if (existingVerification.isPresent()) {
            // If there's an active verification, return it instead of creating a new one
            return existingVerification.get();
        }

        // Generate 6-digit verification code
        String verificationCode = generateVerificationCode();

        EmailVerification verification = new EmailVerification(senderEmail, verificationCode, voiceMessageId);
        return emailVerificationRepository.save(verification);
    }

    public boolean verifyCode(String senderEmail, String code) {
        Optional<EmailVerification> verificationOpt = emailVerificationRepository
                .findActivePendingVerification(senderEmail, LocalDateTime.now());

        if (verificationOpt.isEmpty()) {
            return false;
        }

        EmailVerification verification = verificationOpt.get();

        if (!verification.canAttempt()) {
            verification.setStatus(VerificationStatus.FAILED);
            emailVerificationRepository.save(verification);
            return false;
        }

        verification.incrementAttempts();

        if (verification.getVerificationCode().equals(code)) {
            verification.setStatus(VerificationStatus.VERIFIED);
            verification.setVerifiedAt(LocalDateTime.now());
            emailVerificationRepository.save(verification);
            return true;
        } else {
            if (verification.getAttempts() >= verification.getMaxAttempts()) {
                verification.setStatus(VerificationStatus.FAILED);
            }
            emailVerificationRepository.save(verification);
            return false;
        }
    }

    public Optional<EmailVerification> getPendingVerification(String senderEmail) {
        return emailVerificationRepository.findActivePendingVerification(senderEmail, LocalDateTime.now());
    }

    public boolean isEmailVerified(String senderEmail) {
        return emailVerificationRepository.existsBySenderEmailAndStatus(senderEmail, VerificationStatus.VERIFIED);
    }

    public List<EmailVerification> getVerificationHistory(String senderEmail) {
        return emailVerificationRepository.findBySenderEmailOrderByCreatedAtDesc(senderEmail);
    }

    @Transactional
    public void cleanupExpiredVerifications() {
        List<EmailVerification> expiredVerifications = emailVerificationRepository
                .findExpiredVerifications(VerificationStatus.PENDING, LocalDateTime.now());

        for (EmailVerification verification : expiredVerifications) {
            verification.setStatus(VerificationStatus.EXPIRED);
        }

        emailVerificationRepository.saveAll(expiredVerifications);
    }

    private String generateVerificationCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000); // Generate 6-digit number
        return String.valueOf(code);
    }

    public EmailVerification getVerificationByVoiceMessageId(String voiceMessageId) {
        return emailVerificationRepository
                .findByVoiceMessageIdAndStatus(voiceMessageId, VerificationStatus.PENDING)
                .orElse(null);
    }

    public boolean shouldProcessEmail(String senderEmail) {
        // Check if the sender email has been verified before
        return isEmailVerified(senderEmail);
    }
}
