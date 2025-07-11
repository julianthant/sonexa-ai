package com.sonexa.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sonexa.backend.dto.AuthRequest;
import com.sonexa.backend.dto.RegisterRequest;
import com.sonexa.backend.model.Role;
import com.sonexa.backend.model.User;
import com.sonexa.backend.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String register(RegisterRequest request) {
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        User user = new User(request.getEmail(), encodedPassword, Role.USER);

        // Generate unique custom email for voice messages
        String customVoiceEmail = generateCustomVoiceEmail(request.getEmail());
        user.setCustomVoiceEmail(customVoiceEmail);

        userRepository.save(user);
        return jwtService.generateToken(user);
    }

    private String generateCustomVoiceEmail(String userEmail) {
        // Convert john.doe@gmail.com -> sonexa.voice.ai+john-doe@gmail.com
        String localPart = userEmail.split("@")[0];
        String sanitized = localPart.toLowerCase()
                .replaceAll("[^a-z0-9]", "-")
                .replaceAll("-+", "-")
                .replaceAll("^-|-$", "");

        // Use Gmail + addressing (completely free!)
        String baseEmail = "sonexa.voice.ai+" + sanitized + "@gmail.com";
        String finalEmail = baseEmail;
        int counter = 1;

        // Ensure uniqueness by adding number if needed
        while (userRepository.findByCustomVoiceEmail(finalEmail).isPresent()) {
            finalEmail = "sonexa.voice.ai+" + sanitized + counter + "@gmail.com";
            counter++;
        }

        return finalEmail;
    }

    public Optional<String> authenticate(AuthRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                return Optional.of(jwtService.generateToken(user));
            }
        }
        return Optional.empty();
    }
}
