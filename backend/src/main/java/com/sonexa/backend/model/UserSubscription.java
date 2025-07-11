package com.sonexa.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity representing a user's subscription details
 */
@Entity
@Table(name = "user_subscriptions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSubscription {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "user_email", nullable = false)
    private String userEmail;

    @Enumerated(EnumType.STRING)
    @Column(name = "tier", nullable = false)
    private SubscriptionTier tier;

    @Column(name = "stripe_customer_id")
    private String stripeCustomerId;

    @Column(name = "stripe_subscription_id")
    private String stripeSubscriptionId;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private SubscriptionStatus status;

    @Column(name = "current_month_usage", nullable = false)
    private Integer currentMonthUsage = 0;

    @Column(name = "subscription_start_date")
    private LocalDateTime subscriptionStartDate;

    @Column(name = "next_billing_date")
    private LocalDateTime nextBillingDate;

    @Column(name = "is_annual", nullable = false)
    private Boolean isAnnual = false;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    /**
     * Get the maximum messages allowed for this subscription tier
     */
    public int getMaxMessagesPerMonth() {
        return switch (tier) {
            case FREE ->
                5;
            case BASIC ->
                100;
            case PREMIUM ->
                1000;
            case ENTERPRISE ->
                Integer.MAX_VALUE; // Unlimited
        };
    }

    /**
     * Check if user has reached their monthly limit
     */
    public boolean hasReachedMonthlyLimit() {
        return currentMonthUsage >= getMaxMessagesPerMonth();
    }

    /**
     * Check if user can process more messages
     */
    public boolean canProcessMessage() {
        return status == SubscriptionStatus.ACTIVE && !hasReachedMonthlyLimit();
    }

    /**
     * Increment usage counter
     */
    public void incrementUsage() {
        this.currentMonthUsage++;
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * Reset monthly usage (called at billing cycle)
     */
    public void resetMonthlyUsage() {
        this.currentMonthUsage = 0;
        this.updatedAt = LocalDateTime.now();
    }
}
