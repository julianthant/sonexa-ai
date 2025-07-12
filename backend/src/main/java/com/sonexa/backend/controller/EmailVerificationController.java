package com.sonexa.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sonexa.backend.model.EmailVerification;
import com.sonexa.backend.service.EmailVerificationService;

@RestController
@RequestMapping("/api/email-verification")
@CrossOrigin(origins = "*")
public class EmailVerificationController {

    @Autowired
    private EmailVerificationService emailVerificationService;

    @PostMapping("/initiate")
    public ResponseEntity<EmailVerificationResponse> initiateVerification(@RequestBody InitiateVerificationRequest request) {
        EmailVerification verification = emailVerificationService.initiateVerification(
                request.getSenderEmail(),
                request.getVoiceMessageId()
        );

        EmailVerificationResponse response = new EmailVerificationResponse();
        response.setSuccess(true);
        response.setMessage("Verification code sent to " + request.getSenderEmail());
        response.setVoiceMessageId(verification.getVoiceMessageId());
        response.setExpiresAt(verification.getExpiresAt().toString());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify")
    public ResponseEntity<VerificationResult> verifyCode(@RequestBody VerifyCodeRequest request) {
        boolean isVerified = emailVerificationService.verifyCode(
                request.getSenderEmail(),
                request.getCode()
        );

        VerificationResult result = new VerificationResult();
        result.setVerified(isVerified);
        result.setMessage(isVerified ? "Email verified successfully" : "Invalid or expired verification code");

        return ResponseEntity.ok(result);
    }

    @GetMapping("/pending/{senderEmail}")
    public ResponseEntity<PendingVerificationResponse> getPendingVerification(@PathVariable String senderEmail) {
        Optional<EmailVerification> pendingVerification = emailVerificationService.getPendingVerification(senderEmail);

        if (pendingVerification.isPresent()) {
            EmailVerification verification = pendingVerification.get();
            PendingVerificationResponse response = new PendingVerificationResponse();
            response.setHasPending(true);
            response.setVoiceMessageId(verification.getVoiceMessageId());
            response.setExpiresAt(verification.getExpiresAt().toString());
            response.setAttempts(verification.getAttempts());
            response.setMaxAttempts(verification.getMaxAttempts());
            return ResponseEntity.ok(response);
        } else {
            PendingVerificationResponse response = new PendingVerificationResponse();
            response.setHasPending(false);
            return ResponseEntity.ok(response);
        }
    }

    @GetMapping("/status/{senderEmail}")
    public ResponseEntity<VerificationStatusResponse> getVerificationStatus(@PathVariable String senderEmail) {
        boolean isVerified = emailVerificationService.isEmailVerified(senderEmail);

        VerificationStatusResponse response = new VerificationStatusResponse();
        response.setVerified(isVerified);
        response.setSenderEmail(senderEmail);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/history/{senderEmail}")
    public ResponseEntity<List<EmailVerification>> getVerificationHistory(@PathVariable String senderEmail) {
        List<EmailVerification> history = emailVerificationService.getVerificationHistory(senderEmail);
        return ResponseEntity.ok(history);
    }

    @GetMapping("/voice-message/{voiceMessageId}")
    public ResponseEntity<EmailVerification> getVerificationByVoiceMessageId(@PathVariable String voiceMessageId) {
        EmailVerification verification = emailVerificationService.getVerificationByVoiceMessageId(voiceMessageId);

        if (verification != null) {
            return ResponseEntity.ok(verification);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Request/Response DTOs
    public static class InitiateVerificationRequest {

        private String senderEmail;
        private String voiceMessageId;

        public String getSenderEmail() {
            return senderEmail;
        }

        public void setSenderEmail(String senderEmail) {
            this.senderEmail = senderEmail;
        }

        public String getVoiceMessageId() {
            return voiceMessageId;
        }

        public void setVoiceMessageId(String voiceMessageId) {
            this.voiceMessageId = voiceMessageId;
        }
    }

    public static class VerifyCodeRequest {

        private String senderEmail;
        private String code;

        public String getSenderEmail() {
            return senderEmail;
        }

        public void setSenderEmail(String senderEmail) {
            this.senderEmail = senderEmail;
        }

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }
    }

    public static class EmailVerificationResponse {

        private boolean success;
        private String message;
        private String voiceMessageId;
        private String expiresAt;

        public boolean isSuccess() {
            return success;
        }

        public void setSuccess(boolean success) {
            this.success = success;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public String getVoiceMessageId() {
            return voiceMessageId;
        }

        public void setVoiceMessageId(String voiceMessageId) {
            this.voiceMessageId = voiceMessageId;
        }

        public String getExpiresAt() {
            return expiresAt;
        }

        public void setExpiresAt(String expiresAt) {
            this.expiresAt = expiresAt;
        }
    }

    public static class VerificationResult {

        private boolean verified;
        private String message;

        public boolean isVerified() {
            return verified;
        }

        public void setVerified(boolean verified) {
            this.verified = verified;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    public static class PendingVerificationResponse {

        private boolean hasPending;
        private String voiceMessageId;
        private String expiresAt;
        private int attempts;
        private int maxAttempts;

        public boolean isHasPending() {
            return hasPending;
        }

        public void setHasPending(boolean hasPending) {
            this.hasPending = hasPending;
        }

        public String getVoiceMessageId() {
            return voiceMessageId;
        }

        public void setVoiceMessageId(String voiceMessageId) {
            this.voiceMessageId = voiceMessageId;
        }

        public String getExpiresAt() {
            return expiresAt;
        }

        public void setExpiresAt(String expiresAt) {
            this.expiresAt = expiresAt;
        }

        public int getAttempts() {
            return attempts;
        }

        public void setAttempts(int attempts) {
            this.attempts = attempts;
        }

        public int getMaxAttempts() {
            return maxAttempts;
        }

        public void setMaxAttempts(int maxAttempts) {
            this.maxAttempts = maxAttempts;
        }
    }

    public static class VerificationStatusResponse {

        private boolean verified;
        private String senderEmail;

        public boolean isVerified() {
            return verified;
        }

        public void setVerified(boolean verified) {
            this.verified = verified;
        }

        public String getSenderEmail() {
            return senderEmail;
        }

        public void setSenderEmail(String senderEmail) {
            this.senderEmail = senderEmail;
        }
    }
}
