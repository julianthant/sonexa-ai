package com.sonexa.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@Service
public class AIProcessingService {
    
    private static final Logger logger = LoggerFactory.getLogger(AIProcessingService.class);
    
    @Autowired
    private OpenAIService openAIService;
    
    @Autowired
    private AzureSpeechService azureSpeechService;
    
    /**
     * Process text input through AI pipeline
     */
    public Map<String, Object> processText(String text, boolean generateSpeech, String voiceName) {
        try {
            Map<String, Object> result = new HashMap<>();
            result.put("input_text", text);
            result.put("timestamp", System.currentTimeMillis());
            
            // Step 1: Analyze text with OpenAI
            logger.info("Starting AI text analysis for input length: {}", text.length());
            Map<String, Object> analysis = openAIService.analyzeText(text);
            result.put("analysis", analysis);
            
            // Step 2: Generate enhanced response
            String enhancementPrompt = String.format(
                "Based on this text analysis, provide a helpful and informative response: %s", text
            );
            String enhancedResponse = openAIService.generateCompletion(enhancementPrompt, "gpt-3.5-turbo", 300);
            result.put("enhanced_response", enhancedResponse);
            
            // Step 3: Generate speech if requested
            if (generateSpeech) {
                logger.info("Generating speech for enhanced response");
                byte[] audioData = azureSpeechService.textToSpeech(enhancedResponse, voiceName, "en-US");
                result.put("speech_audio", audioData);
                result.put("speech_format", "mp3");
            }
            
            result.put("processing_status", "completed");
            logger.info("AI processing completed successfully");
            
            return result;
            
        } catch (Exception e) {
            logger.error("Error in AI processing pipeline", e);
            Map<String, Object> errorResult = new HashMap<>();
            errorResult.put("processing_status", "failed");
            errorResult.put("error", e.getMessage());
            errorResult.put("timestamp", System.currentTimeMillis());
            return errorResult;
        }
    }
    
    /**
     * Process audio input through AI pipeline
     */
    public Map<String, Object> processAudio(byte[] audioData, boolean generateTextResponse, String voiceName) {
        try {
            Map<String, Object> result = new HashMap<>();
            result.put("timestamp", System.currentTimeMillis());
            
            // Step 1: Convert speech to text
            logger.info("Converting speech to text for audio data size: {} bytes", audioData.length);
            String transcribedText = azureSpeechService.speechToText(audioData, "en-US");
            result.put("transcribed_text", transcribedText);
            
            // Step 2: Process the transcribed text
            if (generateTextResponse) {
                Map<String, Object> textProcessing = processText(transcribedText, false, null);
                result.put("text_analysis", textProcessing.get("analysis"));
                result.put("enhanced_response", textProcessing.get("enhanced_response"));
                
                // Step 3: Generate speech response
                String responseText = (String) textProcessing.get("enhanced_response");
                if (responseText != null && !responseText.trim().isEmpty()) {
                    logger.info("Generating speech response");
                    byte[] responseAudio = azureSpeechService.textToSpeech(responseText, voiceName, "en-US");
                    result.put("response_audio", responseAudio);
                    result.put("response_audio_format", "mp3");
                }
            }
            
            result.put("processing_status", "completed");
            logger.info("Audio processing completed successfully");
            
            return result;
            
        } catch (Exception e) {
            logger.error("Error in audio processing pipeline", e);
            Map<String, Object> errorResult = new HashMap<>();
            errorResult.put("processing_status", "failed");
            errorResult.put("error", e.getMessage());
            errorResult.put("timestamp", System.currentTimeMillis());
            return errorResult;
        }
    }
    
    /**
     * Async text processing for better performance
     */
    public CompletableFuture<Map<String, Object>> processTextAsync(String text, boolean generateSpeech, String voiceName) {
        return CompletableFuture.supplyAsync(() -> processText(text, generateSpeech, voiceName));
    }
    
    /**
     * Async audio processing for better performance
     */
    public CompletableFuture<Map<String, Object>> processAudioAsync(byte[] audioData, boolean generateTextResponse, String voiceName) {
        return CompletableFuture.supplyAsync(() -> processAudio(audioData, generateTextResponse, voiceName));
    }
    
    /**
     * Get processing capabilities and status
     */
    public Map<String, Object> getProcessingCapabilities() {
        Map<String, Object> capabilities = new HashMap<>();
        
        // Check service health
        boolean openAIHealthy = openAIService.isServiceHealthy();
        boolean azureHealthy = azureSpeechService.isServiceHealthy();
        
        capabilities.put("openai_available", openAIHealthy);
        capabilities.put("azure_speech_available", azureHealthy);
        capabilities.put("text_processing", openAIHealthy);
        capabilities.put("speech_synthesis", azureHealthy);
        capabilities.put("speech_recognition", azureHealthy);
        capabilities.put("full_pipeline", openAIHealthy && azureHealthy);
        
        // Get available voices
        if (azureHealthy) {
            try {
                Map<String, Object> voices = azureSpeechService.getAvailableVoices();
                capabilities.put("available_voices", voices);
            } catch (Exception e) {
                logger.warn("Could not retrieve available voices", e);
                capabilities.put("available_voices", "unavailable");
            }
        }
        
        capabilities.put("timestamp", System.currentTimeMillis());
        
        return capabilities;
    }
    
    /**
     * Simple conversation interface
     */
    public Map<String, Object> chat(String message, boolean includeAudio, String preferredVoice) {
        try {
            logger.info("Processing chat message: {}", message.substring(0, Math.min(message.length(), 50)) + "...");
            
            // Generate response using OpenAI
            String chatPrompt = String.format(
                "You are a helpful AI assistant. Respond to this message in a conversational way: %s", message
            );
            String response = openAIService.generateCompletion(chatPrompt, "gpt-3.5-turbo", 500);
            
            Map<String, Object> result = new HashMap<>();
            result.put("user_message", message);
            result.put("ai_response", response);
            result.put("timestamp", System.currentTimeMillis());
            
            // Generate audio response if requested
            if (includeAudio && response != null && !response.trim().isEmpty()) {
                byte[] audioResponse = azureSpeechService.textToSpeech(
                    response, 
                    preferredVoice != null ? preferredVoice : "en-US-JennyNeural", 
                    "en-US"
                );
                result.put("audio_response", audioResponse);
                result.put("audio_format", "mp3");
            }
            
            result.put("status", "success");
            return result;
            
        } catch (Exception e) {
            logger.error("Error in chat processing", e);
            Map<String, Object> errorResult = new HashMap<>();
            errorResult.put("status", "error");
            errorResult.put("error", e.getMessage());
            errorResult.put("timestamp", System.currentTimeMillis());
            return errorResult;
        }
    }
}
