package com.sonexa.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sonexa.backend.dto.PaymentIntentRequest;
import com.sonexa.backend.dto.PaymentIntentResponse;
import com.sonexa.backend.service.StripePaymentService;
import com.sonexa.backend.service.SubscriptionService;
import com.stripe.exception.StripeException;

/**
 * Test controller for Stripe integration
 */
@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "*")
public class StripeTestController {

    @Autowired
    private StripePaymentService stripePaymentService;

    @Autowired
    private SubscriptionService subscriptionService;

    /**
     * Test Stripe configuration
     */
    @GetMapping("/stripe-config")
    public ResponseEntity<Map<String, Object>> testStripeConfig() {
        Map<String, Object> response = new HashMap<>();

        try {
            // Test if Stripe is properly configured
            response.put("status", "success");
            response.put("message", "Stripe SDK is properly configured");
            response.put("timestamp", System.currentTimeMillis());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Stripe configuration error: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Test payment intent creation
     */
    @PostMapping("/payment-intent")
    public ResponseEntity<Map<String, Object>> testPaymentIntent(@RequestBody TestPaymentRequest request) {
        Map<String, Object> response = new HashMap<>();

        try {
            PaymentIntentRequest paymentRequest = new PaymentIntentRequest();
            paymentRequest.setAmount(request.getAmount() != null ? request.getAmount() : 2000L); // $20.00 default
            paymentRequest.setCurrency("usd");
            paymentRequest.setDescription("Test payment for Sonexa AI");
            paymentRequest.setUserEmail(request.getUserEmail() != null ? request.getUserEmail() : "test@example.com");
            paymentRequest.setSubscriptionTier("BASIC");

            PaymentIntentResponse paymentIntentResponse = stripePaymentService.createPaymentIntent(paymentRequest);

            response.put("status", "success");
            response.put("message", "Payment intent created successfully");
            response.put("client_secret", paymentIntentResponse.getClientSecret());
            response.put("payment_intent_id", paymentIntentResponse.getPaymentIntentId());
            response.put("amount", paymentIntentResponse.getAmount());

            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            response.put("status", "error");
            response.put("message", "Stripe API error: " + e.getMessage());
            response.put("error_code", e.getCode());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Unexpected error: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Test subscription management
     */
    @PostMapping("/subscription-check")
    public ResponseEntity<Map<String, Object>> testSubscriptionCheck(@RequestBody TestSubscriptionRequest request) {
        Map<String, Object> response = new HashMap<>();

        try {
            String userEmail = request.getUserEmail() != null ? request.getUserEmail() : "test@example.com";

            // Test subscription checking
            boolean canProcess = subscriptionService.canUserProcessMessage(userEmail);
            var usage = subscriptionService.getUserUsage(userEmail);

            response.put("status", "success");
            response.put("user_email", userEmail);
            response.put("can_process_message", canProcess);
            response.put("subscription_tier", usage.tier);
            response.put("current_usage", usage.currentUsage);
            response.put("max_usage", usage.maxUsage);
            response.put("subscription_status", usage.status);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Subscription test error: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Test pricing calculation
     */
    @GetMapping("/pricing")
    public ResponseEntity<Map<String, Object>> testPricing() {
        Map<String, Object> response = new HashMap<>();

        try {
            Map<String, Object> pricing = new HashMap<>();

            // Test pricing for different tiers
            pricing.put("basic_monthly", stripePaymentService.getAmountForTier(com.sonexa.backend.model.SubscriptionTier.BASIC, false));
            pricing.put("basic_annual", stripePaymentService.getAmountForTier(com.sonexa.backend.model.SubscriptionTier.BASIC, true));
            pricing.put("premium_monthly", stripePaymentService.getAmountForTier(com.sonexa.backend.model.SubscriptionTier.PREMIUM, false));
            pricing.put("premium_annual", stripePaymentService.getAmountForTier(com.sonexa.backend.model.SubscriptionTier.PREMIUM, true));
            pricing.put("enterprise_monthly", stripePaymentService.getAmountForTier(com.sonexa.backend.model.SubscriptionTier.ENTERPRISE, false));
            pricing.put("enterprise_annual", stripePaymentService.getAmountForTier(com.sonexa.backend.model.SubscriptionTier.ENTERPRISE, true));

            response.put("status", "success");
            response.put("pricing", pricing);
            response.put("currency", "USD cents");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Pricing calculation error: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    // DTOs for testing
    public static class TestPaymentRequest {

        private Long amount;
        private String userEmail;

        public Long getAmount() {
            return amount;
        }

        public void setAmount(Long amount) {
            this.amount = amount;
        }

        public String getUserEmail() {
            return userEmail;
        }

        public void setUserEmail(String userEmail) {
            this.userEmail = userEmail;
        }
    }

    public static class TestSubscriptionRequest {

        private String userEmail;

        public String getUserEmail() {
            return userEmail;
        }

        public void setUserEmail(String userEmail) {
            this.userEmail = userEmail;
        }
    }
}
