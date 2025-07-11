package com.sonexa.backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class AzureAIService {

    private static final Logger logger = LoggerFactory.getLogger(AzureAIService.class);

    @Value("${azure.ai.key}")
    private String azureAIKey;

    @Value("${azure.ai.endpoint}")
    private String azureAIEndpoint;

    @Value("${azure.ai.deployment.name:gpt-35-turbo}")
    private String deploymentName;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public AzureAIService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    /**
     * Generate text completion using Azure OpenAI Service
     */
    public String generateCompletion(String prompt, int maxTokens) {
        try {
            String url = azureAIEndpoint + "/openai/deployments/" + deploymentName + "/chat/completions?api-version=2024-02-15-preview";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("api-key", azureAIKey);

            Map<String, Object> requestBody = new HashMap<>();
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
                logger.error("Azure AI API error: {}", response.getStatusCode());
                throw new RuntimeException("Failed to generate completion: " + response.getStatusCode());
            }

        } catch (JsonProcessingException | RuntimeException e) {
            logger.error("Error calling Azure AI API", e);
            throw new RuntimeException("Azure AI API call failed", e);
        }
    }

    /**
     * Analyze text using Azure AI
     */
    public Map<String, Object> analyzeText(String text) {
        try {
            String analysisPrompt = """
                Analyze the following text and provide a JSON response with sentiment (positive/negative/neutral), 
                key topics, and emotional tone: 

                %s""".formatted(text);

            String analysis = generateCompletion(analysisPrompt, 300);

            Map<String, Object> result = new HashMap<>();
            result.put("original_text", text);
            result.put("analysis", analysis);
            result.put("timestamp", System.currentTimeMillis());
            result.put("ai_provider", "azure");

            return result;

        } catch (Exception e) {
            logger.error("Error analyzing text with Azure AI", e);
            throw new RuntimeException("Azure AI text analysis failed", e);
        }
    }

    /**
     * Generate chat response using Azure AI
     */
    public String generateChatResponse(String message) {
        try {
            String chatPrompt = String.format(
                    "You are a helpful AI assistant. Respond to this message in a conversational way: %s", message
            );
            return generateCompletion(chatPrompt, 500);
        } catch (Exception e) {
            logger.error("Error generating chat response with Azure AI", e);
            throw new RuntimeException("Azure AI chat response failed", e);
        }
    }

    /**
     * Health check for Azure AI service
     */
    public boolean isServiceHealthy() {
        try {
            String testPrompt = "Hello, this is a health check.";
            String response = generateCompletion(testPrompt, 50);
            return response != null && !response.trim().isEmpty();
        } catch (Exception e) {
            logger.error("Azure AI service health check failed", e);
            return false;
        }
    }
}
