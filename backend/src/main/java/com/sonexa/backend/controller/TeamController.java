package com.sonexa.backend.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sonexa.backend.dto.CreateTeamRequest;
import com.sonexa.backend.dto.InviteTeamMemberRequest;
import com.sonexa.backend.dto.TeamResponse;
import com.sonexa.backend.dto.UpdateTeamRequest;
import com.sonexa.backend.model.Team;
import com.sonexa.backend.model.TeamMember;
import com.sonexa.backend.model.User;
import com.sonexa.backend.service.TeamService;
import com.sonexa.backend.service.UserService;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<Page<TeamResponse>> getUserTeams(
            @AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<TeamResponse> teams = teamService.getUserTeams(user, pageable);
        return ResponseEntity.ok(teams);
    }

    @GetMapping("/{teamId}")
    public ResponseEntity<TeamResponse> getTeam(
            @AuthenticationPrincipal User user,
            @PathVariable UUID teamId) {

        Team team = teamService.getTeam(teamId, user);
        TeamResponse response = teamService.convertToResponse(team);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<TeamResponse> createTeam(
            @AuthenticationPrincipal User user,
            @RequestBody CreateTeamRequest request) {

        Team team = teamService.createTeam(request, user);
        TeamResponse response = teamService.convertToResponse(team);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{teamId}")
    public ResponseEntity<TeamResponse> updateTeam(
            @AuthenticationPrincipal User user,
            @PathVariable UUID teamId,
            @RequestBody UpdateTeamRequest request) {

        Team team = teamService.updateTeam(teamId, request, user);
        TeamResponse response = teamService.convertToResponse(team);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{teamId}")
    public ResponseEntity<Void> deleteTeam(
            @AuthenticationPrincipal User user,
            @PathVariable UUID teamId) {

        teamService.deleteTeam(teamId, user);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{teamId}/members")
    public ResponseEntity<Void> inviteTeamMember(
            @AuthenticationPrincipal User user,
            @PathVariable UUID teamId,
            @RequestBody InviteTeamMemberRequest request) {

        teamService.inviteTeamMember(teamId, request, user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{teamId}/members")
    public ResponseEntity<List<TeamMember>> getTeamMembers(
            @AuthenticationPrincipal User user,
            @PathVariable UUID teamId) {

        List<TeamMember> members = teamService.getTeamMembers(teamId, user);
        return ResponseEntity.ok(members);
    }

    @PutMapping("/{teamId}/members/{memberId}/role")
    public ResponseEntity<Void> updateMemberRole(
            @AuthenticationPrincipal User user,
            @PathVariable UUID teamId,
            @PathVariable UUID memberId,
            @RequestParam TeamMember.TeamRole role) {

        teamService.updateMemberRole(teamId, memberId, role, user);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{teamId}/members/{memberId}")
    public ResponseEntity<Void> removeTeamMember(
            @AuthenticationPrincipal User user,
            @PathVariable UUID teamId,
            @PathVariable UUID memberId) {

        teamService.removeTeamMember(teamId, memberId, user);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-code/{teamCode}")
    public ResponseEntity<TeamResponse> getTeamByCode(
            @AuthenticationPrincipal User user,
            @PathVariable String teamCode) {

        Team team = teamService.getTeamByCode(teamCode, user);
        TeamResponse response = teamService.convertToResponse(team);
        return ResponseEntity.ok(response);
    }
}
