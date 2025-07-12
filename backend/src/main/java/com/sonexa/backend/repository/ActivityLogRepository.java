package com.sonexa.backend.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonexa.backend.model.ActivityLog;
import com.sonexa.backend.model.ActivityType;

@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLog, UUID> {

    List<ActivityLog> findByUserIdOrderByCreatedAtDesc(UUID userId);

    List<ActivityLog> findByUserIdAndTypeOrderByCreatedAtDesc(UUID userId, ActivityType type);

    List<ActivityLog> findByUserIdAndCreatedAtBetweenOrderByCreatedAtDesc(
            UUID userId, LocalDateTime startDate, LocalDateTime endDate);

    List<ActivityLog> findTop50ByUserIdOrderByCreatedAtDesc(UUID userId);
}
