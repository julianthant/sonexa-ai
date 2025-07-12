package com.sonexa.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sonexa.backend.dto.IncomingEmailRequest;
import com.sonexa.backend.model.RecentActivity;
import com.sonexa.backend.model.User;
import com.sonexa.backend.model.VoiceMessage;
import com.sonexa.backend.repository.RecentActivityRepository;
import com.sonexa.backend.repository.VoiceMessageRepository;

@RestController
@RequestMapping("/api/email-inbox")
public class EmailInboxController {

    @Autowired
    private VoiceMessageRepository voiceMessageRepository;

    @Autowired
    private RecentActivityRepository recentActivityRepository;

    /**
     * Webhook endpoint for incoming emails to voice+{voiceMessageId}@sonexa.ai
     * This would be called by your email service when emails are received
     */
    @PostMapping("/incoming")
    public ResponseEntity<String> handleIncomingEmail(@RequestBody IncomingEmailRequest request) {
        try {
            // Extract voice message ID from email address (e.g., voice+sonexa-vm-12345-abcdef@sonexa.ai)
            String voiceMessageId = extractVoiceMessageId(request.getToEmail());

            if (voiceMessageId == null) {
                return ResponseEntity.badRequest().body("Invalid email format");
            }

            // Find the voice message and its owner
            Optional<VoiceMessage> voiceMessageOpt = voiceMessageRepository.findByVoiceMessageId(voiceMessageId);
            if (voiceMessageOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            VoiceMessage voiceMessage = voiceMessageOpt.get();
            User owner = voiceMessage.getUser();

            // Create recent activity for the email verification
            createEmailVerificationActivity(owner, voiceMessageId, request);

            return ResponseEntity.ok("Email processed successfully");

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error processing email: " + e.getMessage());
        }
    }

    private String extractVoiceMessageId(String email) {
        // Extract from format: voice+sonexa-vm-12345-abcdef@sonexa.ai
        if (!email.startsWith("voice+") || !email.contains("@")) {
            return null;
        }

        String beforeAt = email.substring(0, email.indexOf("@"));
        String afterPlus = beforeAt.substring(6); // Remove "voice+"

        // Validate it's a voice message ID format
        if (afterPlus.startsWith("sonexa-vm-") && afterPlus.matches("sonexa-vm-\\d{5}-[a-z0-9]{6}")) {
            return afterPlus;
        }

        return null;
    }

    private void createEmailVerificationActivity(User owner, String voiceMessageId, IncomingEmailRequest request) {
        // Create activity for new email verification attempt
        RecentActivity activity = new RecentActivity(
                owner,
                RecentActivity.ActivityType.EMAIL_VERIFICATION,
                RecentActivity.ActivityStatus.PENDING,
                "New email verification",
                "Email received from " + request.getFromEmail() + " for voice message verification",
                voiceMessageId,
                null,
                "Mail"
        );

        // Add metadata about the email
        activity.setMetadata(String.format(
                "{\"fromEmail\":\"%s\", \"subject\":\"%s\", \"timestamp\":\"%s\"}",
                request.getFromEmail(),
                request.getSubject(),
                java.time.LocalDateTime.now().toString()
        ));

        recentActivityRepository.save(activity);

        // TODO: In a real implementation, you would:
        // 1. Generate and send a security code back to the sender
        // 2. Store the verification attempt in EmailVerification table
        // 3. Set expiration time for the verification
        System.out.println("Email verification activity created for voice message: " + voiceMessageId);
        System.out.println("From: " + request.getFromEmail());
        System.out.println("Subject: " + request.getSubject());
    }
}
