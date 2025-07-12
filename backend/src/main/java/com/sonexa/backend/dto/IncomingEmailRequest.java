package com.sonexa.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class IncomingEmailRequest {

    @NotBlank(message = "From email is required")
    @Email(message = "Valid from email is required")
    private String fromEmail;

    @NotBlank(message = "To email is required")
    @Email(message = "Valid to email is required")
    private String toEmail;

    @NotBlank(message = "Subject is required")
    private String subject;

    private String body; // Email content (optional)

    private String messageId; // Email service message ID (optional)

    // Constructors
    public IncomingEmailRequest() {
    }

    public IncomingEmailRequest(String fromEmail, String toEmail, String subject, String body) {
        this.fromEmail = fromEmail;
        this.toEmail = toEmail;
        this.subject = subject;
        this.body = body;
    }

    // Getters and Setters
    public String getFromEmail() {
        return fromEmail;
    }

    public void setFromEmail(String fromEmail) {
        this.fromEmail = fromEmail;
    }

    public String getToEmail() {
        return toEmail;
    }

    public void setToEmail(String toEmail) {
        this.toEmail = toEmail;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getMessageId() {
        return messageId;
    }

    public void setMessageId(String messageId) {
        this.messageId = messageId;
    }
}
