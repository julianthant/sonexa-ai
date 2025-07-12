package com.sonexa.backend.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sonexa.backend.model.User;
import com.sonexa.backend.model.VoiceMessage;
import com.sonexa.backend.repository.UserRepository;
import com.sonexa.backend.service.VoiceMessageService;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private static final Logger logger = LoggerFactory.getLogger(AnalyticsController.class);

    @Autowired
    private VoiceMessageService voiceMessageService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboardAnalytics(@AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(defaultValue = "30") int days) {
        logger.info("Fetching dashboard analytics for user: {}", userDetails.getUsername());

        try {
            User user = getUserFromDetails(userDetails);
            if (user == null) {
                return ResponseEntity.status(404).body(createErrorResponse("USER_NOT_FOUND", "User not found"));
            }

            DashboardAnalyticsDto analytics = new DashboardAnalyticsDto();

            // Voice message statistics
            analytics.totalVoiceMessages = voiceMessageService.getTotalVoiceMessagesCount(user);
            analytics.receivedMessages = voiceMessageService.getVoiceMessagesCountByStatus(user, VoiceMessage.MessageStatus.RECEIVED);
            analytics.analyzedMessages = voiceMessageService.getVoiceMessagesCountByStatus(user, VoiceMessage.MessageStatus.ANALYZED);
            analytics.respondedMessages = voiceMessageService.getVoiceMessagesCountByStatus(user, VoiceMessage.MessageStatus.RESPONDED);

            // Response type distribution
            analytics.positiveResponses = voiceMessageService.getVoiceMessagesCountByResponse(user, VoiceMessage.MessageResponse.POSITIVE);
            analytics.negativeResponses = voiceMessageService.getVoiceMessagesCountByResponse(user, VoiceMessage.MessageResponse.NEGATIVE);
            analytics.neutralResponses = voiceMessageService.getVoiceMessagesCountByResponse(user, VoiceMessage.MessageResponse.NEUTRAL);
            analytics.escalatedResponses = voiceMessageService.getVoiceMessagesCountByResponse(user, VoiceMessage.MessageResponse.ESCALATE);
            analytics.callbackRequests = voiceMessageService.getVoiceMessagesCountByResponse(user, VoiceMessage.MessageResponse.CALLBACK_REQUESTED);

            // Recent activity
            analytics.recentMessages = voiceMessageService.getRecentVoiceMessages(user, days);

            // Performance metrics
            analytics.responseRate = calculateResponseRate(analytics.totalVoiceMessages, analytics.respondedMessages);
            analytics.avgResponseTime = calculateAverageResponseTime(user);
            analytics.satisfactionScore = calculateSatisfactionScore(analytics.positiveResponses, analytics.negativeResponses, analytics.neutralResponses);

            // Trends
            analytics.weeklyTrends = getWeeklyTrends(user);
            analytics.monthlyTrends = getMonthlyTrends(user);

            return ResponseEntity.ok(analytics);

        } catch (Exception e) {
            logger.error("Error fetching dashboard analytics for user: {} - {}", userDetails.getUsername(), e.getMessage(), e);
            return ResponseEntity.status(500).body(createErrorResponse("ANALYTICS_FAILED", "Failed to fetch analytics"));
        }
    }

    @GetMapping("/voice-messages")
    public ResponseEntity<?> getVoiceMessageAnalytics(@AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime endDate) {
        logger.info("Fetching voice message analytics for user: {}", userDetails.getUsername());

        try {
            User user = getUserFromDetails(userDetails);
            if (user == null) {
                return ResponseEntity.status(404).body(createErrorResponse("USER_NOT_FOUND", "User not found"));
            }

            VoiceMessageAnalyticsDto analytics = new VoiceMessageAnalyticsDto();

            // Set default date range if not provided
            if (endDate == null) {
                endDate = LocalDateTime.now();
            }
            if (startDate == null) {
                startDate = endDate.minusDays(30);
            }

            // Status breakdown
            analytics.statusBreakdown = new HashMap<>();
            for (VoiceMessage.MessageStatus status : VoiceMessage.MessageStatus.values()) {
                analytics.statusBreakdown.put(status.toString(), voiceMessageService.getVoiceMessagesCountByStatus(user, status));
            }

            // Response type breakdown
            analytics.responseBreakdown = new HashMap<>();
            for (VoiceMessage.MessageResponse response : VoiceMessage.MessageResponse.values()) {
                analytics.responseBreakdown.put(response.toString(), voiceMessageService.getVoiceMessagesCountByResponse(user, response));
            }

            // Timeline data
            analytics.timelineData = getVoiceMessageTimeline(user, startDate, endDate);

            // Peak hours analysis
            analytics.peakHours = getPeakHoursAnalysis(user);

            return ResponseEntity.ok(analytics);

        } catch (Exception e) {
            logger.error("Error fetching voice message analytics for user: {} - {}", userDetails.getUsername(), e.getMessage(), e);
            return ResponseEntity.status(500).body(createErrorResponse("ANALYTICS_FAILED", "Failed to fetch voice message analytics"));
        }
    }

    @GetMapping("/performance")
    public ResponseEntity<?> getPerformanceMetrics(@AuthenticationPrincipal UserDetails userDetails) {
        logger.info("Fetching performance metrics for user: {}", userDetails.getUsername());

        try {
            User user = getUserFromDetails(userDetails);
            if (user == null) {
                return ResponseEntity.status(404).body(createErrorResponse("USER_NOT_FOUND", "User not found"));
            }

            PerformanceMetricsDto metrics = new PerformanceMetricsDto();

            long totalMessages = voiceMessageService.getTotalVoiceMessagesCount(user);
            long respondedMessages = voiceMessageService.getVoiceMessagesCountByStatus(user, VoiceMessage.MessageStatus.RESPONDED);
            long positiveResponses = voiceMessageService.getVoiceMessagesCountByResponse(user, VoiceMessage.MessageResponse.POSITIVE);
            long negativeResponses = voiceMessageService.getVoiceMessagesCountByResponse(user, VoiceMessage.MessageResponse.NEGATIVE);
            long neutralResponses = voiceMessageService.getVoiceMessagesCountByResponse(user, VoiceMessage.MessageResponse.NEUTRAL);

            metrics.responseRate = calculateResponseRate(totalMessages, respondedMessages);
            metrics.satisfactionScore = calculateSatisfactionScore(positiveResponses, negativeResponses, neutralResponses);
            metrics.avgResponseTime = calculateAverageResponseTime(user);
            metrics.totalMessages = totalMessages;
            metrics.respondedMessages = respondedMessages;

            // Goal tracking
            metrics.goalProgress = new HashMap<>();
            metrics.goalProgress.put("responseRate", metrics.responseRate);
            metrics.goalProgress.put("satisfactionScore", metrics.satisfactionScore);
            metrics.goalProgress.put("monthlyTarget", calculateMonthlyTargetProgress(user));

            return ResponseEntity.ok(metrics);

        } catch (Exception e) {
            logger.error("Error fetching performance metrics for user: {} - {}", userDetails.getUsername(), e.getMessage(), e);
            return ResponseEntity.status(500).body(createErrorResponse("PERFORMANCE_FAILED", "Failed to fetch performance metrics"));
        }
    }

    // Helper methods
    private User getUserFromDetails(UserDetails userDetails) {
        Optional<User> userOpt = userRepository.findByEmail(userDetails.getUsername());
        return userOpt.orElse(null);
    }

    private double calculateResponseRate(long totalMessages, long respondedMessages) {
        if (totalMessages == 0) {
            return 0.0;
        }
        return (double) respondedMessages / totalMessages * 100.0;
    }

    private double calculateSatisfactionScore(long positive, long negative, long neutral) {
        long total = positive + negative + neutral;
        if (total == 0) {
            return 0.0;
        }
        return (double) positive / total * 100.0;
    }

    private double calculateAverageResponseTime(User user) {
        // Placeholder - would calculate based on timestamps
        return 24.5; // hours
    }

    private double calculateMonthlyTargetProgress(User user) {
        // Placeholder - would calculate based on monthly goals
        return 75.0; // percentage
    }

    private List<TrendDataPoint> getWeeklyTrends(User user) {
        List<TrendDataPoint> trends = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();

        for (int i = 6; i >= 0; i--) {
            LocalDateTime date = now.minusDays(i);
            TrendDataPoint point = new TrendDataPoint();
            point.date = date.format(DateTimeFormatter.ofPattern("MM-dd"));
            point.value = Math.random() * 10; // Placeholder data
            trends.add(point);
        }

        return trends;
    }

    private List<TrendDataPoint> getMonthlyTrends(User user) {
        List<TrendDataPoint> trends = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();

        for (int i = 11; i >= 0; i--) {
            LocalDateTime date = now.minusMonths(i);
            TrendDataPoint point = new TrendDataPoint();
            point.date = date.format(DateTimeFormatter.ofPattern("MMM"));
            point.value = Math.random() * 100; // Placeholder data
            trends.add(point);
        }

        return trends;
    }

    private List<TimelineDataPoint> getVoiceMessageTimeline(User user, LocalDateTime startDate, LocalDateTime endDate) {
        List<TimelineDataPoint> timeline = new ArrayList<>();
        // Placeholder implementation
        return timeline;
    }

    private Map<String, Integer> getPeakHoursAnalysis(User user) {
        Map<String, Integer> peakHours = new HashMap<>();
        // Placeholder data for peak hours
        for (int hour = 0; hour < 24; hour++) {
            peakHours.put(String.format("%02d:00", hour), (int) (Math.random() * 10));
        }
        return peakHours;
    }

    // DTO Classes
    public static class DashboardAnalyticsDto {

        public long totalVoiceMessages;
        public long receivedMessages;
        public long analyzedMessages;
        public long respondedMessages;
        public long positiveResponses;
        public long negativeResponses;
        public long neutralResponses;
        public long escalatedResponses;
        public long callbackRequests;
        public List<VoiceMessage> recentMessages;
        public double responseRate;
        public double avgResponseTime;
        public double satisfactionScore;
        public List<TrendDataPoint> weeklyTrends;
        public List<TrendDataPoint> monthlyTrends;
    }

    public static class VoiceMessageAnalyticsDto {

        public Map<String, Long> statusBreakdown;
        public Map<String, Long> responseBreakdown;
        public List<TimelineDataPoint> timelineData;
        public Map<String, Integer> peakHours;
    }

    public static class PerformanceMetricsDto {

        public double responseRate;
        public double satisfactionScore;
        public double avgResponseTime;
        public long totalMessages;
        public long respondedMessages;
        public Map<String, Double> goalProgress;
    }

    public static class TrendDataPoint {

        public String date;
        public double value;
    }

    public static class TimelineDataPoint {

        public String date;
        public long messages;
        public long responses;
    }

    private Object createErrorResponse(String code, String message) {
        return new ErrorResponse(code, message);
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
}
