package com.sonexa.backend.service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.sonexa.backend.dto.PaymentIntentRequest;
import com.sonexa.backend.dto.PaymentIntentResponse;
import com.sonexa.backend.dto.SubscriptionCreateRequest;
import com.sonexa.backend.model.SubscriptionTier;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.CustomerSearchResult;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.model.SetupIntent;
import com.stripe.model.Subscription;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerSearchParams;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.SetupIntentCreateParams;
import com.stripe.param.SubscriptionCreateParams;
import com.stripe.param.SubscriptionUpdateParams;
import com.stripe.net.Webhook;
import com.stripe.exception.SignatureVerificationException;

/**
 * Service for handling Stripe payment operations
 */
@Service
public class StripePaymentService {

    @Value("${stripe.webhook.secret}")
    private String webhookSecret;

    /**
     * Create a payment intent for one-time payments
     */
    public PaymentIntentResponse createPaymentIntent(PaymentIntentRequest request) throws StripeException {
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(request.getAmount())
                .setCurrency(request.getCurrency())
                .setDescription(request.getDescription())
                .putMetadata("user_email", request.getUserEmail())
                .putMetadata("subscription_tier", request.getSubscriptionTier())
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                .setEnabled(true)
                                .build()
                )
                .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);

        return new PaymentIntentResponse(
                paymentIntent.getClientSecret(),
                paymentIntent.getId(),
                paymentIntent.getStatus(),
                paymentIntent.getAmount(),
                paymentIntent.getCurrency(),
                paymentIntent.getDescription()
        );
    }

    /**
     * Create or retrieve a Stripe customer
     */
    public Customer createOrGetCustomer(String email, String name) throws StripeException {
        // First, try to find existing customer
        CustomerSearchParams searchParams = CustomerSearchParams.builder()
                .setQuery("email:'" + email + "'")
                .build();

        CustomerSearchResult searchResult = Customer.search(searchParams);

        if (!searchResult.getData().isEmpty()) {
            return searchResult.getData().get(0);
        }

        // Create new customer if not found
        CustomerCreateParams params = CustomerCreateParams.builder()
                .setEmail(email)
                .setName(name)
                .build();

        return Customer.create(params);
    }

    /**
     * Create a subscription for recurring payments
     */
    public Subscription createSubscription(SubscriptionCreateRequest request) throws StripeException {
        // Get or create customer
        Customer customer = createOrGetCustomer(request.getUserEmail(), null);

        // Get price ID based on subscription tier
        String priceId = getPriceIdForTier(request.getSubscriptionTier(), request.isAnnual());

        SubscriptionCreateParams params = SubscriptionCreateParams.builder()
                .setCustomer(customer.getId())
                .addItem(
                        SubscriptionCreateParams.Item.builder()
                                .setPrice(priceId)
                                .build()
                )
                .setDefaultPaymentMethod(request.getPaymentMethodId())
                .addExpand("latest_invoice.payment_intent")
                .build();

        return Subscription.create(params);
    }

    /**
     * Cancel a subscription
     */
    public Subscription cancelSubscription(String subscriptionId) throws StripeException {
        Subscription subscription = Subscription.retrieve(subscriptionId);
        return subscription.cancel();
    }

    /**
     * Update subscription tier
     */
    public Subscription updateSubscription(String subscriptionId, String newTier, boolean isAnnual) throws StripeException {
        Subscription subscription = Subscription.retrieve(subscriptionId);
        String newPriceId = getPriceIdForTier(newTier, isAnnual);

        SubscriptionUpdateParams params = SubscriptionUpdateParams.builder()
                .addItem(
                        SubscriptionUpdateParams.Item.builder()
                                .setId(subscription.getItems().getData().get(0).getId())
                                .setPrice(newPriceId)
                                .build()
                )
                .build();

        return subscription.update(params);
    }

    /**
     * Get usage for a subscription (for usage-based billing)
     */
    public Map<String, Object> getSubscriptionUsage(String subscriptionId) throws StripeException {
        Subscription subscription = Subscription.retrieve(subscriptionId);

        Map<String, Object> usage = new HashMap<>();
        usage.put("subscription_id", subscriptionId);
        usage.put("status", subscription.getStatus());
        usage.put("current_period_start", subscription.getCurrentPeriodStart());
        usage.put("current_period_end", subscription.getCurrentPeriodEnd());

        return usage;
    }

    /**
     * Create a setup intent for saving payment methods
     */
    public SetupIntent createSetupIntent(String customerId) throws StripeException {
        SetupIntentCreateParams params = SetupIntentCreateParams.builder()
                .setCustomer(customerId)
                .setUsage(SetupIntentCreateParams.Usage.OFF_SESSION)
                .build();

        return SetupIntent.create(params);
    }

    /**
     * Verify webhook signature
     */
    public Event verifyWebhookSignature(String payload, String sigHeader) throws StripeException {
        try {
            return Webhook.constructEvent(payload, sigHeader, webhookSecret);
        } catch (SignatureVerificationException e) {
            throw new IllegalArgumentException("Invalid webhook signature: " + e.getMessage());
        }
    }

    /**
     * Get amount in cents for subscription tier
     */
    public long getAmountForTier(SubscriptionTier tier, boolean isAnnual) {
        BigDecimal monthlyPrice = switch (tier) {
            case BASIC ->
                new BigDecimal("19.99");
            case PREMIUM ->
                new BigDecimal("79.99");
            case ENTERPRISE ->
                new BigDecimal("299.99");
            default ->
                throw new IllegalArgumentException("Invalid subscription tier: " + tier);
        };

        if (isAnnual) {
            // 10% discount for annual billing
            monthlyPrice = monthlyPrice.multiply(new BigDecimal("12")).multiply(new BigDecimal("0.9"));
        }

        return monthlyPrice.multiply(new BigDecimal("100")).longValue(); // Convert to cents
    }

    /**
     * Get Stripe price ID for subscription tier
     * These would be configured in your Stripe dashboard
     */
    private String getPriceIdForTier(String tier, boolean isAnnual) {
        // These price IDs should be configured in your Stripe dashboard
        // For now, returning placeholder values
        String suffix = isAnnual ? "_annual" : "_monthly";

        return switch (tier.toUpperCase()) {
            case "BASIC" -> "price_basic" + suffix;
            case "PREMIUM" -> "price_premium" + suffix;
            case "ENTERPRISE" -> "price_enterprise" + suffix;
            default -> throw new IllegalArgumentException("Invalid subscription tier: " + tier);
        };
    }
}
