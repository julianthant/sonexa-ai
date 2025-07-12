package com.sonexa.backend.dto.settings;

import java.time.LocalDateTime;

public class PaymentMethodResponse {

    private Long id;
    private String type; // CREDIT_CARD, PAYPAL, BANK_ACCOUNT
    private String lastFour;
    private String brand;
    private String expiryDate;
    private boolean isDefault;
    private LocalDateTime createdAt;

    // Constructors
    public PaymentMethodResponse() {
    }

    public PaymentMethodResponse(Long id, String type, String lastFour, String brand,
            String expiryDate, boolean isDefault, LocalDateTime createdAt) {
        this.id = id;
        this.type = type;
        this.lastFour = lastFour;
        this.brand = brand;
        this.expiryDate = expiryDate;
        this.isDefault = isDefault;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLastFour() {
        return lastFour;
    }

    public void setLastFour(String lastFour) {
        this.lastFour = lastFour;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }

    public boolean isDefault() {
        return isDefault;
    }

    public void setDefault(boolean isDefault) {
        this.isDefault = isDefault;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
