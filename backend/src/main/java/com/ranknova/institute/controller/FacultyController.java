package com.ranknova.institute.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/faculty")
public class FacultyController {

    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> upload(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(Map.of("data", Map.of("status", "uploaded"), "timestamp", System.currentTimeMillis()));
    }

    @PostMapping("/test")
    public ResponseEntity<Map<String, Object>> test(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(Map.of("data", Map.of("status", "submitted"), "timestamp", System.currentTimeMillis()));
    }
}
