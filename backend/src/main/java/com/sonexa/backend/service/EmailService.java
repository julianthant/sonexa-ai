package com.sonexa.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.sonexa.backend.model.User;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendPasswordChangeNotification(User user) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Password Changed - Sonexa AI");
        message.setText(String.format(
                "Hello %s,\n\n"
                + "Your password has been successfully changed.\n\n"
                + "If you did not make this change, please contact support immediately.\n\n"
                + "Best regards,\n"
                + "Sonexa AI Team",
                user.getFirstName()
        ));
        message.setFrom("noreply@sonexa.ai");

        mailSender.send(message);
    }

    public void sendTwoFactorEnabledNotification(User user) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Two-Factor Authentication Enabled - Sonexa AI");
        message.setText(String.format(
                "Hello %s,\n\n"
                + "Two-factor authentication has been enabled on your account.\n\n"
                + "Your account is now more secure!\n\n"
                + "Best regards,\n"
                + "Sonexa AI Team",
                user.getFirstName()
        ));
        message.setFrom("noreply@sonexa.ai");

        mailSender.send(message);
    }

    public void sendSecurityAlert(User user, String alertMessage) {
        if (!user.isSecurityAlerts()) {
            return; // User has disabled security alerts
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Security Alert - Sonexa AI");
        message.setText(String.format(
                "Hello %s,\n\n"
                + "Security Alert: %s\n\n"
                + "If this was you, you can ignore this message. Otherwise, please secure your account immediately.\n\n"
                + "Best regards,\n"
                + "Sonexa AI Team",
                user.getFirstName(),
                alertMessage
        ));
        message.setFrom("noreply@sonexa.ai");

        mailSender.send(message);
    }

    public void sendWelcomeEmail(User user) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Welcome to Sonexa AI!");
        message.setText(String.format(
                "Hello %s,\n\n"
                + "Welcome to Sonexa AI! We're excited to have you on board.\n\n"
                + "Get started by creating your first voice message.\n\n"
                + "Best regards,\n"
                + "Sonexa AI Team",
                user.getFirstName()
        ));
        message.setFrom("noreply@sonexa.ai");

        mailSender.send(message);
    }
}
