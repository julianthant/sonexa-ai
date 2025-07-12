package com.sonexa.backend.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sonexa.backend.model.User;
import com.sonexa.backend.model.VoiceMessage;

@Repository
public interface VoiceMessageRepository extends JpaRepository<VoiceMessage, UUID> {

    // Find all voice messages for a specific user
    Page<VoiceMessage> findByUserOrderByReceivedAtDesc(User user, Pageable pageable);

    // Find voice messages by status for a user
    Page<VoiceMessage> findByUserAndStatusOrderByReceivedAtDesc(User user, VoiceMessage.MessageStatus status, Pageable pageable);

    // Find voice messages by response type for a user
    Page<VoiceMessage> findByUserAndResponseOrderByReceivedAtDesc(User user, VoiceMessage.MessageResponse response, Pageable pageable);

    // Find voice messages from a specific number for a user
    List<VoiceMessage> findByUserAndFromNumberOrderByReceivedAtDesc(User user, String fromNumber);

    // Count total voice messages for a user
    long countByUser(User user);

    // Count voice messages by status for a user
    long countByUserAndStatus(User user, VoiceMessage.MessageStatus status);

    // Count voice messages by response for a user
    long countByUserAndResponse(User user, VoiceMessage.MessageResponse response);

    // Find recent voice messages for analytics
    @Query("SELECT vm FROM VoiceMessage vm WHERE vm.user = :user AND vm.receivedAt >= :fromDate ORDER BY vm.receivedAt DESC")
    List<VoiceMessage> findRecentVoiceMessages(@Param("user") User user, @Param("fromDate") java.time.LocalDateTime fromDate);

    // Search voice messages by content
    @Query("SELECT vm FROM VoiceMessage vm WHERE vm.user = :user AND "
            + "(LOWER(vm.messageContent) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR "
            + "LOWER(vm.fromNumber) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR "
            + "LOWER(vm.responseText) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) "
            + "ORDER BY vm.receivedAt DESC")
    Page<VoiceMessage> searchVoiceMessages(@Param("user") User user, @Param("searchTerm") String searchTerm, Pageable pageable);

    // Find voice message by voiceMessageId
    Optional<VoiceMessage> findByVoiceMessageId(String voiceMessageId);

    // Check if voiceMessageId exists
    boolean existsByVoiceMessageId(String voiceMessageId);
}
