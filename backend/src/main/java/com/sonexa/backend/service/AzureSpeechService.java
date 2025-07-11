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
import java.util.Map;

@Service
public class AzureSpeechService {
    
    private static final Logger logger = LoggerFactory.getLogger(AzureSpeechService.class);
    
    @Value("${azure.speech.key}")
    private String azureSpeechKey;
    
    @Value("${azure.speech.region}")
    private String azureSpeechRegion;
    
    @Value("${azure.speech.endpoint:https://{region}.api.cognitive.microsoft.com}")
    private String azureSpeechEndpoint;
    
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    
    public AzureSpeechService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }
    
    /**
     * Convert text to speech using Azure Speech Services
     */
    public byte[] textToSpeech(String text, String voiceName, String language) {
        try {
            String endpoint = azureSpeechEndpoint.replace("{region}", azureSpeechRegion);
            String url = endpoint + "/cognitiveservices/v1";
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.valueOf("application/ssml+xml"));
            headers.set("Ocp-Apim-Subscription-Key", azureSpeechKey);
            headers.set("X-Microsoft-OutputFormat", "audio-16khz-128kbitrate-mono-mp3");
            headers.set("User-Agent", "Sonexa-AI");
            
            String ssml = buildSSML(text, voiceName != null ? voiceName : "en-US-JennyNeural", 
                                  language != null ? language : "en-US");
            
            HttpEntity<String> entity = new HttpEntity<>(ssml, headers);
            ResponseEntity<byte[]> response = restTemplate.exchange(url, HttpMethod.POST, entity, byte[].class);
            
            if (response.getStatusCode() == HttpStatus.OK) {
                logger.info("Successfully generated speech for text length: {}", text.length());
                return response.getBody();
            } else {
                logger.error("Azure Speech API error: {}", response.getStatusCode());
                throw new RuntimeException("Failed to generate speech: " + response.getStatusCode());
            }
            
        } catch (Exception e) {
            logger.error("Error calling Azure Speech API", e);
            throw new RuntimeException("Azure Speech API call failed", e);
        }
    }
    
    /**
     * Convert speech to text using Azure Speech Services
     */
    public String speechToText(byte[] audioData, String language) {
        try {
            String endpoint = azureSpeechEndpoint.replace("{region}", azureSpeechRegion);
            String url = endpoint + "/cognitiveservices/v1/recognizers/messages";
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.valueOf("audio/wav"));
            headers.set("Ocp-Apim-Subscription-Key", azureSpeechKey);
            headers.set("Accept", "application/json");
            
            if (language != null) {
                headers.set("Speech-Language", language);
            }
            
            HttpEntity<byte[]> entity = new HttpEntity<>(audioData, headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
            
            if (response.getStatusCode() == HttpStatus.OK) {
                JsonNode jsonResponse = objectMapper.readTree(response.getBody());
                String recognizedText = jsonResponse.path("DisplayText").asText();
                logger.info("Successfully transcribed audio to text length: {}", recognizedText.length());
                return recognizedText;
            } else {
                logger.error("Azure Speech recognition error: {}", response.getStatusCode());
                throw new RuntimeException("Failed to recognize speech: " + response.getStatusCode());
            }
            
        } catch (Exception e) {
            logger.error("Error calling Azure Speech recognition API", e);
            throw new RuntimeException("Azure Speech recognition failed", e);
        }
    }
    
    /**
     * Get available voices for text-to-speech
     */
    public Map<String, Object> getAvailableVoices() {
        try {
            String endpoint = azureSpeechEndpoint.replace("{region}", azureSpeechRegion);
            String url = endpoint + "/cognitiveservices/voices/list";
            
            HttpHeaders headers = new HttpHeaders();
            headers.set("Ocp-Apim-Subscription-Key", azureSpeechKey);
            headers.setAccept(java.util.List.of(MediaType.APPLICATION_JSON));
            
            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            
            if (response.getStatusCode() == HttpStatus.OK) {
                JsonNode voicesArray = objectMapper.readTree(response.getBody());
                
                Map<String, Object> result = new HashMap<>();
                result.put("voices", voicesArray);
                result.put("count", voicesArray.size());
                
                logger.info("Retrieved {} available voices", voicesArray.size());
                return result;
            } else {
                logger.error("Error retrieving voices: {}", response.getStatusCode());
                throw new RuntimeException("Failed to retrieve voices: " + response.getStatusCode());
            }
            
        } catch (Exception e) {
            logger.error("Error getting available voices", e);
            throw new RuntimeException("Failed to get available voices", e);
        }
    }
    
    /**
     * Build SSML (Speech Synthesis Markup Language) for text-to-speech
     */
    private String buildSSML(String text, String voiceName, String language) {
        return String.format(
            "<speak version='1.0' xml:lang='%s'>" +
            "<voice name='%s'>" +
            "%s" +
            "</voice>" +
            "</speak>",
            language, voiceName, text
        );
    }
    
    /**
     * Health check for Azure Speech service
     */
    public boolean isServiceHealthy() {
        try {
            // Simple health check - try to get available voices
            Map<String, Object> voices = getAvailableVoices();
            return voices != null && voices.containsKey("voices");
        } catch (Exception e) {
            logger.error("Azure Speech service health check failed", e);
            return false;
        }
    }
}
