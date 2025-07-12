package com.sonexa.backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonexa.backend.model.Transaction;
import com.sonexa.backend.model.TransactionStatus;
import com.sonexa.backend.model.TransactionType;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, UUID> {

    List<Transaction> findByUserIdOrderByCreatedAtDesc(UUID userId);

    List<Transaction> findByUserIdAndStatusOrderByCreatedAtDesc(UUID userId, TransactionStatus status);

    List<Transaction> findByUserIdAndTypeOrderByCreatedAtDesc(UUID userId, TransactionType type);

    Transaction findByStripePaymentIntentId(String stripePaymentIntentId);

    List<Transaction> findByOrganizationIdOrderByCreatedAtDesc(UUID organizationId);
}
