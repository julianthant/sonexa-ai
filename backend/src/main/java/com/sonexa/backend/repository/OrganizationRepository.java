package com.sonexa.backend.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sonexa.backend.model.Organization;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long> {

    Optional<Organization> findByInviteCode(String inviteCode);

    Optional<Organization> findByName(String name);

    List<Organization> findByCreatorId(UUID creatorId);

    List<Organization> findByIsActiveTrue();

    @Query("SELECT o FROM Organization o JOIN o.members om WHERE om.user.id = :userId AND om.isActive = true")
    List<Organization> findByUserId(@Param("userId") UUID userId);

    boolean existsByName(String name);

    boolean existsByInviteCode(String inviteCode);
}
