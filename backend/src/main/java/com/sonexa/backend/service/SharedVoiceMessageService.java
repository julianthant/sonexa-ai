package com.sonexa.backend.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sonexa.backend.dto.ShareVoiceMessageRequest;
import com.sonexa.backend.dto.VoiceMessageCommentRequest;
import com.sonexa.backend.model.RecentActivity;
import com.sonexa.backend.model.SharedVoiceMessage;
import com.sonexa.backend.model.Team;
import com.sonexa.backend.model.TeamMember;
import com.sonexa.backend.model.User;
import com.sonexa.backend.model.VoiceMessage;
import com.sonexa.backend.model.VoiceMessageComment;
import com.sonexa.backend.repository.RecentActivityRepository;
import com.sonexa.backend.repository.SharedVoiceMessageRepository;
import com.sonexa.backend.repository.TeamMemberRepository;
import com.sonexa.backend.repository.TeamRepository;
import com.sonexa.backend.repository.VoiceMessageCommentRepository;
import com.sonexa.backend.repository.VoiceMessageRepository;

@Service
@Transactional
public class SharedVoiceMessageService {

    @Autowired
    private SharedVoiceMessageRepository sharedVoiceMessageRepository;

    @Autowired
    private VoiceMessageRepository voiceMessageRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private TeamMemberRepository teamMemberRepository;

    @Autowired
    private VoiceMessageCommentRepository commentRepository;

    @Autowired
    private RecentActivityRepository recentActivityRepository;

    public Page<SharedVoiceMessage> getSharedWithUser(User user, Pageable pageable) {
        return sharedVoiceMessageRepository.findSharedWithUser(user, pageable);
    }

    public SharedVoiceMessage shareVoiceMessage(ShareVoiceMessageRequest request, User user) {
        // Find voice message
        VoiceMessage voiceMessage = voiceMessageRepository.findByVoiceMessageId(request.getVoiceMessageId())
                .orElseThrow(() -> new RuntimeException("Voice message not found"));

        // Check if user owns the voice message
        if (!voiceMessage.getUser().equals(user)) {
            throw new RuntimeException("You can only share your own voice messages");
        }

        // Find team
        Team team = teamRepository.findById(request.getTeamId())
                .orElseThrow(() -> new RuntimeException("Team not found"));

        // Check if user is a member of the team
        if (!teamMemberRepository.existsByTeamAndUser(team, user)) {
            throw new RuntimeException("You are not a member of this team");
        }

        // Check if already shared
        if (sharedVoiceMessageRepository.existsByVoiceMessageAndTeam(voiceMessage, team)) {
            throw new RuntimeException("Voice message is already shared with this team");
        }

        // Create shared voice message
        SharedVoiceMessage sharedMessage = new SharedVoiceMessage(voiceMessage, team, user, request.getNotes());
        sharedMessage = sharedVoiceMessageRepository.save(sharedMessage);

        // Create activity for sharer
        createActivity(user, RecentActivity.ActivityType.TEAM_ACTIVITY,
                RecentActivity.ActivityStatus.SUCCESS,
                "Voice message shared",
                "Shared voice message with team " + team.getName(),
                voiceMessage.getVoiceMessageId(), team.getId(), "Share");

        // Create activities for team members
        List<TeamMember> members = teamMemberRepository.findByTeam(team);
        for (TeamMember member : members) {
            if (!member.getUser().equals(user)) { // Don't notify the sharer
                createActivity(member.getUser(), RecentActivity.ActivityType.TEAM_ACTIVITY,
                        RecentActivity.ActivityStatus.INFO,
                        "New shared voice message",
                        user.getEmail() + " shared a voice message in " + team.getName(),
                        voiceMessage.getVoiceMessageId(), team.getId(), "MessageSquare");
            }
        }

        return sharedMessage;
    }

    public SharedVoiceMessage getSharedVoiceMessage(UUID sharedMessageId, User user) {
        SharedVoiceMessage sharedMessage = sharedVoiceMessageRepository.findById(sharedMessageId)
                .orElseThrow(() -> new RuntimeException("Shared voice message not found"));

        // Check if user has access
        if (!hasAccessToSharedMessage(sharedMessage, user)) {
            throw new RuntimeException("Access denied");
        }

        return sharedMessage;
    }

    public void updateShareStatus(UUID sharedMessageId, SharedVoiceMessage.ShareStatus status, User user) {
        SharedVoiceMessage sharedMessage = getSharedVoiceMessage(sharedMessageId, user);

        // Only the sharer or team owner can update status
        TeamMember userMember = teamMemberRepository.findByTeamAndUser(sharedMessage.getTeam(), user)
                .orElseThrow(() -> new RuntimeException("You are not a member of this team"));

        if (!sharedMessage.getSharedBy().equals(user)
                && userMember.getRole() != TeamMember.TeamRole.OWNER
                && userMember.getRole() != TeamMember.TeamRole.ADMIN) {
            throw new RuntimeException("Insufficient permissions");
        }

        sharedMessage.setStatus(status);
        sharedVoiceMessageRepository.save(sharedMessage);

        // Create activity
        createActivity(user, RecentActivity.ActivityType.TEAM_ACTIVITY,
                RecentActivity.ActivityStatus.INFO,
                "Share status updated",
                "Updated share status to " + status + " for voice message in " + sharedMessage.getTeam().getName(),
                sharedMessage.getVoiceMessage().getVoiceMessageId(),
                sharedMessage.getTeam().getId(), "Settings");
    }

