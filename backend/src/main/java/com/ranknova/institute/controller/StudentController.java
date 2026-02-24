package com.ranknova.institute.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> dashboard() {
        Map<String, Object> data = Map.of(
                "overallRank", 24,
                "pendingTests", 2,
                "upcoming", 1
        );
        return ResponseEntity.ok(Map.of("data", data, "timestamp", System.currentTimeMillis()));
    }

    @GetMapping("/performance")
    public ResponseEntity<Map<String, Object>> performance() {
        Map<String, Object> data = Map.of(
                "accuracy", 92,
                "avgTime", 45,
                "consistency", 88
        );
        return ResponseEntity.ok(Map.of("data", data, "timestamp", System.currentTimeMillis()));
    }
}
