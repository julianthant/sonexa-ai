package com.sonexa.backend.dto.settings;

import jakarta.validation.constraints.NotBlank;

public class PaymentMethodRequest {

    @NotBlank(message = "Stripe payment method ID is required")
    private String stripePaymentMethodId;

    private boolean setAsDefault = false;

    // Constructors
    public PaymentMethodRequest() {
    }

    public PaymentMethodRequest(String stripePaymentMethodId, boolean setAsDefault) {
        this.stripePaymentMethodId = stripePaymentMethodId;
        this.setAsDefault = setAsDefault;
    }

    // Getters and Setters
    public String getStripePaymentMethodId() {
        return stripePaymentMethodId;
    }

    public void setStripePaymentMethodId(String stripePaymentMethodId) {
        this.stripePaymentMethodId = stripePaymentMethodId;
    }

    public boolean isSetAsDefault() {
        return setAsDefault;
    }

    public void setSetAsDefault(boolean setAsDefault) {
        this.setAsDefault = setAsDefault;
    }
}
