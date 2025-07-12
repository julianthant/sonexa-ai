package com.sonexa.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sonexa.backend.model.ActivityLog;
import com.sonexa.backend.model.ActivityType;
import com.sonexa.backend.model.User;
import com.sonexa.backend.repository.ActivityLogRepository;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class ActivityLogService {

    @Autowired
    private ActivityLogRepository activityLogRepository;

    public void logActivity(User user, ActivityType type, String description) {
        ActivityLog log = new ActivityLog(user, type, description);
        activityLogRepository.save(log);
    }

    public void logActivity(User user, ActivityType type, String description,
            String ipAddress, String userAgent) {
        ActivityLog log = new ActivityLog(user, type, description);
        log.setIpAddress(ipAddress);
        log.setUserAgent(userAgent);
        activityLogRepository.save(log);
    }

    public List<ActivityLog> getUserActivities(UUID userId) {
        return activityLogRepository.findTop50ByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<ActivityLog> getUserActivitiesByType(UUID userId, ActivityType type) {
        return activityLogRepository.findByUserIdAndTypeOrderByCreatedAtDesc(userId, type);
    }
}
