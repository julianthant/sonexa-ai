package com.sonexa.backend.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sonexa.backend.dto.CreateTeamRequest;
import com.sonexa.backend.dto.InviteTeamMemberRequest;
import com.sonexa.backend.dto.TeamResponse;
import com.sonexa.backend.dto.UpdateTeamRequest;
import com.sonexa.backend.model.RecentActivity;
import com.sonexa.backend.model.Team;
import com.sonexa.backend.model.TeamMember;
import com.sonexa.backend.model.User;
import com.sonexa.backend.repository.RecentActivityRepository;
import com.sonexa.backend.repository.TeamMemberRepository;
import com.sonexa.backend.repository.TeamRepository;

@Service
@Transactional
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private TeamMemberRepository teamMemberRepository;

    @Autowired
    private RecentActivityRepository recentActivityRepository;

    @Autowired
    private UserService userService;

    public Page<TeamResponse> getUserTeams(User user, Pageable pageable) {
        Page<Team> teams = teamRepository.findUserTeams(user, pageable);
        List<TeamResponse> teamResponses = teams.getContent().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());

        return new PageImpl<>(teamResponses, pageable, teams.getTotalElements());
    }

    public Team getTeam(UUID teamId, User user) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        // Check if user is owner or member
        if (!team.getOwner().equals(user) && !teamMemberRepository.existsByTeamAndUser(team, user)) {
            throw new RuntimeException("Access denied");
        }

        return team;
    }

    public Team getTeamByCode(String teamCode, User user) {
        Team team = teamRepository.findByTeamCode(teamCode)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        // Check if user is owner or member
        if (!team.getOwner().equals(user) && !teamMemberRepository.existsByTeamAndUser(team, user)) {
            throw new RuntimeException("Access denied");
        }

        return team;
    }

    public Team createTeam(CreateTeamRequest request, User user) {
        Team team = new Team(request.getName(), request.getDescription(), user);
        team = teamRepository.save(team);

        // Add owner as a team member
        TeamMember ownerMember = new TeamMember(team, user, TeamMember.TeamRole.OWNER);
        teamMemberRepository.save(ownerMember);

        // Create activity
        createActivity(user, RecentActivity.ActivityType.TEAM_ACTIVITY,
                RecentActivity.ActivityStatus.SUCCESS,
                "Team created",
                "Created team: " + team.getName(),
                null, team.getId(), "Users");

        return team;
    }

    public Team updateTeam(UUID teamId, UpdateTeamRequest request, User user) {
        Team team = getTeam(teamId, user);

        // Only owner can update team
        if (!team.getOwner().equals(user)) {
            throw new RuntimeException("Only team owner can update team");
        }

        if (request.getName() != null) {
            team.setName(request.getName());
        }
        if (request.getDescription() != null) {
            team.setDescription(request.getDescription());
        }

        team = teamRepository.save(team);

        // Create activity
        createActivity(user, RecentActivity.ActivityType.TEAM_ACTIVITY,
                RecentActivity.ActivityStatus.INFO,
                "Team updated",
                "Updated team: " + team.getName(),
                null, team.getId(), "Settings");

        return team;
    }

    public void deleteTeam(UUID teamId, User user) {
        Team team = getTeam(teamId, user);

        // Only owner can delete team
        if (!team.getOwner().equals(user)) {
            throw new RuntimeException("Only team owner can delete team");
        }

        teamRepository.delete(team);

        // Create activity
        createActivity(user, RecentActivity.ActivityType.TEAM_ACTIVITY,
                RecentActivity.ActivityStatus.WARNING,
                "Team deleted",
                "Deleted team: " + team.getName(),
                null, null, "Trash");
    }

    public void inviteTeamMember(UUID teamId, InviteTeamMemberRequest request, User inviter) {
        Team team = getTeam(teamId, inviter);

        // Check if inviter has permission to invite
        TeamMember inviterMember = teamMemberRepository.findByTeamAndUser(team, inviter)
                .orElseThrow(() -> new RuntimeException("You are not a member of this team"));

        if (inviterMember.getRole() == TeamMember.TeamRole.VIEWER) {
            throw new RuntimeException("Viewers cannot invite members");
        }

        // Find user by email
        User userToInvite = userService.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if user is already a member
        if (teamMemberRepository.existsByTeamAndUser(team, userToInvite)) {
            throw new RuntimeException("User is already a team member");
        }

        // Add team member
        TeamMember newMember = new TeamMember(team, userToInvite, request.getRole());
        teamMemberRepository.save(newMember);

        // Create activity for inviter
        createActivity(inviter, RecentActivity.ActivityType.TEAM_ACTIVITY,
                RecentActivity.ActivityStatus.SUCCESS,
                "Member invited",
                "Invited " + userToInvite.getEmail() + " to team " + team.getName(),
                null, team.getId(), "UserPlus");

        // Create activity for invited user
        createActivity(userToInvite, RecentActivity.ActivityType.TEAM_ACTIVITY,
                RecentActivity.ActivityStatus.INFO,
                "Team invitation",
                "Added to team: " + team.getName(),
                null, team.getId(), "Users");
    }

    public List<TeamMember> getTeamMembers(UUID teamId, User user) {
        Team team = getTeam(teamId, user);
        return teamMemberRepository.findByTeam(team);
    }

    public void updateMemberRole(UUID teamId, UUID memberId, TeamMember.TeamRole role, User user) {
        Team team = getTeam(teamId, user);

        // Only owner or admin can update roles
        TeamMember userMember = teamMemberRepository.findByTeamAndUser(team, user)
                .orElseThrow(() -> new RuntimeException("You are not a member of this team"));

        if (userMember.getRole() != TeamMember.TeamRole.OWNER
                && userMember.getRole() != TeamMember.TeamRole.ADMIN) {
            throw new RuntimeException("Insufficient permissions");
        }

        TeamMember memberToUpdate = teamMemberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Team member not found"));

        if (!memberToUpdate.getTeam().equals(team)) {
            throw new RuntimeException("Member does not belong to this team");
        }

        // Cannot change owner role
        if (memberToUpdate.getRole() == TeamMember.TeamRole.OWNER) {
            throw new RuntimeException("Cannot change owner role");
        }

        memberToUpdate.setRole(role);
        teamMemberRepository.save(memberToUpdate);

        // Create activity
        createActivity(user, RecentActivity.ActivityType.TEAM_ACTIVITY,
                RecentActivity.ActivityStatus.INFO,
                "Member role updated",
                "Updated role for " + memberToUpdate.getUser().getEmail() + " in team " + team.getName(),
                null, team.getId(), "Shield");
    }

    public void removeTeamMember(UUID teamId, UUID memberId, User user) {
        Team team = getTeam(teamId, user);

        TeamMember memberToRemove = teamMemberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Team member not found"));

        if (!memberToRemove.getTeam().equals(team)) {
            throw new RuntimeException("Member does not belong to this team");
        }

        // Cannot remove owner
        if (memberToRemove.getRole() == TeamMember.TeamRole.OWNER) {
            throw new RuntimeException("Cannot remove team owner");
        }

        // Check permissions
        TeamMember userMember = teamMemberRepository.findByTeamAndUser(team, user)
                .orElseThrow(() -> new RuntimeException("You are not a member of this team"));

        // Users can remove themselves, or owners/admins can remove others
        if (!memberToRemove.getUser().equals(user)
                && userMember.getRole() != TeamMember.TeamRole.OWNER
                && userMember.getRole() != TeamMember.TeamRole.ADMIN) {
            throw new RuntimeException("Insufficient permissions");
        }

        teamMemberRepository.delete(memberToRemove);

        // Create activity
        createActivity(user, RecentActivity.ActivityType.TEAM_ACTIVITY,
                RecentActivity.ActivityStatus.WARNING,
                "Member removed",
                "Removed " + memberToRemove.getUser().getEmail() + " from team " + team.getName(),
                null, team.getId(), "UserMinus");
    }

    public TeamResponse convertToResponse(Team team) {
        TeamResponse response = new TeamResponse();
        response.setId(team.getId());
        response.setTeamCode(team.getTeamCode());
        response.setName(team.getName());
        response.setDescription(team.getDescription());
        response.setCreatedAt(team.getCreatedAt());
        response.setUpdatedAt(team.getUpdatedAt());

        // Convert owner
        User owner = team.getOwner();
        TeamResponse.TeamOwnerInfo ownerInfo = new TeamResponse.TeamOwnerInfo(
                owner.getId(), owner.getEmail(), owner.getFirstName(), owner.getLastName());
        response.setOwner(ownerInfo);

        // Convert members
        List<TeamMember> members = teamMemberRepository.findByTeam(team);
        List<TeamResponse.TeamMemberInfo> memberInfos = members.stream()
                .map(member -> new TeamResponse.TeamMemberInfo(
                member.getId(),
                member.getUser().getId(),
                member.getUser().getEmail(),
                member.getUser().getFirstName(),
                member.getUser().getLastName(),
                member.getRole(),
                member.getJoinedAt()))
                .collect(Collectors.toList());

        response.setMembers(memberInfos);
        response.setMemberCount(members.size());

        return response;
    }

    private void createActivity(User user, RecentActivity.ActivityType type,
            RecentActivity.ActivityStatus status, String title,
            String description, String voiceMessageId, UUID teamId, String icon) {
        RecentActivity activity = new RecentActivity(user, type, status, title, description,
                voiceMessageId, teamId, icon);
        recentActivityRepository.save(activity);
    }
}
