package com.sonexa.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * DTO for subscription creation request
 */
@Data
public class SubscriptionCreateRequest {

    @NotBlank
    private String userEmail;

    @NotBlank
    private String subscriptionTier; // BASIC, PREMIUM, ENTERPRISE

    @NotBlank
    private String paymentMethodId;

    private String customerId;
    private boolean isAnnual = false; // Monthly by default
}
