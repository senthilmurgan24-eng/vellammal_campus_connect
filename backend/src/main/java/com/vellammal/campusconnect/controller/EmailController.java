package com.vellammal.campusconnect.controller;

import com.vellammal.campusconnect.entity.EmailLog;
import com.vellammal.campusconnect.entity.EmailTrigger;
import com.vellammal.campusconnect.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
public class EmailController {
    
    private final EmailService emailService;
    
    /**
     * Get all active email triggers
     */
    @GetMapping("/triggers")
    public ResponseEntity<Map<String, Object>> getActiveTriggers() {
        List<EmailTrigger> triggers = emailService.getActiveTriggers();
        return ResponseEntity.ok(Map.of(
            "data", triggers,
            "timestamp", System.currentTimeMillis()
        ));
    }
    
    /**
     * Get email logs by status
     */
    @GetMapping("/logs")
    public ResponseEntity<Map<String, Object>> getEmailLogs(@RequestParam(name = "status", required = false) String status) {
        List<EmailLog> logs = status != null 
            ? emailService.getEmailLogsByStatus(status)
            : List.of();
        
        return ResponseEntity.ok(Map.of(
            "data", logs,
            "timestamp", System.currentTimeMillis()
        ));
    }
    
    /**
     * Send a test email
     */
    @PostMapping("/send-test")
    public ResponseEntity<Map<String, Object>> sendTestEmail(@RequestBody Map<String, String> payload) {
        String recipient = payload.get("recipient");
        String subject = payload.getOrDefault("subject", "Test Email from Campus Connect");
        String body = payload.getOrDefault("body", "<h1>Test Email</h1><p>This is a test email from Campus Connect system.</p>");
        
        emailService.sendEmail(recipient, subject, body, null);
        
        return ResponseEntity.ok(Map.of(
            "message", "Email sent",
            "timestamp", System.currentTimeMillis()
        ));
    }
    
    /**
     * Trigger email by event type
     */
    @PostMapping("/trigger")
    public ResponseEntity<Map<String, Object>> triggerEmail(@RequestBody Map<String, Object> payload) {
        String eventType = (String) payload.get("eventType");
        String recipient = (String) payload.get("recipient");
        
        emailService.sendEmailByEvent(eventType, recipient);
        
        return ResponseEntity.ok(Map.of(
            "message", "Email triggered",
            "eventType", eventType,
            "timestamp", System.currentTimeMillis()
        ));
    }
}
