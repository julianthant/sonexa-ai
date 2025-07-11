package com.sonexa.backend.dto;

import lombok.Data;

/**
 * DTO for payment intent response
 */
@Data
public class PaymentIntentResponse {

    private String clientSecret;
    private String paymentIntentId;
    private String status;
    private Long amount;
    private String currency;
    private String description;

    public PaymentIntentResponse(String clientSecret, String paymentIntentId, String status, Long amount, String currency, String description) {
        this.clientSecret = clientSecret;
        this.paymentIntentId = paymentIntentId;
        this.status = status;
        this.amount = amount;
        this.currency = currency;
        this.description = description;
    }
}
