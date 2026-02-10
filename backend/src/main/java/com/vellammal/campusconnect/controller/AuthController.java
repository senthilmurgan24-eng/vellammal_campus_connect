package com.vellammal.campusconnect.controller;

import com.vellammal.campusconnect.dto.AuthDtos.LoginRequest;
import com.vellammal.campusconnect.dto.AuthDtos.RefreshRequest;
import com.vellammal.campusconnect.dto.AuthDtos.TokenResponse;
import com.vellammal.campusconnect.security.JwtService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtService jwtService;

    public AuthController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody LoginRequest request) {
        // Stub: validate credentials; issue tokens
        String role = request.getRole().toUpperCase();
        String access = jwtService.generate(request.getIdentifier(), List.of("ROLE_" + role), 3600);
        String refresh = jwtService.generate(request.getIdentifier(), List.of("ROLE_" + role), 24 * 3600);

        TokenResponse tokenResponse = new TokenResponse();
        tokenResponse.setAccessToken(access);
        tokenResponse.setRefreshToken(refresh);
        tokenResponse.setUser(Map.of("name", request.getIdentifier(), "role", request.getRole()));

        return ResponseEntity.ok(Map.of("data", tokenResponse, "timestamp", System.currentTimeMillis()));
    }

    @PostMapping("/refresh")
    public ResponseEntity<Map<String, Object>> refresh(@Valid @RequestBody RefreshRequest request) {
        // In real impl: validate refresh token
        String newAccess = jwtService.generate("user", List.of("ROLE_STUDENT"), 3600);
        TokenResponse resp = new TokenResponse();
        resp.setAccessToken(newAccess);
        resp.setRefreshToken(request.getRefreshToken());
        resp.setUser(Map.of("name", "user", "role", "student"));
        return ResponseEntity.ok(Map.of("data", resp, "timestamp", System.currentTimeMillis()));
    }
}
