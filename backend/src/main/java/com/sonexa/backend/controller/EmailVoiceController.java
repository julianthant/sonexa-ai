package com.sonexa.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sonexa.backend.dto.EmailUploadRequest;
import com.sonexa.backend.service.EmailVoiceService;

import java.util.Map;

@RestController
@RequestMapping("/api/voice")
public class EmailVoiceController {

    @Autowired
    private EmailVoiceService emailVoiceService;

    @PostMapping("/email-upload")
    public ResponseEntity<Map<String, Object>> handleEmailUpload(@RequestBody EmailUploadRequest request) {
        try {
            // Extract user from custom email
            String customEmail = request.getTo(); // "john@voice.sonexa.ai"
            String userIdentifier = extractUserIdentifier(customEmail);

            // Process voice attachments
            Map<String, Object> result = emailVoiceService.processEmailVoiceMessage(request, userIdentifier);

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    private String extractUserIdentifier(String customEmail) {
        // "sonexa.voice.ai+john@gmail.com" -> "john"
        if (customEmail.contains("+") && customEmail.contains("@")) {
            String plusPart = customEmail.split("\\+")[1];
            return plusPart.split("@")[0];
        }
        return "unknown";
    }
}
