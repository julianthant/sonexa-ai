package com.sonexa.backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonexa.backend.model.PaymentMethod;

@Repository
public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, UUID> {

    List<PaymentMethod> findByUserIdOrderByCreatedAtDesc(UUID userId);

    PaymentMethod findByUserIdAndIsDefaultTrue(UUID userId);

    List<PaymentMethod> findByStripePaymentMethodId(String stripePaymentMethodId);
}
