package com.sonexa.backend.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sonexa.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    private static final Logger logger = LoggerFactory.getLogger(HealthController.class);

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/status")
    public ResponseEntity<?> getStatus() {
        logger.info("Health status check requested");

        Map<String, Object> status = new HashMap<>();
        status.put("status", "UP");
        status.put("timestamp", LocalDateTime.now());
        status.put("service", "Sonexa AI Backend");

        try {
            long userCount = userRepository.count();
            status.put("database", "Connected");
            status.put("userCount", userCount);
            logger.info("Health check successful - Database connected, {} users", userCount);
        } catch (Exception e) {
            logger.error("Health check failed - Database error: {}", e.getMessage());
            status.put("database", "Error: " + e.getMessage());
            return ResponseEntity.status(503).body(status);
        }

        return ResponseEntity.ok(status);
    }

    @GetMapping("/db")
    public ResponseEntity<?> getDatabaseInfo() {
        logger.info("Database info requested");

        Map<String, Object> dbInfo = new HashMap<>();

        try {
            long userCount = userRepository.count();
            dbInfo.put("connected", true);
            dbInfo.put("userCount", userCount);
            dbInfo.put("timestamp", LocalDateTime.now());

            logger.info("Database info retrieved successfully - {} users", userCount);
            return ResponseEntity.ok(dbInfo);

        } catch (Exception e) {
            logger.error("Failed to retrieve database info: {}", e.getMessage(), e);
            dbInfo.put("connected", false);
            dbInfo.put("error", e.getMessage());
            dbInfo.put("timestamp", LocalDateTime.now());

            return ResponseEntity.status(503).body(dbInfo);
        }
    }
}
