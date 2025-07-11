package com.sonexa.backend.dto;

import lombok.Data;

/**
 * DTO for webhook payload from Stripe
 */
@Data
public class StripeWebhookPayload {

    private String id;
    private String object;
    private String apiVersion;
    private Long created;
    private Object data;
    private boolean livemode;
    private Long pendingWebhooks;
    private Object request;
    private String type;
}
