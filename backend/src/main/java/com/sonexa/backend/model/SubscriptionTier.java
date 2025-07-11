package com.sonexa.backend.model;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * Subscription tiers that determine what features and AI processing users get.
 *
 * PRICING STRATEGY: - FREE: Get people to try the service with basic features -
 * BASIC: Entry-level paid tier for regular users - PREMIUM: Full-featured tier
 * for power users - ENTERPRISE: Custom solutions for big businesses
 *
 * AI PROCESSING LEVELS: - FREE: Local/basic AI only (free GitHub Student Pack
 * resources) - BASIC: Azure free tier + basic paid services - PREMIUM: Multiple
 * AI models, advanced analysis (expensive but accurate) - ENTERPRISE: Custom AI
 * pipelines + dedicated support
 */
public enum SubscriptionTier {

    FREE(
            "Free", // Display name
            BigDecimal.ZERO, // $0.00 per month
            5, // 5 voice messages per month
            false, // No advanced AI
            false, // No priority processing
            false, // No custom email domain
            false, // No API access
            "Basic AI analysis only" // Description
    ),
    BASIC(
            "Basic",
            new BigDecimal("19.99"), // $19.99 per month
            100, // 100 voice messages per month
            false, // No advanced AI (still uses Azure free tier)
            false, // No priority processing
            false, // No custom email domain
            false, // No API access
            "Better AI accuracy with Azure Speech Services"
    ),
    PREMIUM(
            "Premium",
            new BigDecimal("79.99"), // $79.99 per month
            1000, // 1000 voice messages per month
            true, // Advanced AI with multiple models
            true, // Priority processing queue
            true, // Custom email domain (user@company.voice.sonexa.ai)
            false, // No API access (yet)
            "Advanced AI analysis, semantic duplicate detection, priority processing"
    ),
    ENTERPRISE(
            "Enterprise",
            new BigDecimal("299.99"), // $299.99 per month
            -1, // Unlimited voice messages
            true, // Advanced AI
            true, // Priority processing
            true, // Custom email domain
            true, // Full API access
            "Unlimited processing, custom integrations, dedicated support"
    );

    private final String displayName;
    private final BigDecimal monthlyPrice;
    private final int monthlyVoiceMessageLimit;  // -1 means unlimited
    private final boolean advancedAI;
    private final boolean priorityProcessing;
    private final boolean customEmailDomain;
    private final boolean apiAccess;
    private final String description;

    SubscriptionTier(String displayName, BigDecimal monthlyPrice, int monthlyVoiceMessageLimit,
            boolean advancedAI, boolean priorityProcessing, boolean customEmailDomain,
            boolean apiAccess, String description) {
        this.displayName = displayName;
        this.monthlyPrice = monthlyPrice;
        this.monthlyVoiceMessageLimit = monthlyVoiceMessageLimit;
        this.advancedAI = advancedAI;
        this.priorityProcessing = priorityProcessing;
        this.customEmailDomain = customEmailDomain;
        this.apiAccess = apiAccess;
        this.description = description;
    }

    // Getters
    public String getDisplayName() {
        return displayName;
    }

    public BigDecimal getMonthlyPrice() {
        return monthlyPrice;
    }

    public int getMonthlyVoiceMessageLimit() {
        return monthlyVoiceMessageLimit;
    }

    public boolean hasAdvancedAI() {
        return advancedAI;
    }

    public boolean hasPriorityProcessing() {
        return priorityProcessing;
    }

    public boolean hasCustomEmailDomain() {
        return customEmailDomain;
    }

    public boolean hasApiAccess() {
        return apiAccess;
    }

    public String getDescription() {
        return description;
    }

    /**
     * Check if this tier has unlimited messages
     */
    public boolean isUnlimited() {
        return monthlyVoiceMessageLimit == -1;
    }

    /**
     * Check if this is a paid tier
     */
    public boolean isPaidTier() {
        return monthlyPrice.compareTo(BigDecimal.ZERO) > 0;
    }

    /**
     * Get the cost per message for budgeting
     */
    public BigDecimal getCostPerMessage() {
        if (isUnlimited() || monthlyVoiceMessageLimit == 0) {
            return BigDecimal.ZERO;
        }
        return monthlyPrice.divide(BigDecimal.valueOf(monthlyVoiceMessageLimit), 4, RoundingMode.HALF_UP);
    }

    /**
     * Get a user-friendly summary of what this tier includes
     */
    public String getFeatureSummary() {
        StringBuilder summary = new StringBuilder();
        summary.append(String.format("• %s messages per month\n",
                isUnlimited() ? "Unlimited" : String.format("%,d", monthlyVoiceMessageLimit)));
        summary.append("• Basic AI analysis\n");

        if (hasAdvancedAI()) {
            summary.append("• Advanced AI with multiple models\n");
            summary.append("• Semantic duplicate detection\n");
            summary.append("• Business intelligence analysis\n");
        }

        if (hasPriorityProcessing()) {
            summary.append("• Priority processing queue\n");
        }

        if (hasCustomEmailDomain()) {
            summary.append("• Custom email domain\n");
        }

        if (hasApiAccess()) {
            summary.append("• Full API access\n");
            summary.append("• Custom integrations\n");
            summary.append("• Dedicated support\n");
        }

        return summary.toString();
    }
}
