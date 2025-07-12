package com.sonexa.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.sonexa.backend.model.User;
import com.sonexa.backend.model.VoiceMessage;
import com.sonexa.backend.repository.VoiceMessageRepository;

@Service
public class VoiceMessageService {

    private static final Logger logger = LoggerFactory.getLogger(VoiceMessageService.class);

    @Autowired
    private VoiceMessageRepository voiceMessageRepository;

    public VoiceMessage createVoiceMessage(User user, String fromNumber, String toNumber, String messageContent) {
        logger.info("Creating voice message for user: {} from number: {}", user.getEmail(), fromNumber);

        VoiceMessage voiceMessage = new VoiceMessage(user, fromNumber, toNumber, messageContent);
        VoiceMessage saved = voiceMessageRepository.save(voiceMessage);

        logger.info("Voice message created with ID: {}", saved.getId());
        return saved;
    }

    public Page<VoiceMessage> getVoiceMessagesForUser(User user, Pageable pageable) {
        logger.debug("Fetching voice messages for user: {}", user.getEmail());
        return voiceMessageRepository.findByUserOrderByReceivedAtDesc(user, pageable);
    }

    public Page<VoiceMessage> getVoiceMessagesByStatus(User user, VoiceMessage.MessageStatus status, Pageable pageable) {
        logger.debug("Fetching voice messages for user: {} with status: {}", user.getEmail(), status);
        return voiceMessageRepository.findByUserAndStatusOrderByReceivedAtDesc(user, status, pageable);
    }

    public Page<VoiceMessage> getVoiceMessagesByResponse(User user, VoiceMessage.MessageResponse response, Pageable pageable) {
        logger.debug("Fetching voice messages for user: {} with response: {}", user.getEmail(), response);
        return voiceMessageRepository.findByUserAndResponseOrderByReceivedAtDesc(user, response, pageable);
    }

    public Page<VoiceMessage> searchVoiceMessages(User user, String searchTerm, Pageable pageable) {
        logger.debug("Searching voice messages for user: {} with term: {}", user.getEmail(), searchTerm);
        return voiceMessageRepository.searchVoiceMessages(user, searchTerm, pageable);
    }

    public Optional<VoiceMessage> getVoiceMessage(UUID id, User user) {
        logger.debug("Fetching voice message {} for user: {}", id, user.getEmail());
        Optional<VoiceMessage> voiceMessage = voiceMessageRepository.findById(id);

        // Ensure the voice message belongs to the user
        if (voiceMessage.isPresent() && !voiceMessage.get().getUser().getId().equals(user.getId())) {
            logger.warn("User {} attempted to access voice message {} that doesn't belong to them",
                    user.getEmail(), id);
            return Optional.empty();
        }

        return voiceMessage;
    }

    public VoiceMessage updateVoiceMessageResponse(UUID id, User user, VoiceMessage.MessageResponse response, String responseText) {
        logger.info("Updating voice message {} response for user: {}", id, user.getEmail());

        Optional<VoiceMessage> voiceMessageOpt = getVoiceMessage(id, user);
        if (!voiceMessageOpt.isPresent()) {
            throw new IllegalArgumentException("Voice message not found or access denied");
        }

        VoiceMessage voiceMessage = voiceMessageOpt.get();
        voiceMessage.setResponse(response);
        voiceMessage.setResponseText(responseText);
        voiceMessage.setStatus(VoiceMessage.MessageStatus.RESPONDED);

        VoiceMessage updated = voiceMessageRepository.save(voiceMessage);
        logger.info("Voice message {} updated successfully", id);

        return updated;
    }

    public VoiceMessage updateVoiceMessageStatus(UUID id, User user, VoiceMessage.MessageStatus status) {
        logger.info("Updating voice message {} status to {} for user: {}", id, status, user.getEmail());

        Optional<VoiceMessage> voiceMessageOpt = getVoiceMessage(id, user);
        if (!voiceMessageOpt.isPresent()) {
            throw new IllegalArgumentException("Voice message not found or access denied");
        }

        VoiceMessage voiceMessage = voiceMessageOpt.get();
        voiceMessage.setStatus(status);

        VoiceMessage updated = voiceMessageRepository.save(voiceMessage);
        logger.info("Voice message {} status updated successfully", id);

        return updated;
    }

    public void deleteVoiceMessage(UUID id, User user) {
        logger.info("Deleting voice message {} for user: {}", id, user.getEmail());

        Optional<VoiceMessage> voiceMessageOpt = getVoiceMessage(id, user);
        if (!voiceMessageOpt.isPresent()) {
            throw new IllegalArgumentException("Voice message not found or access denied");
        }

        voiceMessageRepository.deleteById(id);
        logger.info("Voice message {} deleted successfully", id);
    }

    // Analytics methods
    public long getTotalVoiceMessagesCount(User user) {
        return voiceMessageRepository.countByUser(user);
    }

    public long getVoiceMessagesCountByStatus(User user, VoiceMessage.MessageStatus status) {
        return voiceMessageRepository.countByUserAndStatus(user, status);
    }

    public long getVoiceMessagesCountByResponse(User user, VoiceMessage.MessageResponse response) {
        return voiceMessageRepository.countByUserAndResponse(user, response);
    }

    public List<VoiceMessage> getRecentVoiceMessages(User user, int days) {
        LocalDateTime fromDate = LocalDateTime.now().minusDays(days);
        return voiceMessageRepository.findRecentVoiceMessages(user, fromDate);
    }
}
