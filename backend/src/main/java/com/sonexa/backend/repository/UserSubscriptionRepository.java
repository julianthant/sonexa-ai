package com.sonexa.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sonexa.backend.model.SubscriptionStatus;
import com.sonexa.backend.model.SubscriptionTier;
import com.sonexa.backend.model.UserSubscription;

/**
 * Repository for managing user subscriptions
 */
@Repository
public interface UserSubscriptionRepository extends JpaRepository<UserSubscription, String> {

    /**
     * Find subscription by user email
     */
    Optional<UserSubscription> findByUserEmail(String userEmail);

    /**
     * Find subscription by Stripe customer ID
     */
    Optional<UserSubscription> findByStripeCustomerId(String stripeCustomerId);

    /**
     * Find subscription by Stripe subscription ID
     */
    Optional<UserSubscription> findByStripeSubscriptionId(String stripeSubscriptionId);

    /**
     * Find all subscriptions by status
     */
    List<UserSubscription> findByStatus(SubscriptionStatus status);

    /**
     * Find all subscriptions by tier
     */
    List<UserSubscription> findByTier(SubscriptionTier tier);

    /**
     * Find active subscriptions
     */
    @Query("SELECT s FROM UserSubscription s WHERE s.status = 'ACTIVE'")
    List<UserSubscription> findActiveSubscriptions();

    /**
     * Find subscriptions that need billing cycle reset
     */
    @Query("SELECT s FROM UserSubscription s WHERE s.status = 'ACTIVE' AND s.nextBillingDate <= CURRENT_TIMESTAMP")
    List<UserSubscription> findSubscriptionsForBillingReset();

    /**
     * Count subscriptions by tier
     */
    @Query("SELECT s.tier, COUNT(s) FROM UserSubscription s WHERE s.status = 'ACTIVE' GROUP BY s.tier")
    List<Object[]> countActiveSubscriptionsByTier();

    /**
     * Get total usage across all active subscriptions
     */
    @Query("SELECT SUM(s.currentMonthUsage) FROM UserSubscription s WHERE s.status = 'ACTIVE'")
    Long getTotalActiveUsage();

    /**
     * Find users approaching their limits
     */
    @Query("SELECT s FROM UserSubscription s WHERE s.status = 'ACTIVE' AND "
            + "((s.tier = 'FREE' AND s.currentMonthUsage >= 4) OR "
            + "(s.tier = 'BASIC' AND s.currentMonthUsage >= 90) OR "
            + "(s.tier = 'PREMIUM' AND s.currentMonthUsage >= 900))")
    List<UserSubscription> findUsersApproachingLimits();

    /**
     * Check if user exists and is active
     */
    @Query("SELECT CASE WHEN COUNT(s) > 0 THEN true ELSE false END FROM UserSubscription s "
            + "WHERE s.userEmail = :email AND s.status = 'ACTIVE'")
    boolean existsByUserEmailAndActive(@Param("email") String email);
}
