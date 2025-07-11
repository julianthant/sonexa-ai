package com.sonexa.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sonexa.backend.model.SubscriptionStatus;
import com.sonexa.backend.model.SubscriptionTier;
import com.sonexa.backend.model.UserSubscription;
import com.sonexa.backend.repository.UserSubscriptionRepository;

/**
 * Service for managing user subscriptions
 */
@Service
public class SubscriptionService {

    @Autowired
    private UserSubscriptionRepository subscriptionRepository;

    /**
     * Create a new subscription for a user
     */
    public UserSubscription createSubscription(String userEmail, SubscriptionTier tier,
            String stripeCustomerId, String stripeSubscriptionId,
            boolean isAnnual) {
        // Check if user already has a subscription
        Optional<UserSubscription> existing = subscriptionRepository.findByUserEmail(userEmail);
        if (existing.isPresent()) {
            throw new IllegalStateException("User already has a subscription");
        }

        UserSubscription subscription = new UserSubscription();
        subscription.setUserEmail(userEmail);
        subscription.setTier(tier);
        subscription.setStripeCustomerId(stripeCustomerId);
        subscription.setStripeSubscriptionId(stripeSubscriptionId);
        subscription.setStatus(SubscriptionStatus.ACTIVE);
        subscription.setIsAnnual(isAnnual);
        subscription.setSubscriptionStartDate(LocalDateTime.now());
        subscription.setNextBillingDate(calculateNextBillingDate(isAnnual));
        subscription.setCurrentMonthUsage(0);

        return subscriptionRepository.save(subscription);
    }

    /**
     * Get subscription by user email
     */
    public Optional<UserSubscription> getSubscriptionByEmail(String userEmail) {
        return subscriptionRepository.findByUserEmail(userEmail);
    }

    /**
     * Get subscription by Stripe subscription ID
     */
    public Optional<UserSubscription> getSubscriptionByStripeId(String stripeSubscriptionId) {
        return subscriptionRepository.findByStripeSubscriptionId(stripeSubscriptionId);
    }

    /**
     * Update subscription status
     */
    public UserSubscription updateSubscriptionStatus(String userEmail, SubscriptionStatus status) {
        UserSubscription subscription = subscriptionRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("No subscription found for user: " + userEmail));

        subscription.setStatus(status);
        return subscriptionRepository.save(subscription);
    }

    /**
     * Update subscription tier
     */
    public UserSubscription updateSubscriptionTier(String userEmail, SubscriptionTier newTier) {
        UserSubscription subscription = subscriptionRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("No subscription found for user: " + userEmail));

        subscription.setTier(newTier);
        return subscriptionRepository.save(subscription);
    }

    /**
     * Cancel subscription
     */
    public UserSubscription cancelSubscription(String userEmail) {
        UserSubscription subscription = subscriptionRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("No subscription found for user: " + userEmail));

        subscription.setStatus(SubscriptionStatus.CANCELED);
        return subscriptionRepository.save(subscription);
    }

    /**
     * Check if user can process a message
     */
    public boolean canUserProcessMessage(String userEmail) {
        Optional<UserSubscription> subscriptionOpt = subscriptionRepository.findByUserEmail(userEmail);

        if (subscriptionOpt.isEmpty()) {
            // Create a free subscription for new users
            createFreeSubscription(userEmail);
            return true;
        }

        UserSubscription subscription = subscriptionOpt.get();
        return subscription.canProcessMessage();
    }

    /**
     * Increment usage for a user
     */
    public void incrementUsage(String userEmail) {
        UserSubscription subscription = subscriptionRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("No subscription found for user: " + userEmail));

        subscription.incrementUsage();
        subscriptionRepository.save(subscription);
    }

    /**
     * Get user's current usage and limits
     */
    public UserSubscriptionUsage getUserUsage(String userEmail) {
        UserSubscription subscription = subscriptionRepository.findByUserEmail(userEmail)
                .orElse(null);

        if (subscription == null) {
            // Return free tier limits for new users
            return new UserSubscriptionUsage(SubscriptionTier.FREE, 0, 5, SubscriptionStatus.ACTIVE);
        }

        return new UserSubscriptionUsage(
                subscription.getTier(),
                subscription.getCurrentMonthUsage(),
                subscription.getMaxMessagesPerMonth(),
                subscription.getStatus()
        );
    }

    /**
     * Reset monthly usage for all active subscriptions (called monthly)
     */
    public void resetMonthlyUsage() {
        List<UserSubscription> subscriptionsToReset = subscriptionRepository.findSubscriptionsForBillingReset();

        for (UserSubscription subscription : subscriptionsToReset) {
            subscription.resetMonthlyUsage();
            subscription.setNextBillingDate(calculateNextBillingDate(subscription.getIsAnnual()));
            subscriptionRepository.save(subscription);
        }
    }

    /**
     * Get analytics data
     */
    public SubscriptionAnalytics getAnalytics() {
        List<Object[]> tierCounts = subscriptionRepository.countActiveSubscriptionsByTier();
        Long totalUsage = subscriptionRepository.getTotalActiveUsage();
        List<UserSubscription> approachingLimits = subscriptionRepository.findUsersApproachingLimits();

        return new SubscriptionAnalytics(tierCounts, totalUsage, approachingLimits.size());
    }

    /**
     * Create a free subscription for new users
     */
    private UserSubscription createFreeSubscription(String userEmail) {
        UserSubscription subscription = new UserSubscription();
        subscription.setUserEmail(userEmail);
        subscription.setTier(SubscriptionTier.FREE);
        subscription.setStatus(SubscriptionStatus.ACTIVE);
        subscription.setIsAnnual(false);
        subscription.setSubscriptionStartDate(LocalDateTime.now());
        subscription.setNextBillingDate(calculateNextBillingDate(false));
        subscription.setCurrentMonthUsage(0);

        return subscriptionRepository.save(subscription);
    }

    /**
     * Calculate next billing date
     */
    private LocalDateTime calculateNextBillingDate(boolean isAnnual) {
        return isAnnual
                ? LocalDateTime.now().plusYears(1)
                : LocalDateTime.now().plusMonths(1);
    }

    /**
     * DTO for user subscription usage
     */
    public static class UserSubscriptionUsage {

        public final SubscriptionTier tier;
        public final int currentUsage;
        public final int maxUsage;
        public final SubscriptionStatus status;

        public UserSubscriptionUsage(SubscriptionTier tier, int currentUsage, int maxUsage, SubscriptionStatus status) {
            this.tier = tier;
            this.currentUsage = currentUsage;
            this.maxUsage = maxUsage;
            this.status = status;
        }
    }

    /**
     * DTO for subscription analytics
     */
    public static class SubscriptionAnalytics {

        public final List<Object[]> tierCounts;
        public final Long totalUsage;
        public final int usersApproachingLimits;

        public SubscriptionAnalytics(List<Object[]> tierCounts, Long totalUsage, int usersApproachingLimits) {
            this.tierCounts = tierCounts;
            this.totalUsage = totalUsage;
            this.usersApproachingLimits = usersApproachingLimits;
        }
    }
}
