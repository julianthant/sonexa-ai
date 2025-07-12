package com.sonexa.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.sonexa.backend.dto.settings.*;
import com.sonexa.backend.dto.ActivityLogResponse;
import com.sonexa.backend.model.User;
import com.sonexa.backend.model.ActivityType;
import com.sonexa.backend.repository.UserRepository;
import com.sonexa.backend.exception.BadRequestException;
import com.sonexa.backend.exception.UnauthorizedException;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.List;

@Service
@Transactional
public class SettingsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ActivityLogService activityLogService;

    @Autowired
    private TwoFactorService twoFactorService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PaymentService paymentService;

    // Personal Settings
    public PersonalSettingsResponse getPersonalSettings(User user) {
        return new PersonalSettingsResponse(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getCompany(),
                "", // bio - not in User model yet
                "", // avatar - not in User model yet
                "", // website - not in User model yet
                "" // location - not in User model yet
        );
    }

    public PersonalSettingsResponse updatePersonalSettings(User user, PersonalSettingsRequest request) {
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());

        if (request.getEmail() != null && !request.getEmail().equals(user.getEmail())) {
            // Check if email already exists
            if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                throw new BadRequestException("Email already exists");
            }
            user.setEmail(request.getEmail());
        }

        user.setCompany(request.getCompany());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setTimezone(request.getTimezone());
        user.setCustomVoiceEmail(request.getCustomVoiceEmail());

        User savedUser = userRepository.save(user);
        activityLogService.logActivity(user, ActivityType.PROFILE_UPDATE, "Personal settings updated");

        return getPersonalSettings(savedUser);
    }

    // Notification Settings
    public NotificationSettingsResponse getNotificationSettings(User user) {
        return new NotificationSettingsResponse(
                user.isEmailNotifications(),
                user.isPushNotifications(),
                user.isSmsNotifications(),
                user.isVoiceNotifications(),
                user.isMarketingEmails(),
                user.isSecurityAlerts()
        );
    }

    public NotificationSettingsResponse updateNotificationSettings(User user, NotificationSettingsRequest request) {
        user.setEmailNotifications(request.isEmailNotifications());
        user.setPushNotifications(request.isPushNotifications());
        user.setSmsNotifications(request.isSmsNotifications());
        user.setVoiceNotifications(request.isVoiceNotifications());
        user.setMarketingEmails(request.isMarketingEmails());
        user.setSecurityAlerts(request.isSecurityAlerts());

        User savedUser = userRepository.save(user);
        activityLogService.logActivity(user, ActivityType.SETTINGS_CHANGE, "Notification settings updated");

        return getNotificationSettings(savedUser);
    }

    // Privacy Settings
    public PrivacySettingsResponse getPrivacySettings(User user) {
        return new PrivacySettingsResponse(
                user.isProfileVisibility(),
                user.isDataCollection(),
                user.isAnalyticsTracking(),
                user.isThirdPartySharing(),
                user.isTwoFactorEnabled(),
                user.isSessionTimeout(),
                user.getSessionTimeoutMinutes()
        );
    }

    public PrivacySettingsResponse updatePrivacySettings(User user, PrivacySettingsRequest request) {
        user.setProfileVisibility(request.isProfileVisibility());
        user.setDataCollection(request.isDataCollection());
        user.setAnalyticsTracking(request.isAnalyticsTracking());
        user.setThirdPartySharing(request.isThirdPartySharing());
        user.setSessionTimeout(request.isSessionTimeout());
        user.setSessionTimeoutMinutes(request.getSessionTimeoutMinutes());

        User savedUser = userRepository.save(user);
        activityLogService.logActivity(user, ActivityType.SETTINGS_CHANGE, "Privacy settings updated");

        return getPrivacySettings(savedUser);
    }

    // Regional Settings
    public RegionalSettingsResponse getRegionalSettings(User user) {
        return new RegionalSettingsResponse(
                user.getLanguage(),
                user.getCurrency(),
                user.getDateFormat(),
                user.getTimeFormat(),
                user.getTimezone()
        );
    }

    public RegionalSettingsResponse updateRegionalSettings(User user, RegionalSettingsRequest request) {
        user.setLanguage(request.getLanguage());
        user.setCurrency(request.getCurrency());
        user.setDateFormat(request.getDateFormat());
        user.setTimeFormat(request.getTimeFormat());
        user.setTimezone(request.getTimezone());

        User savedUser = userRepository.save(user);
        activityLogService.logActivity(user, ActivityType.SETTINGS_CHANGE, "Regional settings updated");

        return getRegionalSettings(savedUser);
    }

    // Voice Settings
    public VoiceSettingsResponse getVoiceSettings(User user) {
        return new VoiceSettingsResponse(
                user.getPreferredVoice(),
                user.getVoiceSpeed(),
                user.isTranscriptionEnabled(),
                user.isAutoTranscribe(),
                user.getTranscriptionLanguage()
        );
    }

    public VoiceSettingsResponse updateVoiceSettings(User user, VoiceSettingsRequest request) {
        user.setPreferredVoice(request.getPreferredVoice());
        user.setVoiceSpeed(request.getVoiceSpeed());
        user.setTranscriptionEnabled(request.isTranscriptionEnabled());
        user.setAutoTranscribe(request.isAutoTranscribe());
        user.setTranscriptionLanguage(request.getTranscriptionLanguage());

        User savedUser = userRepository.save(user);
        activityLogService.logActivity(user, ActivityType.SETTINGS_CHANGE, "Voice settings updated");

        return getVoiceSettings(savedUser);
    }

    // Email Integration
    public EmailIntegrationResponse getEmailIntegration(User user) {
        return new EmailIntegrationResponse(
                user.isEmailIntegrationEnabled(),
                user.getPrimaryEmailService(),
                user.getGmailAccessToken() != null,
                user.getOutlookAccessToken() != null
        );
    }

    public EmailIntegrationResponse updateEmailIntegration(User user, EmailIntegrationRequest request) {
        String oauthUrl = initiateEmailIntegration(user, request);
        // For now, return current settings - in real implementation this would be handled by OAuth callback
        return getEmailIntegration(user);
    }

    public void testEmailIntegration(User user) {
        if (!user.isEmailIntegrationEnabled()) {
            throw new BadRequestException("Email integration is not enabled");
        }

        emailService.sendNotificationEmail(user, "Test Email", "This is a test email from your Sonexa AI integration.");
        activityLogService.logActivity(user, ActivityType.SETTINGS_CHANGE, "Email integration test sent");
    }

    private String initiateEmailIntegration(User user, EmailIntegrationRequest request) {
        // Generate OAuth URL for the requested service
        if ("gmail".equals(request.getService())) {
            return generateGmailOAuthUrl(user, request.getRedirectUri());
        } else if ("outlook".equals(request.getService())) {
            return generateOutlookOAuthUrl(user, request.getRedirectUri());
        } else {
            throw new BadRequestException("Unsupported email service: " + request.getService());
        }
    }

    // Payment Methods (delegate to PaymentService)
    public List<PaymentMethodResponse> getPaymentMethods(User user) {
        return paymentService.getUserPaymentMethods(user);
    }

    public PaymentMethodResponse addPaymentMethod(User user, PaymentMethodRequest request) {
        return paymentService.createPaymentMethod(user, request);
    }

    public void removePaymentMethod(User user, Long id) {
        paymentService.deletePaymentMethod(user, id);
    }

    public void setDefaultPaymentMethod(User user, Long id) {
        paymentService.setDefaultPaymentMethod(user, id);
    }

    // Two Factor Authentication
    public TwoFactorStatusResponse getTwoFactorStatus(User user) {
        return new TwoFactorStatusResponse(
                user.isTwoFactorEnabled(),
                user.getTwoFactorSecret() != null,
                user.isTwoFactorEnabled() ? generateBackupCodes() : null
        );
    }

    public TwoFactorSetupResponse setupTwoFactor(User user) {
        if (user.isTwoFactorEnabled()) {
            throw new BadRequestException("Two-factor authentication is already enabled");
        }

        String secret = twoFactorService.generateSecret();
        String qrCodeUrl = twoFactorService.generateQRCodeUrl(user.getEmail(), secret);
        String[] backupCodes = generateBackupCodes();

        user.setTwoFactorSecret(secret);
        userRepository.save(user);

        return new TwoFactorSetupResponse(qrCodeUrl, secret, String.join(",", backupCodes));
    }

    public void verifyTwoFactor(User user, TwoFactorVerifyRequest request) {
        if (user.getTwoFactorSecret() == null) {
            throw new BadRequestException("Two-factor authentication is not set up");
        }

        if (!twoFactorService.verifyCode(user.getTwoFactorSecret(), request.getCode())) {
            throw new BadRequestException("Invalid verification code");
        }

        user.setTwoFactorEnabled(true);
        userRepository.save(user);

        activityLogService.logActivity(user, ActivityType.SETTINGS_CHANGE,
                "Two-factor authentication enabled");
    }

    public void disableTwoFactor(User user, TwoFactorVerifyRequest request) {
        if (!user.isTwoFactorEnabled()) {
            throw new BadRequestException("Two-factor authentication is not enabled");
        }

        if (!twoFactorService.verifyCode(user.getTwoFactorSecret(), request.getCode())) {
            throw new BadRequestException("Invalid verification code");
        }

        user.setTwoFactorEnabled(false);
        user.setTwoFactorSecret(null);
        userRepository.save(user);

        activityLogService.logActivity(user, ActivityType.SETTINGS_CHANGE,
                "Two-factor authentication disabled");
    }

    // Security
    public void changePassword(User user, PasswordChangeRequest request) {
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new UnauthorizedException("Current password is incorrect");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("New password and confirmation do not match");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        activityLogService.logActivity(user, ActivityType.SETTINGS_CHANGE, "Password changed");

        // Send notification email
        emailService.sendPasswordChangeNotification(user);
    }

    public Page<ActivityLogResponse> getActivityLog(User user, int page, int size) {
        return activityLogService.getUserActivityLog(user, PageRequest.of(page, size));
    }

    public void deleteAccount(User user, AccountDeletionRequest request) {
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Password is incorrect");
        }

        if (!"DELETE".equals(request.getConfirmation())) {
            throw new BadRequestException("Invalid confirmation. Please type 'DELETE'");
        }

        // Log the deletion
        activityLogService.logActivity(user, ActivityType.SETTINGS_CHANGE,
                "Account deletion requested. Reason: " + request.getReason());

        // Anonymize user data instead of hard delete
        user.setEmail("deleted_" + user.getId() + "@deleted.com");
        user.setFirstName("Deleted");
        user.setLastName("User");
        user.setPassword(null);
        user.setCustomVoiceEmail(null);
        // Keep other fields for analytics but mark as deleted

        userRepository.save(user);
    }

    private String generateGmailOAuthUrl(User user, String redirectUri) {
        // Implementation for Gmail OAuth URL generation
        // This would use Google OAuth2 library
        return "https://accounts.google.com/oauth2/auth?client_id=CLIENT_ID&redirect_uri=" + redirectUri + "&scope=email";
    }

    private String generateOutlookOAuthUrl(User user, String redirectUri) {
        // Implementation for Outlook OAuth URL generation
        // This would use Microsoft Graph OAuth2 library
        return "https://login.microsoftonline.com/oauth2/v2.0/authorize?client_id=CLIENT_ID&redirect_uri=" + redirectUri + "&scope=mail.read";
    }

    private String[] generateBackupCodes() {
        SecureRandom random = new SecureRandom();
        String[] codes = new String[8];

        for (int i = 0; i < 8; i++) {
            byte[] bytes = new byte[6];
            random.nextBytes(bytes);
            codes[i] = Base64.getEncoder().encodeToString(bytes).substring(0, 8);
        }

        return codes;
    }
}
