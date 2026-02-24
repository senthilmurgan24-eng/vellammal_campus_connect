package com.ranknova.institute.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/parent")
public class ParentController {

    @GetMapping("/overview")
    public ResponseEntity<Map<String, Object>> overview() {
        Map<String, Object> data = Map.of(
                "attendance", 98,
                "progress", "on-track"
        );
        return ResponseEntity.ok(Map.of("data", data, "timestamp", System.currentTimeMillis()));
    }
}
