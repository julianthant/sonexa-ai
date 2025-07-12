package com.sonexa.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sonexa.backend.model.RecentActivity;
import com.sonexa.backend.model.User;
import com.sonexa.backend.service.RecentActivityService;

@RestController
@RequestMapping("/api/activities")
public class RecentActivityController {

    @Autowired
    private RecentActivityService recentActivityService;

    @GetMapping
    public ResponseEntity<Page<RecentActivity>> getUserActivities(
            @AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<RecentActivity> activities = recentActivityService.getUserActivities(user, pageable);
        return ResponseEntity.ok(activities);
    }

    @GetMapping("/recent")
    public ResponseEntity<List<RecentActivity>> getRecentActivities(
            @AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "5") int limit) {

        List<RecentActivity> activities = recentActivityService.getRecentActivities(user, limit);
        return ResponseEntity.ok(activities);
    }

    @GetMapping("/by-type")
    public ResponseEntity<List<RecentActivity>> getActivitiesByType(
            @AuthenticationPrincipal User user,
            @RequestParam RecentActivity.ActivityType type) {

        List<RecentActivity> activities = recentActivityService.getActivitiesByType(user, type);
        return ResponseEntity.ok(activities);
    }

    @GetMapping("/counts")
    public ResponseEntity<ActivityCounts> getActivityCounts(@AuthenticationPrincipal User user) {
        ActivityCounts counts = recentActivityService.getActivityCounts(user);
        return ResponseEntity.ok(counts);
    }

    public static class ActivityCounts {

        private long total;
        private long pending;
        private long warnings;
        private long errors;

        public ActivityCounts(long total, long pending, long warnings, long errors) {
            this.total = total;
            this.pending = pending;
            this.warnings = warnings;
            this.errors = errors;
        }

        // Getters
        public long getTotal() {
            return total;
        }

        public long getPending() {
            return pending;
        }

        public long getWarnings() {
            return warnings;
        }

        public long getErrors() {
            return errors;
        }
    }
}
