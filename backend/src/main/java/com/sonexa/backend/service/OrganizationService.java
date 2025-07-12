package com.sonexa.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sonexa.backend.model.Organization;
import com.sonexa.backend.model.OrganizationMember;
import com.sonexa.backend.model.OrganizationRole;
import com.sonexa.backend.model.User;
import com.sonexa.backend.repository.OrganizationMemberRepository;
import com.sonexa.backend.repository.OrganizationRepository;
import com.sonexa.backend.repository.UserRepository;

@Service
@Transactional
public class OrganizationService {

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private OrganizationMemberRepository organizationMemberRepository;

    @Autowired
    private UserRepository userRepository;

    public Organization createOrganization(String name, String description, UUID creatorId) {
        if (organizationRepository.existsByName(name)) {
            throw new IllegalArgumentException("Organization with this name already exists");
        }

        String inviteCode = generateUniqueInviteCode();
        Organization organization = new Organization(name, description, creatorId, inviteCode);
        organization = organizationRepository.save(organization);

        // Add creator as owner
        User creator = userRepository.findById(creatorId)
                .orElseThrow(() -> new IllegalArgumentException("Creator user not found"));

        OrganizationMember ownerMembership = new OrganizationMember(
                organization, creator, OrganizationRole.OWNER, creatorId
        );
        organizationMemberRepository.save(ownerMembership);

        return organization;
    }

    public Optional<Organization> findByInviteCode(String inviteCode) {
        return organizationRepository.findByInviteCode(inviteCode);
    }

    public List<Organization> findUserOrganizations(UUID userId) {
        return organizationRepository.findByUserId(userId);
    }

    public List<OrganizationMember> getOrganizationMembers(Long organizationId) {
        return organizationMemberRepository.findByOrganizationIdAndIsActiveTrue(organizationId);
    }

    public OrganizationMember joinOrganization(String inviteCode, UUID userId) {
        Organization organization = organizationRepository.findByInviteCode(inviteCode)
                .orElseThrow(() -> new IllegalArgumentException("Invalid invite code"));

        if (!organization.getIsActive()) {
            throw new IllegalArgumentException("Organization is not active");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Check if user is already a member
        if (organizationMemberRepository.existsByOrganizationIdAndUserIdAndIsActiveTrue(
                organization.getId(), userId)) {
            throw new IllegalArgumentException("User is already a member of this organization");
        }

        OrganizationMember membership = new OrganizationMember(
                organization, user, OrganizationRole.MEMBER, organization.getCreatorId()
        );
        return organizationMemberRepository.save(membership);
    }

    public void updateMemberRole(Long organizationId, UUID userId, OrganizationRole newRole, UUID updatedBy) {
        // Check if updater has permission
        OrganizationMember updater = organizationMemberRepository
                .findByOrganizationIdAndUserIdAndIsActiveTrue(organizationId, updatedBy)
                .orElseThrow(() -> new IllegalArgumentException("Updater is not a member of this organization"));

        if (updater.getRole() != OrganizationRole.OWNER && updater.getRole() != OrganizationRole.ADMIN) {
            throw new IllegalArgumentException("Insufficient permissions to update member role");
        }

        OrganizationMember member = organizationMemberRepository
                .findByOrganizationIdAndUserIdAndIsActiveTrue(organizationId, userId)
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));

        member.setRole(newRole);
        organizationMemberRepository.save(member);
    }

    public void removeMember(Long organizationId, UUID userId, UUID removedBy) {
        // Check if remover has permission
        OrganizationMember remover = organizationMemberRepository
                .findByOrganizationIdAndUserIdAndIsActiveTrue(organizationId, removedBy)
                .orElseThrow(() -> new IllegalArgumentException("Remover is not a member of this organization"));

        if (remover.getRole() != OrganizationRole.OWNER && remover.getRole() != OrganizationRole.ADMIN) {
            throw new IllegalArgumentException("Insufficient permissions to remove member");
        }

        OrganizationMember member = organizationMemberRepository
                .findByOrganizationIdAndUserIdAndIsActiveTrue(organizationId, userId)
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));

        // Cannot remove the owner
        if (member.getRole() == OrganizationRole.OWNER) {
            throw new IllegalArgumentException("Cannot remove organization owner");
        }

        member.setIsActive(false);
        organizationMemberRepository.save(member);
    }

    private String generateUniqueInviteCode() {
        String inviteCode;
        do {
            inviteCode = "ORG-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        } while (organizationRepository.existsByInviteCode(inviteCode));
        return inviteCode;
    }

    public boolean hasPermission(Long organizationId, UUID userId, OrganizationRole requiredRole) {
        Optional<OrganizationMember> member = organizationMemberRepository
                .findByOrganizationIdAndUserIdAndIsActiveTrue(organizationId, userId);

        if (member.isEmpty()) {
            return false;
        }

        OrganizationRole userRole = member.get().getRole();

        // Owner has all permissions
        if (userRole == OrganizationRole.OWNER) {
            return true;
        }

        // Admin has admin and member permissions
        if (userRole == OrganizationRole.ADMIN
                && (requiredRole == OrganizationRole.ADMIN || requiredRole == OrganizationRole.MEMBER)) {
            return true;
        }

        // Member has only member permissions
        return userRole == OrganizationRole.MEMBER && requiredRole == OrganizationRole.MEMBER;
    }
}
