package com.sonexa.backend.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sonexa.backend.model.EmailVerification;
import com.sonexa.backend.model.VerificationStatus;

@Repository
public interface EmailVerificationRepository extends JpaRepository<EmailVerification, Long> {

    Optional<EmailVerification> findBySenderEmailAndStatus(String senderEmail, VerificationStatus status);

    Optional<EmailVerification> findByVoiceMessageIdAndStatus(String voiceMessageId, VerificationStatus status);

    List<EmailVerification> findBySenderEmailOrderByCreatedAtDesc(String senderEmail);

    List<EmailVerification> findByStatusAndCreatedAtBefore(VerificationStatus status, LocalDateTime before);

    @Query("SELECT ev FROM EmailVerification ev WHERE ev.status = :status AND ev.expiresAt < :now")
    List<EmailVerification> findExpiredVerifications(@Param("status") VerificationStatus status, @Param("now") LocalDateTime now);

    @Query("SELECT ev FROM EmailVerification ev WHERE ev.senderEmail = :senderEmail AND ev.status = 'PENDING' AND ev.expiresAt > :now ORDER BY ev.createdAt DESC")
    Optional<EmailVerification> findActivePendingVerification(@Param("senderEmail") String senderEmail, @Param("now") LocalDateTime now);

    boolean existsBySenderEmailAndStatus(String senderEmail, VerificationStatus status);
}
