package com.sonexa.backend.dto.settings;

public class RegionalSettingsResponse {

    private String language;
    private String currency;
    private String dateFormat;
    private String timeFormat;
    private String timezone;

    // Constructors
    public RegionalSettingsResponse() {
    }

    public RegionalSettingsResponse(String language, String currency, String dateFormat,
            String timeFormat, String timezone) {
        this.language = language;
        this.currency = currency;
        this.dateFormat = dateFormat;
        this.timeFormat = timeFormat;
        this.timezone = timezone;
    }

    // Getters and Setters
    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
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

    public String getTimezone() {
        return timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }
}
