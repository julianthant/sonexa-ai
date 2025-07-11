package com.sonexa.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/public/hello")
    public ResponseEntity<Map<String, String>> publicEndpoint() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello! This is a public endpoint - no authentication required");
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/profile")
    public ResponseEntity<Map<String, Object>> userProfile() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Welcome to your profile!");
        response.put("email", auth.getName());
        response.put("authorities", auth.getAuthorities());
        response.put("status", "success");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/admin/dashboard")
    public ResponseEntity<Map<String, Object>> adminDashboard() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Welcome to the admin dashboard!");
        response.put("email", auth.getName());
        response.put("authorities", auth.getAuthorities());
        response.put("status", "admin_access");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        Map<String, Object> response = new HashMap<>();
        response.put("email", auth.getName());
        response.put("roles", auth.getAuthorities());
        response.put("authenticated", auth.isAuthenticated());

        return ResponseEntity.ok(response);
    }
}
