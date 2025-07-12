package com.sonexa.backend.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sonexa.backend.dto.ActivityLogResponse;
import com.sonexa.backend.dto.settings.AccountDeletionRequest;
import com.sonexa.backend.dto.settings.EmailIntegrationRequest;
import com.sonexa.backend.dto.settings.EmailIntegrationResponse;
import com.sonexa.backend.dto.settings.NotificationSettingsRequest;
import com.sonexa.backend.dto.settings.NotificationSettingsResponse;
import com.sonexa.backend.dto.settings.PasswordChangeRequest;
import com.sonexa.backend.dto.settings.PaymentMethodRequest;
import com.sonexa.backend.dto.settings.PaymentMethodResponse;
import com.sonexa.backend.dto.settings.PersonalSettingsRequest;
import com.sonexa.backend.dto.settings.PersonalSettingsResponse;
import com.sonexa.backend.dto.settings.PrivacySettingsRequest;
import com.sonexa.backend.dto.settings.PrivacySettingsResponse;
import com.sonexa.backend.dto.settings.RegionalSettingsRequest;
import com.sonexa.backend.dto.settings.RegionalSettingsResponse;
import com.sonexa.backend.dto.settings.TwoFactorSetupResponse;
import com.sonexa.backend.dto.settings.TwoFactorStatusResponse;
import com.sonexa.backend.dto.settings.TwoFactorVerifyRequest;
import com.sonexa.backend.dto.settings.VoiceSettingsRequest;
import com.sonexa.backend.dto.settings.VoiceSettingsResponse;
import com.sonexa.backend.model.User;
import com.sonexa.backend.service.SettingsService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/settings")
public class SettingsController {

    private static final Logger logger = LoggerFactory.getLogger(SettingsController.class);

    @Autowired
    private SettingsService settingsService;

    // Personal Settings
    @GetMapping("/personal")
    public ResponseEntity<PersonalSettingsResponse> getPersonalSettings(@AuthenticationPrincipal User user) {
        PersonalSettingsResponse settings = settingsService.getPersonalSettings(user);
        return ResponseEntity.ok(settings);
    }

    @PutMapping("/personal")
    public ResponseEntity<PersonalSettingsResponse> updatePersonalSettings(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody PersonalSettingsRequest request) {
        PersonalSettingsResponse settings = settingsService.updatePersonalSettings(user, request);
        return ResponseEntity.ok(settings);
    }

    // Notification Settings
    @GetMapping("/notifications")
    public ResponseEntity<NotificationSettingsResponse> getNotificationSettings(@AuthenticationPrincipal User user) {
        NotificationSettingsResponse settings = settingsService.getNotificationSettings(user);
        return ResponseEntity.ok(settings);
    }

    @PutMapping("/notifications")
    public ResponseEntity<NotificationSettingsResponse> updateNotificationSettings(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody NotificationSettingsRequest request) {
        NotificationSettingsResponse settings = settingsService.updateNotificationSettings(user, request);
        return ResponseEntity.ok(settings);
    }

    // Privacy Settings
    @GetMapping("/privacy")
    public ResponseEntity<PrivacySettingsResponse> getPrivacySettings(@AuthenticationPrincipal User user) {
        PrivacySettingsResponse settings = settingsService.getPrivacySettings(user);
        return ResponseEntity.ok(settings);
    }

    @PutMapping("/privacy")
    public ResponseEntity<PrivacySettingsResponse> updatePrivacySettings(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody PrivacySettingsRequest request) {
        PrivacySettingsResponse settings = settingsService.updatePrivacySettings(user, request);
        return ResponseEntity.ok(settings);
    }

    // Regional Settings
    @GetMapping("/regional")
    public ResponseEntity<RegionalSettingsResponse> getRegionalSettings(@AuthenticationPrincipal User user) {
        RegionalSettingsResponse settings = settingsService.getRegionalSettings(user);
        return ResponseEntity.ok(settings);
    }

    @PutMapping("/regional")
    public ResponseEntity<RegionalSettingsResponse> updateRegionalSettings(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody RegionalSettingsRequest request) {
        RegionalSettingsResponse settings = settingsService.updateRegionalSettings(user, request);
        return ResponseEntity.ok(settings);
    }

