package com.sonexa.backend.controller;

import com.sonexa.backend.service.AIProcessingService;
import com.sonexa.backend.service.AzureSpeechService;
import com.sonexa.backend.service.OpenAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ai/test")
@PreAuthorize("hasRole('USER')")
public class AITestController {
    
    private static final Logger logger = LoggerFactory.getLogger(AITestController.class);
    
    @Autowired
    private AIProcessingService aiProcessingService;
    
    @Autowired
    private OpenAIService openAIService;
    
    @Autowired
    private AzureSpeechService azureSpeechService;
    
    /**
     * Test OpenAI service configuration and connectivity
     */
    @GetMapping("/openai-config")
    public ResponseEntity<Map<String, Object>> testOpenAIConfig() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            logger.info("Testing OpenAI service configuration");
            
            // Test basic completion
            String testPrompt = "Hello, this is a test. Please respond with 'OpenAI is working correctly.'";
            String response = openAIService.generateCompletion(testPrompt, "gpt-3.5-turbo", 50);
            
            result.put("status", "success");
            result.put("test_prompt", testPrompt);
            result.put("response", response);
            result.put("service_healthy", openAIService.isServiceHealthy());
            result.put("timestamp", System.currentTimeMillis());
            
            logger.info("OpenAI test completed successfully");
            
        } catch (Exception e) {
            logger.error("OpenAI test failed", e);
            result.put("status", "error");
            result.put("error", e.getMessage());
            result.put("service_healthy", false);
        }
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * Test Azure Speech service configuration and connectivity
     */
    @GetMapping("/azure-speech-config")
    public ResponseEntity<Map<String, Object>> testAzureSpeechConfig() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            logger.info("Testing Azure Speech service configuration");
            
            // Test available voices
            Map<String, Object> voices = azureSpeechService.getAvailableVoices();
            
            // Test text-to-speech
            String testText = "Hello, this is a test of Azure Speech Services.";
            byte[] audioData = azureSpeechService.textToSpeech(testText, "en-US-JennyNeural", "en-US");
            
            result.put("status", "success");
            result.put("test_text", testText);
            result.put("audio_generated", audioData != null && audioData.length > 0);
            result.put("audio_size_bytes", audioData != null ? audioData.length : 0);
            result.put("available_voices_count", voices.get("count"));
            result.put("service_healthy", azureSpeechService.isServiceHealthy());
            result.put("timestamp", System.currentTimeMillis());
            
            logger.info("Azure Speech test completed successfully");
            
        } catch (Exception e) {
            logger.error("Azure Speech test failed", e);
            result.put("status", "error");
            result.put("error", e.getMessage());
            result.put("service_healthy", false);
        }
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * Test full AI processing pipeline
     */
    @PostMapping("/full-pipeline")
    public ResponseEntity<Map<String, Object>> testFullPipeline(@RequestBody Map<String, String> request) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            String testText = request.getOrDefault("text", "This is a test of the complete AI processing pipeline.");
            
            logger.info("Testing full AI processing pipeline with text: {}", testText);
            
            // Test text processing with speech generation
            Map<String, Object> textResult = aiProcessingService.processText(testText, true, "en-US-JennyNeural");
            
            result.put("status", "success");
            result.put("input_text", testText);
            result.put("analysis_completed", textResult.get("analysis") != null);
            result.put("enhanced_response_generated", textResult.get("enhanced_response") != null);
            result.put("speech_generated", textResult.get("speech_audio") != null);
            result.put("processing_status", textResult.get("processing_status"));
            
            if (textResult.get("speech_audio") != null) {
                byte[] audioData = (byte[]) textResult.get("speech_audio");
                result.put("audio_size_bytes", audioData.length);
            }
            
            // Test capabilities
            Map<String, Object> capabilities = aiProcessingService.getProcessingCapabilities();
            result.put("capabilities", capabilities);
            
            logger.info("Full pipeline test completed successfully");
            
        } catch (Exception e) {
            logger.error("Full pipeline test failed", e);
            result.put("status", "error");
            result.put("error", e.getMessage());
        }
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * Test chat functionality
     */
    @PostMapping("/chat")
    public ResponseEntity<Map<String, Object>> testChat(@RequestBody Map<String, String> request) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            String message = request.getOrDefault("message", "Hello, how are you doing today?");
            boolean includeAudio = Boolean.parseBoolean(request.getOrDefault("include_audio", "true"));
            
            logger.info("Testing chat functionality with message: {}", message);
            
            Map<String, Object> chatResult = aiProcessingService.chat(message, includeAudio, "en-US-JennyNeural");
            
            result.put("status", "success");
            result.put("user_message", message);
            result.put("ai_response_generated", chatResult.get("ai_response") != null);
            result.put("audio_response_generated", chatResult.get("audio_response") != null);
            result.put("chat_status", chatResult.get("status"));
            
            if (chatResult.get("ai_response") != null) {
                String response = (String) chatResult.get("ai_response");
                result.put("response_length", response.length());
                result.put("response_preview", response.length() > 100 ? 
                          response.substring(0, 100) + "..." : response);
            }
            
            if (chatResult.get("audio_response") != null) {
                byte[] audioData = (byte[]) chatResult.get("audio_response");
                result.put("audio_size_bytes", audioData.length);
            }
            
            logger.info("Chat test completed successfully");
            
        } catch (Exception e) {
            logger.error("Chat test failed", e);
            result.put("status", "error");
            result.put("error", e.getMessage());
        }
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * Test text analysis functionality
     */
    @PostMapping("/text-analysis")
    public ResponseEntity<Map<String, Object>> testTextAnalysis(@RequestBody Map<String, String> request) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            String text = request.getOrDefault("text", 
                "I am feeling excited about this new AI project. It has great potential and I'm optimistic about the results.");
            
            logger.info("Testing text analysis functionality");
            
            Map<String, Object> analysis = openAIService.analyzeText(text);
            
            result.put("status", "success");
            result.put("original_text", text);
            result.put("analysis_completed", analysis != null);
            result.put("analysis_data", analysis);
            result.put("timestamp", System.currentTimeMillis());
            
            logger.info("Text analysis test completed successfully");
            
        } catch (Exception e) {
            logger.error("Text analysis test failed", e);
            result.put("status", "error");
            result.put("error", e.getMessage());
        }
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * Get all AI service statuses
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getAIStatus() {
        Map<String, Object> status = new HashMap<>();
        
        try {
            status.put("openai_healthy", openAIService.isServiceHealthy());
            status.put("azure_speech_healthy", azureSpeechService.isServiceHealthy());
            
            Map<String, Object> capabilities = aiProcessingService.getProcessingCapabilities();
            status.put("full_capabilities", capabilities);
            
            status.put("timestamp", System.currentTimeMillis());
            status.put("overall_status", "operational");
            
        } catch (Exception e) {
            logger.error("Error getting AI status", e);
            status.put("overall_status", "error");
            status.put("error", e.getMessage());
        }
        
        return ResponseEntity.ok(status);
    }
}
