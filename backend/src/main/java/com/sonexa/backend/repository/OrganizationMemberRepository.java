package com.sonexa.backend.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sonexa.backend.model.OrganizationMember;
import com.sonexa.backend.model.OrganizationRole;

@Repository
public interface OrganizationMemberRepository extends JpaRepository<OrganizationMember, Long> {

    List<OrganizationMember> findByOrganizationIdAndIsActiveTrue(Long organizationId);

    List<OrganizationMember> findByUserIdAndIsActiveTrue(UUID userId);

    Optional<OrganizationMember> findByOrganizationIdAndUserIdAndIsActiveTrue(Long organizationId, UUID userId);

    List<OrganizationMember> findByOrganizationIdAndRoleAndIsActiveTrue(Long organizationId, OrganizationRole role);

    @Query("SELECT om FROM OrganizationMember om WHERE om.organization.id = :organizationId AND om.role IN :roles AND om.isActive = true")
    List<OrganizationMember> findByOrganizationIdAndRolesAndIsActiveTrue(@Param("organizationId") Long organizationId, @Param("roles") List<OrganizationRole> roles);

    long countByOrganizationIdAndIsActiveTrue(Long organizationId);

    boolean existsByOrganizationIdAndUserIdAndIsActiveTrue(Long organizationId, UUID userId);
}
