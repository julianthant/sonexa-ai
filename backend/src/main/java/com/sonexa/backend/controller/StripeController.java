package com.sonexa.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sonexa.backend.dto.PaymentIntentRequest;
import com.sonexa.backend.dto.PaymentIntentResponse;
import com.sonexa.backend.dto.SubscriptionCreateRequest;
import com.sonexa.backend.service.StripePaymentService;
import com.sonexa.backend.service.UserService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.Subscription;
import com.stripe.net.Webhook;

import jakarta.validation.Valid;

/**
 * Controller for handling Stripe payment operations
 */
@RestController
@RequestMapping("/api/stripe")
@CrossOrigin(origins = "*")
public class StripeController {

    @Autowired
    private StripePaymentService stripePaymentService;

    @Autowired
    private UserService userService;

    @Value("${stripe.webhook.secret}")
    private String webhookSecret;

    /**
     * Create a payment intent for one-time payments
     */
    @PostMapping("/payment-intent")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createPaymentIntent(@Valid @RequestBody PaymentIntentRequest request) {
        try {
            PaymentIntentResponse response = stripePaymentService.createPaymentIntent(request);
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Payment intent creation failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    /**
     * Create a subscription
     */
    @PostMapping("/subscription")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createSubscription(@Valid @RequestBody SubscriptionCreateRequest request) {
        try {
            Subscription subscription = stripePaymentService.createSubscription(request);

            Map<String, Object> response = new HashMap<>();
            response.put("subscription_id", subscription.getId());
            response.put("status", subscription.getStatus());

            // Get client secret from latest invoice if available
            if (subscription.getLatestInvoice() != null) {
                try {
                    // Expand the payment intent to get client secret
                    com.stripe.model.Invoice invoice = com.stripe.model.Invoice.retrieve(subscription.getLatestInvoice());
                    if (invoice.getPaymentIntent() != null) {
                        com.stripe.model.PaymentIntent paymentIntent = com.stripe.model.PaymentIntent.retrieve(invoice.getPaymentIntent());
                        response.put("client_secret", paymentIntent.getClientSecret());
                    }
                } catch (StripeException e) {
                    // Client secret not available, but subscription was created
                    response.put("message", "Subscription created but client secret unavailable");
                }
            }

            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Subscription creation failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    /**
     * Cancel a subscription
     */
    @DeleteMapping("/subscription/{subscriptionId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> cancelSubscription(@PathVariable String subscriptionId) {
        try {
            Subscription subscription = stripePaymentService.cancelSubscription(subscriptionId);

            Map<String, Object> response = new HashMap<>();
            response.put("subscription_id", subscription.getId());
            response.put("status", subscription.getStatus());
            response.put("canceled_at", subscription.getCanceledAt());

            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Subscription cancellation failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    /**
     * Update subscription tier
     */
    @PutMapping("/subscription/{subscriptionId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateSubscription(
            @PathVariable String subscriptionId,
            @RequestParam String newTier,
            @RequestParam(defaultValue = "false") boolean isAnnual) {
        try {
            Subscription subscription = stripePaymentService.updateSubscription(subscriptionId, newTier, isAnnual);

            Map<String, Object> response = new HashMap<>();
            response.put("subscription_id", subscription.getId());
            response.put("status", subscription.getStatus());
            response.put("updated_at", System.currentTimeMillis() / 1000);

            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Subscription update failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    /**
     * Get subscription usage
     */
    @GetMapping("/subscription/{subscriptionId}/usage")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getSubscriptionUsage(@PathVariable String subscriptionId) {
        try {
            Map<String, Object> usage = stripePaymentService.getSubscriptionUsage(subscriptionId);
            return ResponseEntity.ok(usage);
        } catch (StripeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to get subscription usage: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    /**
     * Stripe webhook endpoint This handles events from Stripe like successful
     * payments, failed payments, etc.
     */
    @PostMapping("/webhook")
    public ResponseEntity<String> handleWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {

        Event event;

        try {
            event = Webhook.constructEvent(payload, sigHeader, webhookSecret);
        } catch (SignatureVerificationException e) {
            // Invalid signature
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid signature");
        }

        // Handle the event
        switch (event.getType()) {
            case "payment_intent.succeeded":
                handlePaymentIntentSucceeded(event);
                break;
            case "payment_intent.payment_failed":
                handlePaymentIntentFailed(event);
                break;
            case "customer.subscription.created":
                handleSubscriptionCreated(event);
                break;
            case "customer.subscription.updated":
                handleSubscriptionUpdated(event);
                break;
            case "customer.subscription.deleted":
                handleSubscriptionDeleted(event);
                break;
            case "invoice.payment_succeeded":
                handleInvoicePaymentSucceeded(event);
                break;
            case "invoice.payment_failed":
                handleInvoicePaymentFailed(event);
                break;
            default:
                System.out.println("Unhandled event type: " + event.getType());
        }

        return ResponseEntity.ok("Success");
    }

    private void handlePaymentIntentSucceeded(Event event) {
        // Handle successful payment
        System.out.println("Payment succeeded: " + event.getId());
        // TODO: Update user's subscription status in database
    }

    private void handlePaymentIntentFailed(Event event) {
        // Handle failed payment
        System.out.println("Payment failed: " + event.getId());
        // TODO: Notify user and update status
    }

    private void handleSubscriptionCreated(Event event) {
        // Handle new subscription
        System.out.println("Subscription created: " + event.getId());
        // TODO: Update user's subscription in database
    }

    private void handleSubscriptionUpdated(Event event) {
        // Handle subscription changes
        System.out.println("Subscription updated: " + event.getId());
        // TODO: Update user's subscription in database
    }

    private void handleSubscriptionDeleted(Event event) {
        // Handle subscription cancellation
        System.out.println("Subscription deleted: " + event.getId());
        // TODO: Update user's subscription status to cancelled
    }

    private void handleInvoicePaymentSucceeded(Event event) {
        // Handle successful recurring payment
        System.out.println("Invoice payment succeeded: " + event.getId());
        // TODO: Reset user's monthly usage counter
    }

    private void handleInvoicePaymentFailed(Event event) {
        // Handle failed recurring payment
        System.out.println("Invoice payment failed: " + event.getId());
        // TODO: Send warning to user, potentially suspend service
    }
}
