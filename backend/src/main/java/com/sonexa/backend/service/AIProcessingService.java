package com.sonexa.backend.service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AIProcessingService {

    private static final Logger logger = LoggerFactory.getLogger(AIProcessingService.class);

    @Autowired
    private OpenAIService openAIService;

    @Autowired
    private AzureAIService azureAIService;

    @Autowired
    private AzureSpeechService azureSpeechService;

    /**
     * Determine which AI service to use based on subscription tier
     */
    private boolean shouldUseOpenAI(String subscriptionTier) {
        if (subscriptionTier == null) {
            return false; // Default to Azure for free/unknown users
        }

        return switch (subscriptionTier.toLowerCase()) {
            case "free" ->
                false; // Use Azure AI for free tier
            case "basic", "premium", "enterprise" ->
                true; // Use OpenAI for paid tiers
            default ->
                false; // Default to Azure for unknown tiers
        };
    }

    /**
     * Generate AI response with tier-based routing
     */
    private String generateAIResponse(String prompt, String subscriptionTier, int maxTokens) {
        if (shouldUseOpenAI(subscriptionTier)) {
            logger.info("Using OpenAI for subscription tier: {}", subscriptionTier);
            return openAIService.generateCompletion(prompt, "gpt-3.5-turbo", maxTokens);
        } else {
            logger.info("Using Azure AI for subscription tier: {}", subscriptionTier);
            return azureAIService.generateCompletion(prompt, maxTokens);
        }
    }

    /**
     * Analyze text with tier-based routing
     */
    private Map<String, Object> analyzeTextWithTier(String text, String subscriptionTier) {
        if (shouldUseOpenAI(subscriptionTier)) {
            logger.info("Using OpenAI text analysis for tier: {}", subscriptionTier);
            return openAIService.analyzeText(text);
        } else {
            logger.info("Using Azure AI text analysis for tier: {}", subscriptionTier);
            return azureAIService.analyzeText(text);
        }
    }

    /**
     * Process text input through AI pipeline with subscription tier routing
     */
    public Map<String, Object> processText(String text, boolean generateSpeech, String voiceName, String subscriptionTier) {
        try {
            Map<String, Object> result = new HashMap<>();
            result.put("input_text", text);
            result.put("timestamp", System.currentTimeMillis());
            result.put("subscription_tier", subscriptionTier);
            result.put("ai_provider", shouldUseOpenAI(subscriptionTier) ? "openai" : "azure");

            // Step 1: Analyze text with tier-based routing
            logger.info("Starting AI text analysis for input length: {} with tier: {}", text.length(), subscriptionTier);
            Map<String, Object> analysis = analyzeTextWithTier(text, subscriptionTier);
            result.put("analysis", analysis);

            // Step 2: Generate enhanced response with tier-based routing
            String enhancementPrompt = String.format(
                    "Based on this text analysis, provide a helpful and informative response: %s", text
            );
            String enhancedResponse = generateAIResponse(enhancementPrompt, subscriptionTier, 300);
            result.put("enhanced_response", enhancedResponse);

            // Step 3: Generate speech if requested
            if (generateSpeech) {
                logger.info("Generating speech for enhanced response");
                byte[] audioData = azureSpeechService.textToSpeech(enhancedResponse, voiceName, "en-US");
                result.put("speech_audio", audioData);
                result.put("speech_format", "mp3");
            }

            result.put("processing_status", "completed");
            logger.info("AI processing completed successfully using {}",
                    shouldUseOpenAI(subscriptionTier) ? "OpenAI" : "Azure AI");

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
     * Backward compatibility method (defaults to free tier)
     */
    public Map<String, Object> processText(String text, boolean generateSpeech, String voiceName) {
        return processText(text, generateSpeech, voiceName, "free");
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
     * Async text processing with tier support
     */
    public CompletableFuture<Map<String, Object>> processTextAsync(String text, boolean generateSpeech, String voiceName, String subscriptionTier) {
        return CompletableFuture.supplyAsync(() -> processText(text, generateSpeech, voiceName, subscriptionTier));
    }

    /**
     * Backward compatibility for async text processing
     */
    public CompletableFuture<Map<String, Object>> processTextAsync(String text, boolean generateSpeech, String voiceName) {
        return processTextAsync(text, generateSpeech, voiceName, "free");
    }

    /**
     * Async audio processing for better performance
     */
    public CompletableFuture<Map<String, Object>> processAudioAsync(byte[] audioData, boolean generateTextResponse, String voiceName) {
        return CompletableFuture.supplyAsync(() -> processAudio(audioData, generateTextResponse, voiceName));
    }

    /**
     * Get processing capabilities and status for both AI services
     */
    public Map<String, Object> getProcessingCapabilities() {
        Map<String, Object> capabilities = new HashMap<>();

        // Check service health for both providers
        boolean openAIHealthy = openAIService.isServiceHealthy();
        boolean azureAIHealthy = azureAIService.isServiceHealthy();
        boolean azureSpeechHealthy = azureSpeechService.isServiceHealthy();

        capabilities.put("openai_available", openAIHealthy);
        capabilities.put("azure_ai_available", azureAIHealthy);
        capabilities.put("azure_speech_available", azureSpeechHealthy);

        // Tier-based capabilities
        capabilities.put("free_tier_processing", azureAIHealthy);
        capabilities.put("paid_tier_processing", openAIHealthy);
        capabilities.put("speech_synthesis", azureSpeechHealthy);
        capabilities.put("speech_recognition", azureSpeechHealthy);
        capabilities.put("full_pipeline", (openAIHealthy || azureAIHealthy) && azureSpeechHealthy);

        // Subscription tier mapping
        Map<String, Object> tierMapping = new HashMap<>();
        tierMapping.put("free", "azure_ai");
        tierMapping.put("basic", "openai");
        tierMapping.put("premium", "openai");
        tierMapping.put("enterprise", "openai");
        capabilities.put("tier_mapping", tierMapping);

        // Get available voices
        if (azureSpeechHealthy) {
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
     * Chat interface with subscription tier routing
     */
    public Map<String, Object> chat(String message, boolean includeAudio, String preferredVoice, String subscriptionTier) {
        try {
            logger.info("Processing chat message: {} with tier: {}",
                    message.substring(0, Math.min(message.length(), 50)) + "...", subscriptionTier);

            // Generate response using tier-based routing
            String chatPrompt = String.format(
                    "You are a helpful AI assistant. Respond to this message in a conversational way: %s", message
            );
            String response = generateAIResponse(chatPrompt, subscriptionTier, 500);

            Map<String, Object> result = new HashMap<>();
            result.put("user_message", message);
            result.put("ai_response", response);
            result.put("timestamp", System.currentTimeMillis());
            result.put("subscription_tier", subscriptionTier);
            result.put("ai_provider", shouldUseOpenAI(subscriptionTier) ? "openai" : "azure");

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

    /**
     * Backward compatibility method (defaults to free tier)
     */
    public Map<String, Object> chat(String message, boolean includeAudio, String preferredVoice) {
        return chat(message, includeAudio, preferredVoice, "free");
    }
}