    // Voice Settings
    @GetMapping("/voice")
    public ResponseEntity<VoiceSettingsResponse> getVoiceSettings(@AuthenticationPrincipal User user) {
        VoiceSettingsResponse settings = settingsService.getVoiceSettings(user);
        return ResponseEntity.ok(settings);
    }

    @PutMapping("/voice")
    public ResponseEntity<VoiceSettingsResponse> updateVoiceSettings(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody VoiceSettingsRequest request) {
        VoiceSettingsResponse settings = settingsService.updateVoiceSettings(user, request);
        return ResponseEntity.ok(settings);
    }

    // Email Integration
    @GetMapping("/email-integration")
    public ResponseEntity<EmailIntegrationResponse> getEmailIntegration(@AuthenticationPrincipal User user) {
        EmailIntegrationResponse settings = settingsService.getEmailIntegration(user);
        return ResponseEntity.ok(settings);
    }

    @PutMapping("/email-integration")
    public ResponseEntity<EmailIntegrationResponse> updateEmailIntegration(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody EmailIntegrationRequest request) {
        EmailIntegrationResponse settings = settingsService.updateEmailIntegration(user, request);
        return ResponseEntity.ok(settings);
    }

    @PostMapping("/email-integration/test")
    public ResponseEntity<Void> testEmailIntegration(@AuthenticationPrincipal User user) {
        settingsService.testEmailIntegration(user);
        return ResponseEntity.ok().build();
    }

    // Payment Methods
    @GetMapping("/payment-methods")
    public ResponseEntity<List<PaymentMethodResponse>> getPaymentMethods(@AuthenticationPrincipal User user) {
        List<PaymentMethodResponse> paymentMethods = settingsService.getPaymentMethods(user);
        return ResponseEntity.ok(paymentMethods);
    }

    @PostMapping("/payment-methods")
    public ResponseEntity<PaymentMethodResponse> addPaymentMethod(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody PaymentMethodRequest request) {
        PaymentMethodResponse paymentMethod = settingsService.addPaymentMethod(user, request);
        return ResponseEntity.ok(paymentMethod);
    }

    @DeleteMapping("/payment-methods/{id}")
    public ResponseEntity<Void> removePaymentMethod(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {
        settingsService.removePaymentMethod(user, id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/payment-methods/{id}/default")
    public ResponseEntity<Void> setDefaultPaymentMethod(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {
        settingsService.setDefaultPaymentMethod(user, id);
        return ResponseEntity.ok().build();
    }

    // Two-Factor Authentication
    @GetMapping("/two-factor")
    public ResponseEntity<TwoFactorStatusResponse> getTwoFactorStatus(@AuthenticationPrincipal User user) {
        TwoFactorStatusResponse status = settingsService.getTwoFactorStatus(user);
        return ResponseEntity.ok(status);
    }

    @PostMapping("/two-factor/setup")
    public ResponseEntity<TwoFactorSetupResponse> setupTwoFactor(@AuthenticationPrincipal User user) {
        TwoFactorSetupResponse setup = settingsService.setupTwoFactor(user);
        return ResponseEntity.ok(setup);
    }

    @PostMapping("/two-factor/verify")
    public ResponseEntity<Void> verifyTwoFactor(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody TwoFactorVerifyRequest request) {
        settingsService.verifyTwoFactor(user, request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/two-factor/disable")
    public ResponseEntity<Void> disableTwoFactor(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody TwoFactorVerifyRequest request) {
        settingsService.disableTwoFactor(user, request);
        return ResponseEntity.ok().build();
    }

    // Security
    @PostMapping("/password/change")
    public ResponseEntity<Void> changePassword(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody PasswordChangeRequest request) {
        settingsService.changePassword(user, request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/activity-log")
    public ResponseEntity<Page<ActivityLogResponse>> getActivityLog(
            @AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<ActivityLogResponse> activityLog = settingsService.getActivityLog(user, page, size);
        return ResponseEntity.ok(activityLog);
    }

    @PostMapping("/account/delete")
    public ResponseEntity<Void> deleteAccount(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody AccountDeletionRequest request) {
        settingsService.deleteAccount(user, request);
        return ResponseEntity.ok().build();
    }
}