    public void revokeShare(UUID sharedMessageId, User user) {
        SharedVoiceMessage sharedMessage = getSharedVoiceMessage(sharedMessageId, user);

        // Only the sharer or team owner can revoke
        TeamMember userMember = teamMemberRepository.findByTeamAndUser(sharedMessage.getTeam(), user)
                .orElseThrow(() -> new RuntimeException("You are not a member of this team"));

        if (!sharedMessage.getSharedBy().equals(user)
                && userMember.getRole() != TeamMember.TeamRole.OWNER) {
            throw new RuntimeException("Insufficient permissions");
        }

        sharedVoiceMessageRepository.delete(sharedMessage);

        // Create activity
        createActivity(user, RecentActivity.ActivityType.TEAM_ACTIVITY,
                RecentActivity.ActivityStatus.WARNING,
                "Share revoked",
                "Revoked voice message share from team " + sharedMessage.getTeam().getName(),
                sharedMessage.getVoiceMessage().getVoiceMessageId(),
                sharedMessage.getTeam().getId(), "XCircle");
    }

    public List<VoiceMessageComment> getComments(UUID sharedMessageId, User user) {
        SharedVoiceMessage sharedMessage = getSharedVoiceMessage(sharedMessageId, user);
        return commentRepository.findBySharedVoiceMessageOrderByCreatedAtAsc(sharedMessage);
    }

    public VoiceMessageComment addComment(UUID sharedMessageId, VoiceMessageCommentRequest request, User user) {
        SharedVoiceMessage sharedMessage = getSharedVoiceMessage(sharedMessageId, user);

        VoiceMessageComment comment = new VoiceMessageComment(sharedMessage, user, request.getContent(),
                request.getParentCommentId());
        comment = commentRepository.save(comment);

        // Create activity for commenter
        createActivity(user, RecentActivity.ActivityType.TEAM_ACTIVITY,
                RecentActivity.ActivityStatus.INFO,
                "Comment added",
                "Added comment to shared voice message in " + sharedMessage.getTeam().getName(),
                sharedMessage.getVoiceMessage().getVoiceMessageId(),
                sharedMessage.getTeam().getId(), "MessageCircle");

        // Notify other team members
        List<TeamMember> members = teamMemberRepository.findByTeam(sharedMessage.getTeam());
        for (TeamMember member : members) {
            if (!member.getUser().equals(user)) { // Don't notify the commenter
                createActivity(member.getUser(), RecentActivity.ActivityType.TEAM_ACTIVITY,
                        RecentActivity.ActivityStatus.INFO,
                        "New comment",
                        user.getEmail() + " commented on a shared voice message",
                        sharedMessage.getVoiceMessage().getVoiceMessageId(),
                        sharedMessage.getTeam().getId(), "MessageCircle");
            }
        }

        return comment;
    }

    public void deleteComment(UUID commentId, User user) {
        VoiceMessageComment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        // Only the comment author or team admins can delete
        TeamMember userMember = teamMemberRepository.findByTeamAndUser(comment.getSharedVoiceMessage().getTeam(), user)
                .orElseThrow(() -> new RuntimeException("You are not a member of this team"));

        if (!comment.getAuthor().equals(user)
                && userMember.getRole() != TeamMember.TeamRole.OWNER
                && userMember.getRole() != TeamMember.TeamRole.ADMIN) {
            throw new RuntimeException("Insufficient permissions");
        }

        commentRepository.delete(comment);

        // Create activity
        createActivity(user, RecentActivity.ActivityType.TEAM_ACTIVITY,
                RecentActivity.ActivityStatus.WARNING,
                "Comment deleted",
                "Deleted comment from shared voice message",
                comment.getSharedVoiceMessage().getVoiceMessage().getVoiceMessageId(),
                comment.getSharedVoiceMessage().getTeam().getId(), "Trash");
    }

    public List<SharedVoiceMessage> getTeamSharedMessages(UUID teamId, User user) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        // Check if user is a team member
        if (!teamMemberRepository.existsByTeamAndUser(team, user)) {
            throw new RuntimeException("You are not a member of this team");
        }

        return sharedVoiceMessageRepository.findByTeamAndStatus(team, SharedVoiceMessage.ShareStatus.ACTIVE);
    }

    private boolean hasAccessToSharedMessage(SharedVoiceMessage sharedMessage, User user) {
        // Owner of the voice message always has access
        if (sharedMessage.getVoiceMessage().getUser().equals(user)) {
            return true;
        }

        // Team members have access
        return teamMemberRepository.existsByTeamAndUser(sharedMessage.getTeam(), user);
    }

    private void createActivity(User user, RecentActivity.ActivityType type,
            RecentActivity.ActivityStatus status, String title,
            String description, String voiceMessageId, UUID teamId, String icon) {
        RecentActivity activity = new RecentActivity(user, type, status, title, description,
                voiceMessageId, teamId, icon);
        recentActivityRepository.save(activity);
    }
}
