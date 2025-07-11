package com.sonexa.backend.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sonexa.backend.model.TranscriptionStatus;
import com.sonexa.backend.model.UploadSource;
import com.sonexa.backend.model.VoiceFile;

/**
 * Repository for VoiceFile entities.
 *
 * This handles all database operations for voice message files, including: -
 * Basic CRUD operations - Finding files by user, status, upload source -
 * Duplicate detection queries - Usage tracking and analytics queries - Cost and
 * billing queries
 */
@Repository
public interface VoiceFileRepository extends JpaRepository<VoiceFile, UUID> {

    // ==================== BASIC QUERIES ====================
    /**
     * Find all voice files for a specific user
     */
    List<VoiceFile> findByUserEmailOrderByUploadedAtDesc(String userEmail);

    /**
     * Find voice files by transcription status
     */
    List<VoiceFile> findByTranscriptionStatus(TranscriptionStatus status);

    /**
     * Find voice files by upload source (email vs direct upload)
     */
    List<VoiceFile> findByUploadSource(UploadSource uploadSource);

    /**
     * Find voice files by sender email (for email-based uploads)
     */
    List<VoiceFile> findBySenderEmailOrderByUploadedAtDesc(String senderEmail);

    // ==================== DUPLICATE DETECTION ====================
    /**
     * Find files with the same audio fingerprint (exact duplicates)
     */
    List<VoiceFile> findByAudioFingerprint(String audioFingerprint);

    /**
     * Find files with similar audio fingerprints (near duplicates) This would
     * need custom implementation for Hamming distance comparison
     */
    @Query("SELECT v FROM VoiceFile v WHERE v.audioFingerprint IS NOT NULL AND v.audioFingerprint != :fingerprint")
    List<VoiceFile> findPotentialDuplicates(@Param("fingerprint") String fingerprint);

    /**
     * Find recent files from the same sender to detect spam patterns
     */
    @Query("SELECT v FROM VoiceFile v WHERE v.senderEmail = :senderEmail AND v.uploadedAt > :since ORDER BY v.uploadedAt DESC")
    List<VoiceFile> findRecentFilesBySender(@Param("senderEmail") String senderEmail, @Param("since") LocalDateTime since);

    // ==================== USAGE TRACKING ====================
    /**
     * Count voice files processed for a user in the current month
     */
    @Query("SELECT COUNT(v) FROM VoiceFile v WHERE v.userEmail = :userEmail AND v.uploadedAt >= :startOfMonth")
    long countMonthlyUsageByUser(@Param("userEmail") String userEmail, @Param("startOfMonth") LocalDateTime startOfMonth);

    /**
     * Count voice files processed today across all users
     */
    @Query("SELECT COUNT(v) FROM VoiceFile v WHERE v.uploadedAt >= :startOfDay")
    long countDailyProcessedFiles(@Param("startOfDay") LocalDateTime startOfDay);

    /**
     * Find files that used advanced AI (for cost tracking)
     */
    @Query("SELECT v FROM VoiceFile v WHERE v.usedAdvancedAI = true AND v.uploadedAt >= :since")
    List<VoiceFile> findAdvancedAIUsage(@Param("since") LocalDateTime since);

    // ==================== STATUS AND REVIEW QUERIES ====================
    /**
     * Find files pending manual review (quarantined)
     */
    @Query("SELECT v FROM VoiceFile v WHERE v.transcriptionStatus = 'QUARANTINED_PENDING_REVIEW' ORDER BY v.uploadedAt ASC")
    List<VoiceFile> findFilesNeedingReview();

    /**
     * Find recently rejected files for analysis
     */
    @Query("SELECT v FROM VoiceFile v WHERE v.transcriptionStatus LIKE 'REJECTED_%' AND v.uploadedAt >= :since ORDER BY v.uploadedAt DESC")
    List<VoiceFile> findRecentRejections(@Param("since") LocalDateTime since);

    /**
     * Find files that failed processing and might need retry
     */
    @Query("SELECT v FROM VoiceFile v WHERE v.transcriptionStatus = 'FAILED' AND v.processingAttempts < 3")
    List<VoiceFile> findFilesNeedingRetry();

    // ==================== ANALYTICS QUERIES ====================
    /**
     * Get processing success rate for a time period
     */
    @Query("SELECT "
            + "SUM(CASE WHEN v.transcriptionStatus = 'COMPLETED' THEN 1 ELSE 0 END) as completed, "
            + "SUM(CASE WHEN v.transcriptionStatus LIKE 'REJECTED_%' THEN 1 ELSE 0 END) as rejected, "
            + "COUNT(v) as total "
            + "FROM VoiceFile v WHERE v.uploadedAt >= :since")
    Object[] getProcessingStats(@Param("since") LocalDateTime since);

    /**
     * Get the most common rejection reasons
     */
    @Query("SELECT v.transcriptionStatus, COUNT(v) FROM VoiceFile v "
            + "WHERE v.transcriptionStatus LIKE 'REJECTED_%' AND v.uploadedAt >= :since "
            + "GROUP BY v.transcriptionStatus ORDER BY COUNT(v) DESC")
    List<Object[]> getRejectionReasonStats(@Param("since") LocalDateTime since);

    /**
     * Find users who are approaching their monthly limits
     */
    @Query("SELECT v.userEmail, COUNT(v) FROM VoiceFile v "
            + "WHERE v.uploadedAt >= :startOfMonth "
            + "GROUP BY v.userEmail "
            + "HAVING COUNT(v) >= :warningThreshold "
            + "ORDER BY COUNT(v) DESC")
    List<Object[]> findUsersNearingLimits(@Param("startOfMonth") LocalDateTime startOfMonth,
            @Param("warningThreshold") long warningThreshold);

    // ==================== COST TRACKING ====================
    /**
     * Calculate total processing costs for a time period
     */
    @Query("SELECT SUM(v.processingCost) FROM VoiceFile v WHERE v.uploadedAt >= :since AND v.processingCost IS NOT NULL")
    Double getTotalProcessingCosts(@Param("since") LocalDateTime since);

    /**
     * Get processing costs by user for billing
     */
    @Query("SELECT v.userEmail, SUM(v.processingCost) FROM VoiceFile v "
            + "WHERE v.uploadedAt >= :since AND v.processingCost IS NOT NULL "
            + "GROUP BY v.userEmail ORDER BY SUM(v.processingCost) DESC")
    List<Object[]> getProcessingCostsByUser(@Param("since") LocalDateTime since);
}
