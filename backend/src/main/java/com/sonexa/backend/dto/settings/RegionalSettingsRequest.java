package com.sonexa.backend.dto.settings;

import jakarta.validation.constraints.Size;

public class RegionalSettingsRequest {

    @Size(max = 10, message = "Language must be less than 10 characters")
    private String language;

    @Size(max = 50, message = "Timezone must be less than 50 characters")
    private String timezone;

    @Size(max = 10, message = "Currency must be less than 10 characters")
    private String currency;

    @Size(max = 20, message = "Date format must be less than 20 characters")
    private String dateFormat;

    @Size(max = 10, message = "Time format must be less than 10 characters")
    private String timeFormat;

    // Constructors
    public RegionalSettingsRequest() {
    }

    // Getters and Setters
    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getTimezone() {
        return timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getDateFormat() {
        return dateFormat;
    }

    public void setDateFormat(String dateFormat) {
        this.dateFormat = dateFormat;
    }

    public String getTimeFormat() {
        return timeFormat;
    }

    public void setTimeFormat(String timeFormat) {
        this.timeFormat = timeFormat;
    }
}
