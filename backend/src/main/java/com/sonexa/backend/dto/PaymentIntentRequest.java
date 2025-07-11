package com.sonexa.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

/**
 * DTO for creating a payment intent with Stripe
 */
@Data
public class PaymentIntentRequest {

    @NotNull
    @Positive
    private Long amount; // Amount in cents

    @NotBlank
    private String currency = "usd";

    @NotBlank
    private String userEmail;

    @NotBlank
    private String subscriptionTier; // FREE, BASIC, PREMIUM, ENTERPRISE

    private String description;

    // Optional metadata
    private String customerId;
    private String returnUrl;
}
