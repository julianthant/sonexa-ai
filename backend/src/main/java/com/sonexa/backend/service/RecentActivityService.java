package com.sonexa.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sonexa.backend.controller.RecentActivityController.ActivityCounts;
import com.sonexa.backend.model.RecentActivity;
import com.sonexa.backend.model.User;
import com.sonexa.backend.repository.RecentActivityRepository;

@Service
@Transactional(readOnly = true)
public class RecentActivityService {

    @Autowired
    private RecentActivityRepository recentActivityRepository;

    public Page<RecentActivity> getUserActivities(User user, Pageable pageable) {
        return recentActivityRepository.findByUserOrderByCreatedAtDesc(user, pageable);
    }

    public List<RecentActivity> getRecentActivities(User user, int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        Page<RecentActivity> page = recentActivityRepository.findByUserOrderByCreatedAtDesc(user, pageable);
        return page.getContent();
    }

    public List<RecentActivity> getActivitiesByType(User user, RecentActivity.ActivityType type) {
        return recentActivityRepository.findByUserAndType(user, type);
    }

    public ActivityCounts getActivityCounts(User user) {
        List<RecentActivity> allActivities = recentActivityRepository.findByUserOrderByCreatedAtDesc(user);

        long total = allActivities.size();
        long pending = recentActivityRepository.countByUserAndStatus(user, RecentActivity.ActivityStatus.PENDING);
        long warnings = recentActivityRepository.countByUserAndStatus(user, RecentActivity.ActivityStatus.WARNING);
        long errors = recentActivityRepository.countByUserAndStatus(user, RecentActivity.ActivityStatus.ERROR);

        return new ActivityCounts(total, pending, warnings, errors);
    }

    @Transactional
    public RecentActivity createActivity(User user, RecentActivity.ActivityType type,
            RecentActivity.ActivityStatus status, String title,
            String description, String voiceMessageId,
            java.util.UUID teamId, String icon) {
        RecentActivity activity = new RecentActivity(user, type, status, title, description,
                voiceMessageId, teamId, icon);
        return recentActivityRepository.save(activity);
    }
}
