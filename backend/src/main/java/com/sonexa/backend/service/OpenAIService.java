package com.sonexa.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OpenAIService {
    
    private static final Logger logger = LoggerFactory.getLogger(OpenAIService.class);
    
    @Value("${openai.api.key}")
    private String openaiApiKey;
    
    @Value("${openai.api.url:https://api.openai.com/v1}")
    private String openaiApiUrl;
    
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    
    public OpenAIService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }
    
    /**
     * Generate text completion using OpenAI GPT
     */
    public String generateCompletion(String prompt, String model, int maxTokens) {
        try {
            String url = openaiApiUrl + "/chat/completions";
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(openaiApiKey);
            
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", model != null ? model : "gpt-3.5-turbo");
            requestBody.put("messages", List.of(
                Map.of("role", "user", "content", prompt)
            ));
            requestBody.put("max_tokens", maxTokens > 0 ? maxTokens : 500);
            requestBody.put("temperature", 0.7);
            
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
            
            if (response.getStatusCode() == HttpStatus.OK) {
                JsonNode jsonResponse = objectMapper.readTree(response.getBody());
                return jsonResponse.path("choices").get(0).path("message").path("content").asText();
            } else {
                logger.error("OpenAI API error: {}", response.getStatusCode());
                throw new RuntimeException("Failed to generate completion: " + response.getStatusCode());
            }
            
        } catch (Exception e) {
            logger.error("Error calling OpenAI API", e);
            throw new RuntimeException("OpenAI API call failed", e);
        }
    }
    
    /**
     * Transcribe audio using OpenAI Whisper
     */
    public String transcribeAudio(byte[] audioData, String fileName) {
        try {
            // Note: This is a simplified implementation
            // In a full implementation, you'd use MultiValueMap for multipart data
            logger.info("Transcribing audio file: {}", fileName);
            
            // For now, return a placeholder - full multipart implementation would be added here
            return "Audio transcription functionality - implementation pending multipart support";
            
        } catch (Exception e) {
            logger.error("Error transcribing audio", e);
            throw new RuntimeException("Audio transcription failed", e);
        }
    }
    
    /**
     * Analyze text for sentiment, entities, etc.
     */
    public Map<String, Object> analyzeText(String text) {
        try {
            String analysisPrompt = """
                Analyze the following text and provide a JSON response with sentiment (positive/negative/neutral), 
                key topics, and emotional tone: 

                %s""".formatted(text);
            
            String analysis = generateCompletion(analysisPrompt, "gpt-3.5-turbo", 300);
            
            Map<String, Object> result = new HashMap<>();
            result.put("original_text", text);
            result.put("analysis", analysis);
            result.put("timestamp", System.currentTimeMillis());
            
            return result;
            
        } catch (Exception e) {
            logger.error("Error analyzing text", e);
            throw new RuntimeException("Text analysis failed", e);
        }
    }
    
    /**
     * Health check for OpenAI service
     */
    public boolean isServiceHealthy() {
        try {
            String testPrompt = "Hello, this is a health check.";
            String response = generateCompletion(testPrompt, "gpt-3.5-turbo", 50);
            return response != null && !response.trim().isEmpty();
        } catch (Exception e) {
            logger.error("OpenAI service health check failed", e);
            return false;
        }
    }
}
