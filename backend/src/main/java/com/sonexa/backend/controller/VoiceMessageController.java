package com.sonexa.backend.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sonexa.backend.model.User;
import com.sonexa.backend.model.VoiceMessage;
import com.sonexa.backend.repository.UserRepository;
import com.sonexa.backend.service.VoiceMessageService;

@RestController
@RequestMapping("/api/voice-messages")
public class VoiceMessageController {

    private static final Logger logger = LoggerFactory.getLogger(VoiceMessageController.class);

    @Autowired
    private VoiceMessageService voiceMessageService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getVoiceMessages(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String response,
            @RequestParam(required = false) String search) {

        logger.info("Fetching voice messages for user: {}", userDetails.getUsername());

        try {
            User user = getUserFromDetails(userDetails);
            if (user == null) {
                return ResponseEntity.status(404).body(createErrorResponse("USER_NOT_FOUND", "User not found"));
            }

            Pageable pageable = PageRequest.of(page, size);
            Page<VoiceMessage> voiceMessages;

            if (search != null && !search.trim().isEmpty()) {
                voiceMessages = voiceMessageService.searchVoiceMessages(user, search.trim(), pageable);
            } else if (status != null && !status.trim().isEmpty()) {
                try {
                    VoiceMessage.MessageStatus messageStatus = VoiceMessage.MessageStatus.valueOf(status.toUpperCase());
                    voiceMessages = voiceMessageService.getVoiceMessagesByStatus(user, messageStatus, pageable);
                } catch (IllegalArgumentException e) {
                    return ResponseEntity.status(400).body(createErrorResponse("INVALID_STATUS", "Invalid status parameter"));
                }
            } else if (response != null && !response.trim().isEmpty()) {
                try {
                    VoiceMessage.MessageResponse messageResponse = VoiceMessage.MessageResponse.valueOf(response.toUpperCase());
                    voiceMessages = voiceMessageService.getVoiceMessagesByResponse(user, messageResponse, pageable);
                } catch (IllegalArgumentException e) {
                    return ResponseEntity.status(400).body(createErrorResponse("INVALID_RESPONSE", "Invalid response parameter"));
                }
            } else {
                voiceMessages = voiceMessageService.getVoiceMessagesForUser(user, pageable);
            }

            return ResponseEntity.ok(voiceMessages);

        } catch (Exception e) {
            logger.error("Error fetching voice messages for user: {} - {}", userDetails.getUsername(), e.getMessage(), e);
            return ResponseEntity.status(500).body(createErrorResponse("FETCH_FAILED", "Failed to fetch voice messages"));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getVoiceMessage(@AuthenticationPrincipal UserDetails userDetails, @PathVariable UUID id) {
        logger.info("Fetching voice message {} for user: {}", id, userDetails.getUsername());

        try {
            User user = getUserFromDetails(userDetails);
            if (user == null) {
                return ResponseEntity.status(404).body(createErrorResponse("USER_NOT_FOUND", "User not found"));
            }

            Optional<VoiceMessage> voiceMessage = voiceMessageService.getVoiceMessage(id, user);
            if (!voiceMessage.isPresent()) {
                return ResponseEntity.status(404).body(createErrorResponse("VOICE_MESSAGE_NOT_FOUND", "Voice message not found"));
            }

            return ResponseEntity.ok(voiceMessage.get());

        } catch (Exception e) {
            logger.error("Error fetching voice message {} for user: {} - {}", id, userDetails.getUsername(), e.getMessage(), e);
            return ResponseEntity.status(500).body(createErrorResponse("FETCH_FAILED", "Failed to fetch voice message"));
        }
    }

    @PostMapping
    public ResponseEntity<?> createVoiceMessage(@AuthenticationPrincipal UserDetails userDetails,
            @RequestBody VoiceMessageCreateRequest request) {
        logger.info("Creating voice message for user: {}", userDetails.getUsername());

        try {
            // Validate request
            if (request.getFromNumber() == null || request.getFromNumber().trim().isEmpty()) {
                return ResponseEntity.status(400).body(createErrorResponse("FROM_NUMBER_REQUIRED", "From number is required"));
            }
            if (request.getMessageContent() == null || request.getMessageContent().trim().isEmpty()) {
                return ResponseEntity.status(400).body(createErrorResponse("MESSAGE_CONTENT_REQUIRED", "Message content is required"));
            }

            User user = getUserFromDetails(userDetails);
            if (user == null) {
                return ResponseEntity.status(404).body(createErrorResponse("USER_NOT_FOUND", "User not found"));
            }

            String toNumber = user.getCustomVoiceEmail() != null ? user.getCustomVoiceEmail() : user.getEmail();
            VoiceMessage voiceMessage = voiceMessageService.createVoiceMessage(
                    user,
                    request.getFromNumber().trim(),
                    toNumber,
                    request.getMessageContent().trim()
            );

            // Set additional fields if provided
            if (request.getAudioFileUrl() != null && !request.getAudioFileUrl().trim().isEmpty()) {
                voiceMessage.setAudioFileUrl(request.getAudioFileUrl().trim());
            }
            if (request.getDuration() != null) {
                voiceMessage.setDuration(request.getDuration());
            }

            return ResponseEntity.ok(voiceMessage);

        } catch (Exception e) {
            logger.error("Error creating voice message for user: {} - {}", userDetails.getUsername(), e.getMessage(), e);
            return ResponseEntity.status(500).body(createErrorResponse("CREATE_FAILED", "Failed to create voice message"));
        }
    }

    @PutMapping("/{id}/response")
    public ResponseEntity<?> updateVoiceMessageResponse(@AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID id,
            @RequestBody VoiceMessageResponseRequest request) {
        logger.info("Updating voice message {} response for user: {}", id, userDetails.getUsername());

        try {
            // Validate request
            if (request.getResponse() == null) {
                return ResponseEntity.status(400).body(createErrorResponse("RESPONSE_REQUIRED", "Response is required"));
            }

            User user = getUserFromDetails(userDetails);
            if (user == null) {
                return ResponseEntity.status(404).body(createErrorResponse("USER_NOT_FOUND", "User not found"));
            }

            VoiceMessage.MessageResponse messageResponse;
            try {
                messageResponse = VoiceMessage.MessageResponse.valueOf(request.getResponse().toUpperCase());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.status(400).body(createErrorResponse("INVALID_RESPONSE", "Invalid response value"));
            }

            VoiceMessage voiceMessage = voiceMessageService.updateVoiceMessageResponse(
                    id, user, messageResponse, request.getResponseText()
            );

            return ResponseEntity.ok(voiceMessage);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(createErrorResponse("VOICE_MESSAGE_NOT_FOUND", e.getMessage()));
        } catch (Exception e) {
            logger.error("Error updating voice message {} response for user: {} - {}", id, userDetails.getUsername(), e.getMessage(), e);
            return ResponseEntity.status(500).body(createErrorResponse("UPDATE_FAILED", "Failed to update voice message response"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVoiceMessage(@AuthenticationPrincipal UserDetails userDetails, @PathVariable UUID id) {
        logger.info("Deleting voice message {} for user: {}", id, userDetails.getUsername());

        try {
            User user = getUserFromDetails(userDetails);
            if (user == null) {
                return ResponseEntity.status(404).body(createErrorResponse("USER_NOT_FOUND", "User not found"));
            }

            voiceMessageService.deleteVoiceMessage(id, user);
            return ResponseEntity.ok(createSuccessResponse("Voice message deleted successfully"));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(createErrorResponse("VOICE_MESSAGE_NOT_FOUND", e.getMessage()));
        } catch (Exception e) {
            logger.error("Error deleting voice message {} for user: {} - {}", id, userDetails.getUsername(), e.getMessage(), e);
            return ResponseEntity.status(500).body(createErrorResponse("DELETE_FAILED", "Failed to delete voice message"));
        }
    }

    @GetMapping("/analytics")
    public ResponseEntity<?> getVoiceMessageAnalytics(@AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(defaultValue = "30") int days) {
        logger.info("Fetching voice message analytics for user: {}", userDetails.getUsername());

        try {
            User user = getUserFromDetails(userDetails);
            if (user == null) {
                return ResponseEntity.status(404).body(createErrorResponse("USER_NOT_FOUND", "User not found"));
            }

            VoiceMessageAnalytics analytics = new VoiceMessageAnalytics();
            analytics.totalMessages = voiceMessageService.getTotalVoiceMessagesCount(user);
            analytics.receivedMessages = voiceMessageService.getVoiceMessagesCountByStatus(user, VoiceMessage.MessageStatus.RECEIVED);
            analytics.respondedMessages = voiceMessageService.getVoiceMessagesCountByStatus(user, VoiceMessage.MessageStatus.RESPONDED);
            analytics.positiveResponses = voiceMessageService.getVoiceMessagesCountByResponse(user, VoiceMessage.MessageResponse.POSITIVE);
            analytics.negativeResponses = voiceMessageService.getVoiceMessagesCountByResponse(user, VoiceMessage.MessageResponse.NEGATIVE);
            analytics.recentMessages = voiceMessageService.getRecentVoiceMessages(user, days);

            return ResponseEntity.ok(analytics);

        } catch (Exception e) {
            logger.error("Error fetching voice message analytics for user: {} - {}", userDetails.getUsername(), e.getMessage(), e);
            return ResponseEntity.status(500).body(createErrorResponse("ANALYTICS_FAILED", "Failed to fetch analytics"));
        }
    }

    // Helper methods and classes
    private User getUserFromDetails(UserDetails userDetails) {
        Optional<User> userOpt = userRepository.findByEmail(userDetails.getUsername());
        return userOpt.orElse(null);
    }

    public static class VoiceMessageCreateRequest {

        private String fromNumber;
        private String messageContent;
        private String audioFileUrl;
        private Integer duration;

        // Getters and setters
        public String getFromNumber() {
            return fromNumber;
        }

        public void setFromNumber(String fromNumber) {
            this.fromNumber = fromNumber;
        }

        public String getMessageContent() {
            return messageContent;
        }

        public void setMessageContent(String messageContent) {
            this.messageContent = messageContent;
        }

        public String getAudioFileUrl() {
            return audioFileUrl;
        }

        public void setAudioFileUrl(String audioFileUrl) {
            this.audioFileUrl = audioFileUrl;
        }

        public Integer getDuration() {
            return duration;
        }

        public void setDuration(Integer duration) {
            this.duration = duration;
        }
    }

    public static class VoiceMessageResponseRequest {

        private String response;
        private String responseText;

        public String getResponse() {
            return response;
        }

        public void setResponse(String response) {
            this.response = response;
        }

        public String getResponseText() {
            return responseText;
        }

        public void setResponseText(String responseText) {
            this.responseText = responseText;
        }
    }

    public static class VoiceMessageAnalytics {

        public long totalMessages;
        public long receivedMessages;
        public long respondedMessages;
        public long positiveResponses;
        public long negativeResponses;
        public List<VoiceMessage> recentMessages;
    }

    private Object createErrorResponse(String code, String message) {
        return new ErrorResponse(code, message);
    }

    private Object createSuccessResponse(String message) {
        return new SuccessResponse(message);
    }

    private static class ErrorResponse {

        private final String code;
        private final String message;

        public ErrorResponse(String code, String message) {
            this.code = code;
            this.message = message;
        }

        public String getCode() {
            return code;
        }

        public String getMessage() {
            return message;
        }
    }

    private static class SuccessResponse {

        private final String message;

        public SuccessResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }
}
