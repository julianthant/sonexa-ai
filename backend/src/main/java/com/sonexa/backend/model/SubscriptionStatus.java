package com.sonexa.backend.model;

/**
 * Enum representing subscription status
 */
public enum SubscriptionStatus {
    ACTIVE, // Subscription is active and user can use the service
    INACTIVE, // Subscription is not active (e.g., payment failed)
    CANCELED, // Subscription has been canceled
    PAST_DUE, // Payment is overdue
    TRIALING, // User is in trial period
    INCOMPLETE, // Subscription creation incomplete (waiting for payment)
    INCOMPLETE_EXPIRED, // Subscription creation failed
    UNPAID           // Invoice is unpaid
}
