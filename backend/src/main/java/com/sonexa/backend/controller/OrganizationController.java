package com.sonexa.backend.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sonexa.backend.model.Organization;
import com.sonexa.backend.model.OrganizationMember;
import com.sonexa.backend.model.OrganizationRole;
import com.sonexa.backend.service.OrganizationService;

@RestController
@RequestMapping("/api/organizations")
@CrossOrigin(origins = "*")
public class OrganizationController {

    @Autowired
    private OrganizationService organizationService;

    @PostMapping
    public ResponseEntity<Organization> createOrganization(@RequestBody CreateOrganizationRequest request) {
        try {
            Organization organization = organizationService.createOrganization(
                    request.getName(),
                    request.getDescription(),
                    request.getCreatorId()
            );
            return ResponseEntity.ok(organization);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Organization>> getUserOrganizations(@PathVariable UUID userId) {
        List<Organization> organizations = organizationService.findUserOrganizations(userId);
        return ResponseEntity.ok(organizations);
    }

    @GetMapping("/{organizationId}/members")
    public ResponseEntity<List<OrganizationMember>> getOrganizationMembers(@PathVariable Long organizationId) {
        List<OrganizationMember> members = organizationService.getOrganizationMembers(organizationId);
        return ResponseEntity.ok(members);
    }

    @PostMapping("/join")
    public ResponseEntity<OrganizationMember> joinOrganization(@RequestBody JoinOrganizationRequest request) {
        try {
            OrganizationMember member = organizationService.joinOrganization(
                    request.getInviteCode(),
                    request.getUserId()
            );
            return ResponseEntity.ok(member);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{organizationId}/members/{userId}/role")
    public ResponseEntity<Void> updateMemberRole(
            @PathVariable Long organizationId,
            @PathVariable UUID userId,
            @RequestBody UpdateRoleRequest request) {
        try {
            organizationService.updateMemberRole(
                    organizationId,
                    userId,
                    request.getRole(),
                    request.getUpdatedBy()
            );
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{organizationId}/members/{userId}")
    public ResponseEntity<Void> removeMember(
            @PathVariable Long organizationId,
            @PathVariable UUID userId,
            @RequestParam UUID removedBy) {
        try {
            organizationService.removeMember(organizationId, userId, removedBy);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/invite/{inviteCode}")
    public ResponseEntity<Organization> getOrganizationByInviteCode(@PathVariable String inviteCode) {
        return organizationService.findByInviteCode(inviteCode)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Request DTOs
    public static class CreateOrganizationRequest {

        private String name;
        private String description;
        private UUID creatorId;

        // Getters and setters
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public UUID getCreatorId() {
            return creatorId;
        }

        public void setCreatorId(UUID creatorId) {
            this.creatorId = creatorId;
        }
    }

    public static class JoinOrganizationRequest {

        private String inviteCode;
        private UUID userId;

        // Getters and setters
        public String getInviteCode() {
            return inviteCode;
        }

        public void setInviteCode(String inviteCode) {
            this.inviteCode = inviteCode;
        }

        public UUID getUserId() {
            return userId;
        }

        public void setUserId(UUID userId) {
            this.userId = userId;
        }
    }

    public static class UpdateRoleRequest {

        private OrganizationRole role;
        private UUID updatedBy;

        // Getters and setters
        public OrganizationRole getRole() {
            return role;
        }

        public void setRole(OrganizationRole role) {
            this.role = role;
        }

        public UUID getUpdatedBy() {
            return updatedBy;
        }

        public void setUpdatedBy(UUID updatedBy) {
            this.updatedBy = updatedBy;
        }
    }
}
