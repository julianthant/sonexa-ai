package com.sonexa.backend.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.sonexa.backend.model.TeamMember.TeamRole;

public class TeamResponse {

    private UUID id;
    private String teamCode;
    private String name;
    private String description;
    private TeamOwnerInfo owner;
    private List<TeamMemberInfo> members;
    private int memberCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Nested classes for related data
    public static class TeamOwnerInfo {

        private UUID id;
        private String email;
        private String firstName;
        private String lastName;

        // Constructors
        public TeamOwnerInfo() {
        }

        public TeamOwnerInfo(UUID id, String email, String firstName, String lastName) {
            this.id = id;
            this.email = email;
            this.firstName = firstName;
            this.lastName = lastName;
        }

        // Getters and Setters
        public UUID getId() {
            return id;
        }

        public void setId(UUID id) {
            this.id = id;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getFirstName() {
            return firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }
    }

    public static class TeamMemberInfo {

        private UUID id;
        private UUID userId;
        private String email;
        private String firstName;
        private String lastName;
        private TeamRole role;
        private LocalDateTime joinedAt;

        // Constructors
        public TeamMemberInfo() {
        }

        public TeamMemberInfo(UUID id, UUID userId, String email, String firstName, String lastName,
                TeamRole role, LocalDateTime joinedAt) {
            this.id = id;
            this.userId = userId;
            this.email = email;
            this.firstName = firstName;
            this.lastName = lastName;
            this.role = role;
            this.joinedAt = joinedAt;
        }

        // Getters and Setters
        public UUID getId() {
            return id;
        }

        public void setId(UUID id) {
            this.id = id;
        }

        public UUID getUserId() {
            return userId;
        }

        public void setUserId(UUID userId) {
            this.userId = userId;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getFirstName() {
            return firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }

        public TeamRole getRole() {
            return role;
        }

        public void setRole(TeamRole role) {
            this.role = role;
        }

        public LocalDateTime getJoinedAt() {
            return joinedAt;
        }

        public void setJoinedAt(LocalDateTime joinedAt) {
            this.joinedAt = joinedAt;
        }
    }

    // Constructors
    public TeamResponse() {
    }

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTeamCode() {
        return teamCode;
    }

    public void setTeamCode(String teamCode) {
        this.teamCode = teamCode;
    }

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

    public TeamOwnerInfo getOwner() {
        return owner;
    }

    public void setOwner(TeamOwnerInfo owner) {
        this.owner = owner;
    }

    public List<TeamMemberInfo> getMembers() {
        return members;
    }

    public void setMembers(List<TeamMemberInfo> members) {
        this.members = members;
    }

    public int getMemberCount() {
        return memberCount;
    }

    public void setMemberCount(int memberCount) {
        this.memberCount = memberCount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
