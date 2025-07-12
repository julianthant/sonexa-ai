package com.sonexa.backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sonexa.backend.model.RecentActivity;
import com.sonexa.backend.model.User;

@Repository
public interface RecentActivityRepository extends JpaRepository<RecentActivity, UUID> {

    List<RecentActivity> findByUserOrderByCreatedAtDesc(User user);

    Page<RecentActivity> findByUserOrderByCreatedAtDesc(User user, Pageable pageable);

    List<RecentActivity> findByType(RecentActivity.ActivityType type);

    List<RecentActivity> findByStatus(RecentActivity.ActivityStatus status);

    @Query("SELECT ra FROM RecentActivity ra WHERE ra.user = :user AND ra.type = :type ORDER BY ra.createdAt DESC")
    List<RecentActivity> findByUserAndType(@Param("user") User user, @Param("type") RecentActivity.ActivityType type);

    @Query("SELECT ra FROM RecentActivity ra WHERE ra.voiceMessageId = :voiceMessageId ORDER BY ra.createdAt DESC")
    List<RecentActivity> findByVoiceMessageId(@Param("voiceMessageId") String voiceMessageId);

    @Query("SELECT ra FROM RecentActivity ra WHERE ra.teamId = :teamId ORDER BY ra.createdAt DESC")
    List<RecentActivity> findByTeamId(@Param("teamId") UUID teamId);

    Long countByUserAndStatus(User user, RecentActivity.ActivityStatus status);
}
