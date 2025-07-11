package com.sonexa.backend.controller;

import com.sonexa.backend.service.AIProcessingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/ai")
@PreAuthorize("hasRole('USER')")
public class AIController {
    
    private static final Logger logger = LoggerFactory.getLogger(AIController.class);
    
    @Autowired
    private AIProcessingService aiProcessingService;
    
    /**
     * Process text through AI pipeline
     */
    @PostMapping("/process-text")
    public ResponseEntity<Map<String, Object>> processText(@RequestBody Map<String, Object> request) {
        try {
            String text = (String) request.get("text");
            boolean generateSpeech = Boolean.parseBoolean(request.getOrDefault("generate_speech", false).toString());
            String voiceName = (String) request.get("voice_name");
            
            if (text == null || text.trim().isEmpty()) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Text input is required");
                return ResponseEntity.badRequest().body(error);
            }
            
            logger.info("Processing text request with speech generation: {}", generateSpeech);
            Map<String, Object> result = aiProcessingService.processText(text, generateSpeech, voiceName);
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            logger.error("Error processing text", e);
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Text processing failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    /**
     * Process audio through AI pipeline
     */
    @PostMapping("/process-audio")
    public ResponseEntity<Map<String, Object>> processAudio(
            @RequestParam("audio") MultipartFile audioFile,
            @RequestParam(value = "generate_response", defaultValue = "true") boolean generateResponse,
            @RequestParam(value = "voice_name", required = false) String voiceName) {
        
        try {
            if (audioFile.isEmpty()) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Audio file is required");
                return ResponseEntity.badRequest().body(error);
            }
            
            logger.info("Processing audio file: {} (size: {} bytes)", 
                       audioFile.getOriginalFilename(), audioFile.getSize());
            
            byte[] audioData = audioFile.getBytes();
            Map<String, Object> result = aiProcessingService.processAudio(audioData, generateResponse, voiceName);
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            logger.error("Error processing audio", e);
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Audio processing failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    /**
     * Async text processing endpoint
     */
    @PostMapping("/process-text-async")
    public ResponseEntity<CompletableFuture<Map<String, Object>>> processTextAsync(@RequestBody Map<String, Object> request) {
        try {
            String text = (String) request.get("text");
            boolean generateSpeech = Boolean.parseBoolean(request.getOrDefault("generate_speech", false).toString());
            String voiceName = (String) request.get("voice_name");
            
            if (text == null || text.trim().isEmpty()) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Text input is required");
                return ResponseEntity.badRequest().body(CompletableFuture.completedFuture(error));
            }
            
            logger.info("Starting async text processing");
            CompletableFuture<Map<String, Object>> future = aiProcessingService.processTextAsync(text, generateSpeech, voiceName);
            
            return ResponseEntity.ok(future);
            
        } catch (Exception e) {
            logger.error("Error starting async text processing", e);
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Async text processing failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CompletableFuture.completedFuture(error));
        }
    }
    
    /**
     * Chat interface endpoint
     */
    @PostMapping("/chat")
    public ResponseEntity<Map<String, Object>> chat(@RequestBody Map<String, Object> request) {
        try {
            String message = (String) request.get("message");
            boolean includeAudio = Boolean.parseBoolean(request.getOrDefault("include_audio", false).toString());
            String preferredVoice = (String) request.get("preferred_voice");
            
            if (message == null || message.trim().isEmpty()) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Message is required");
                return ResponseEntity.badRequest().body(error);
            }
            
            logger.info("Processing chat message with audio: {}", includeAudio);
            Map<String, Object> result = aiProcessingService.chat(message, includeAudio, preferredVoice);
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            logger.error("Error processing chat", e);
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Chat processing failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    /**
     * Get AI processing capabilities
     */
    @GetMapping("/capabilities")
    public ResponseEntity<Map<String, Object>> getCapabilities() {
        try {
            logger.info("Retrieving AI processing capabilities");
            Map<String, Object> capabilities = aiProcessingService.getProcessingCapabilities();
            
            return ResponseEntity.ok(capabilities);
            
        } catch (Exception e) {
            logger.error("Error retrieving capabilities", e);
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Failed to retrieve capabilities: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    /**
     * Download audio response as file
     */
    @PostMapping("/text-to-speech")
    public ResponseEntity<byte[]> textToSpeech(@RequestBody Map<String, Object> request) {
        try {
            String text = (String) request.get("text");
            String voiceName = (String) request.get("voice_name");
            
            if (text == null || text.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(null);
            }
            
            logger.info("Generating speech for text length: {}", text.length());
            Map<String, Object> result = aiProcessingService.processText(text, true, voiceName);
            
            if (result.get("speech_audio") != null) {
                byte[] audioData = (byte[]) result.get("speech_audio");
                
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.valueOf("audio/mpeg"));
                headers.setContentDispositionFormData("attachment", "speech.mp3");
                headers.setContentLength(audioData.length);
                
                return ResponseEntity.ok()
                        .headers(headers)
                        .body(audioData);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
            
        } catch (Exception e) {
            logger.error("Error generating speech", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    /**
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "healthy");
        health.put("timestamp", System.currentTimeMillis());
        health.put("service", "AI Processing Controller");
        
        return ResponseEntity.ok(health);
    }
}
