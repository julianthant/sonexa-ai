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

import com.sonexa.backend.dto.ShareVoiceMessageRequest;
import com.sonexa.backend.dto.VoiceMessageCommentRequest;
import com.sonexa.backend.model.SharedVoiceMessage;
import com.sonexa.backend.model.User;
import com.sonexa.backend.model.VoiceMessageComment;
import com.sonexa.backend.service.SharedVoiceMessageService;

@RestController
@RequestMapping("/api/shared-voice-messages")
public class SharedVoiceMessageController {

    @Autowired
    private SharedVoiceMessageService sharedVoiceMessageService;

    @GetMapping
    public ResponseEntity<Page<SharedVoiceMessage>> getSharedVoiceMessages(
            @AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<SharedVoiceMessage> sharedMessages = sharedVoiceMessageService.getSharedWithUser(user, pageable);
        return ResponseEntity.ok(sharedMessages);
    }

    @PostMapping
    public ResponseEntity<SharedVoiceMessage> shareVoiceMessage(
            @AuthenticationPrincipal User user,
            @RequestBody ShareVoiceMessageRequest request) {

        SharedVoiceMessage sharedMessage = sharedVoiceMessageService.shareVoiceMessage(request, user);
        return ResponseEntity.ok(sharedMessage);
    }

    @GetMapping("/{sharedMessageId}")
    public ResponseEntity<SharedVoiceMessage> getSharedVoiceMessage(
            @AuthenticationPrincipal User user,
            @PathVariable UUID sharedMessageId) {

        SharedVoiceMessage sharedMessage = sharedVoiceMessageService.getSharedVoiceMessage(sharedMessageId, user);
        return ResponseEntity.ok(sharedMessage);
    }

    @PutMapping("/{sharedMessageId}/status")
    public ResponseEntity<Void> updateShareStatus(
            @AuthenticationPrincipal User user,
            @PathVariable UUID sharedMessageId,
            @RequestParam SharedVoiceMessage.ShareStatus status) {

        sharedVoiceMessageService.updateShareStatus(sharedMessageId, status, user);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{sharedMessageId}")
    public ResponseEntity<Void> revokeShare(
            @AuthenticationPrincipal User user,
            @PathVariable UUID sharedMessageId) {

        sharedVoiceMessageService.revokeShare(sharedMessageId, user);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{sharedMessageId}/comments")
    public ResponseEntity<List<VoiceMessageComment>> getComments(
            @AuthenticationPrincipal User user,
            @PathVariable UUID sharedMessageId) {

        List<VoiceMessageComment> comments = sharedVoiceMessageService.getComments(sharedMessageId, user);
        return ResponseEntity.ok(comments);
    }

    @PostMapping("/{sharedMessageId}/comments")
    public ResponseEntity<VoiceMessageComment> addComment(
            @AuthenticationPrincipal User user,
            @PathVariable UUID sharedMessageId,
            @RequestBody VoiceMessageCommentRequest request) {

        VoiceMessageComment comment = sharedVoiceMessageService.addComment(sharedMessageId, request, user);
        return ResponseEntity.ok(comment);
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @AuthenticationPrincipal User user,
            @PathVariable UUID commentId) {

        sharedVoiceMessageService.deleteComment(commentId, user);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-team/{teamId}")
    public ResponseEntity<List<SharedVoiceMessage>> getTeamSharedMessages(
            @AuthenticationPrincipal User user,
            @PathVariable UUID teamId) {

        List<SharedVoiceMessage> sharedMessages = sharedVoiceMessageService.getTeamSharedMessages(teamId, user);
        return ResponseEntity.ok(sharedMessages);
    }
}
