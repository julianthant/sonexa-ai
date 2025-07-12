package com.sonexa.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentMethod;
import com.stripe.model.Customer;
import com.stripe.param.CustomerCreateParams;

import com.sonexa.backend.dto.settings.PaymentMethodRequest;
import com.sonexa.backend.model.User;
import com.sonexa.backend.model.Transaction;
import com.sonexa.backend.model.ActivityType;
import com.sonexa.backend.repository.PaymentMethodRepository;
import com.sonexa.backend.repository.TransactionRepository;
import com.sonexa.backend.repository.UserRepository;
import com.sonexa.backend.exception.BadRequestException;

import jakarta.annotation.PostConstruct;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class PaymentService {

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ActivityLogService activityLogService;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    public List<com.sonexa.backend.model.PaymentMethod> getUserPaymentMethods(UUID userId) {
        return paymentMethodRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public com.sonexa.backend.model.PaymentMethod addPaymentMethod(User user, PaymentMethodRequest request) {
        try {
            // Ensure user has a Stripe customer ID
            if (user.getCustomVoiceEmail() == null) { // Using this field temporarily for Stripe customer ID
                createStripeCustomer(user);
            }

            // Retrieve the payment method from Stripe
            PaymentMethod stripePaymentMethod = PaymentMethod.retrieve(request.getStripePaymentMethodId());

            // Attach to customer
            stripePaymentMethod.attach(
                    com.stripe.param.PaymentMethodAttachParams.builder()
                            .setCustomer(user.getCustomVoiceEmail()) // Stripe customer ID
                            .build()
            );

            // Create our payment method record
            com.sonexa.backend.model.PaymentMethod paymentMethod
                    = new com.sonexa.backend.model.PaymentMethod(user, request.getStripePaymentMethodId(), stripePaymentMethod.getType());

            if (stripePaymentMethod.getCard() != null) {
                paymentMethod.setLast4(stripePaymentMethod.getCard().getLast4());
                paymentMethod.setBrand(stripePaymentMethod.getCard().getBrand());
                paymentMethod.setExpiryMonth(stripePaymentMethod.getCard().getExpMonth().toString());
                paymentMethod.setExpiryYear(stripePaymentMethod.getCard().getExpYear().toString());
            }

            // Set as default if requested or if it's the first payment method
            List<com.sonexa.backend.model.PaymentMethod> existingMethods = getUserPaymentMethods(user.getId());
            if (request.isSetAsDefault() || existingMethods.isEmpty()) {
                // Unset other default methods
                existingMethods.forEach(pm -> {
                    pm.setDefault(false);
                    paymentMethodRepository.save(pm);
                });
                paymentMethod.setDefault(true);
            }

            com.sonexa.backend.model.PaymentMethod savedMethod = paymentMethodRepository.save(paymentMethod);

            activityLogService.logActivity(user, ActivityType.PAYMENT_ADDED,
                    "Payment method added: " + paymentMethod.getBrand() + " ending in " + paymentMethod.getLast4());

            return savedMethod;

        } catch (StripeException e) {
            throw new BadRequestException("Failed to add payment method: " + e.getMessage());
        }
    }

    public void removePaymentMethod(User user, String paymentMethodId) {
        com.sonexa.backend.model.PaymentMethod paymentMethod
                = paymentMethodRepository.findById(UUID.fromString(paymentMethodId))
                        .orElseThrow(() -> new BadRequestException("Payment method not found"));

        if (!paymentMethod.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Payment method does not belong to user");
        }

        try {
            // Detach from Stripe
            PaymentMethod stripePaymentMethod = PaymentMethod.retrieve(paymentMethod.getStripePaymentMethodId());
            stripePaymentMethod.detach();

            paymentMethodRepository.delete(paymentMethod);

            activityLogService.logActivity(user, ActivityType.PAYMENT_REMOVED,
                    "Payment method removed: " + paymentMethod.getBrand() + " ending in " + paymentMethod.getLast4());

        } catch (StripeException e) {
            throw new BadRequestException("Failed to remove payment method: " + e.getMessage());
        }
    }

    public void setDefaultPaymentMethod(User user, String paymentMethodId) {
        com.sonexa.backend.model.PaymentMethod paymentMethod
                = paymentMethodRepository.findById(UUID.fromString(paymentMethodId))
                        .orElseThrow(() -> new BadRequestException("Payment method not found"));

        if (!paymentMethod.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Payment method does not belong to user");
        }

        // Unset other default methods
        List<com.sonexa.backend.model.PaymentMethod> userMethods = getUserPaymentMethods(user.getId());
        userMethods.forEach(pm -> {
            pm.setDefault(false);
            paymentMethodRepository.save(pm);
        });

        // Set this one as default
        paymentMethod.setDefault(true);
        paymentMethodRepository.save(paymentMethod);

        activityLogService.logActivity(user, ActivityType.SETTINGS_CHANGE,
                "Default payment method changed to: " + paymentMethod.getBrand() + " ending in " + paymentMethod.getLast4());
    }

    public List<Transaction> getUserTransactions(UUID userId) {
        return transactionRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    private void createStripeCustomer(User user) throws StripeException {
        CustomerCreateParams params = CustomerCreateParams.builder()
                .setEmail(user.getEmail())
                .setName(user.getFirstName() + " " + user.getLastName())
                .build();

        Customer customer = Customer.create(params);

        // Store Stripe customer ID (temporarily using customVoiceEmail field)
        user.setCustomVoiceEmail(customer.getId());
        userRepository.save(user);
    }
}
