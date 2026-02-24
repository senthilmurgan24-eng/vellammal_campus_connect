package com.ranknova.institute.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final SimpMessagingTemplate messagingTemplate;

    public NotificationController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> list() {
        List<Map<String, Object>> data = List.of(
                Map.of("id", UUID.randomUUID().toString(), "title", "Welcome", "body", "Let’s start your prep", "ts", Instant.now()),
                Map.of("id", UUID.randomUUID().toString(), "title", "Mock Test", "body", "New mock test released", "ts", Instant.now())
        );
        return ResponseEntity.ok(Map.of("data", data, "timestamp", System.currentTimeMillis()));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> broadcast(@RequestBody Map<String, Object> payload) {
        payload.putIfAbsent("id", UUID.randomUUID().toString());
        payload.put("ts", Instant.now());
        messagingTemplate.convertAndSend("/topic/notifications", payload);
        return ResponseEntity.ok(Map.of("data", payload, "timestamp", System.currentTimeMillis()));
    }
}
