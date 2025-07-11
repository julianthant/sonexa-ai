package com.sonexa.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sonexa.backend.model.SubscriptionTier;
import com.sonexa.backend.service.StripePaymentService;
import com.sonexa.backend.service.SubscriptionService;

/**
 * Controller for subscription management endpoints
 */
@RestController
@RequestMapping("/api/subscription")
@CrossOrigin(origins = "*")
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    private StripePaymentService stripePaymentService;

    /**
     * Get available subscription tiers with pricing
     */
    @GetMapping("/tiers")
    public ResponseEntity<?> getSubscriptionTiers() {
        Map<String, Object> response = new HashMap<>();

        // Basic tier
        Map<String, Object> basic = new HashMap<>();
        basic.put("name", "Basic");
        basic.put("price_monthly", 19.99);
        basic.put("price_annual", stripePaymentService.getAmountForTier(SubscriptionTier.BASIC, true) / 100.0);
        basic.put("messages_per_month", 100);
        basic.put("features", java.util.List.of(
                "Azure Speech processing",
                "Email support",
                "99% SLA"
        ));

        // Premium tier
        Map<String, Object> premium = new HashMap<>();
        premium.put("name", "Premium");
        premium.put("price_monthly", 79.99);
        premium.put("price_annual", stripePaymentService.getAmountForTier(SubscriptionTier.PREMIUM, true) / 100.0);
        premium.put("messages_per_month", 1000);
        premium.put("features", java.util.List.of(
                "Multi-Model AI processing",
                "Priority queue",
                "Business intelligence",
                "Priority email support",
                "99.5% SLA"
        ));

        // Enterprise tier
        Map<String, Object> enterprise = new HashMap<>();
        enterprise.put("name", "Enterprise");
        enterprise.put("price_monthly", 299.99);
        enterprise.put("price_annual", stripePaymentService.getAmountForTier(SubscriptionTier.ENTERPRISE, true) / 100.0);
        enterprise.put("messages_per_month", "Unlimited");
        enterprise.put("features", java.util.List.of(
                "Custom AI pipeline",
                "Dedicated resources",
                "API access",
                "Custom email domain",
                "Dedicated manager",
                "99.9% SLA"
        ));

        response.put("tiers", Map.of(
                "basic", basic,
                "premium", premium,
                "enterprise", enterprise
        ));

        return ResponseEntity.ok(response);
    }

    /**
     * Get user's current subscription and usage
     */
    @GetMapping("/usage/{email}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getUserUsage(@PathVariable String email) {
        SubscriptionService.UserSubscriptionUsage usage = subscriptionService.getUserUsage(email);

        Map<String, Object> response = new HashMap<>();
        response.put("tier", usage.tier.name());
        response.put("current_usage", usage.currentUsage);
        response.put("max_usage", usage.maxUsage);
        response.put("status", usage.status.name());
        response.put("usage_percentage", usage.maxUsage > 0
                ? (double) usage.currentUsage / usage.maxUsage * 100 : 0);
        response.put("can_process_more", usage.currentUsage < usage.maxUsage);

        return ResponseEntity.ok(response);
    }

    /**
     * Check if user can process a message
     */
    @GetMapping("/can-process/{email}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> canProcessMessage(@PathVariable String email) {
        boolean canProcess = subscriptionService.canUserProcessMessage(email);

        Map<String, Object> response = new HashMap<>();
        response.put("can_process", canProcess);

        if (!canProcess) {
            response.put("message", "Monthly limit reached. Please upgrade your subscription.");
        }

        return ResponseEntity.ok(response);
    }

    /**
     * Get subscription analytics (admin only)
     */
    @GetMapping("/analytics")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getSubscriptionAnalytics() {
        SubscriptionService.SubscriptionAnalytics analytics = subscriptionService.getAnalytics();

        Map<String, Object> response = new HashMap<>();
        response.put("total_usage", analytics.totalUsage);
        response.put("users_approaching_limits", analytics.usersApproachingLimits);

        // Convert tier counts to a more readable format
        Map<String, Long> tierCounts = new HashMap<>();
        for (Object[] count : analytics.tierCounts) {
            tierCounts.put(count[0].toString(), (Long) count[1]);
        }
        response.put("tier_counts", tierCounts);

        return ResponseEntity.ok(response);
    }

    /**
     * Cancel subscription
     */
    @DeleteMapping("/cancel/{email}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> cancelSubscription(@PathVariable String email) {
        try {
            subscriptionService.cancelSubscription(email);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Subscription cancelled successfully");

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Reset monthly usage (admin endpoint for testing)
     */
    @PostMapping("/reset-usage")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> resetMonthlyUsage() {
        subscriptionService.resetMonthlyUsage();

        Map<String, String> response = new HashMap<>();
        response.put("message", "Monthly usage reset for all eligible subscriptions");

        return ResponseEntity.ok(response);
    }
}
