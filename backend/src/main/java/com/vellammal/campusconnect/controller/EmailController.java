package com.vellammal.campusconnect.controller;

import com.vellammal.campusconnect.entity.EmailLog;
import com.vellammal.campusconnect.entity.EmailTrigger;
import com.vellammal.campusconnect.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    /**
     * Send admissions application details to admissions desk email
     */
    @PostMapping("/admissions-application")
    public ResponseEntity<Map<String, Object>> sendAdmissionsApplication(@RequestBody Map<String, String> payload) {
        String name = payload.getOrDefault("name", "").trim();
        String course = payload.getOrDefault("course", "").trim();
        String parentContact = payload.getOrDefault("parentContact", "").trim();
        String email = payload.getOrDefault("email", "").trim();
        String message = payload.getOrDefault("message", "").trim();

        if (name.isEmpty() || course.isEmpty() || parentContact.isEmpty() || email.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                "message", "name, course, parentContact and email are required",
                "timestamp", System.currentTimeMillis()
            ));
        }

        String safeName = escapeHtml(name);
        String safeCourse = escapeHtml(course);
        String safeParentContact = escapeHtml(parentContact);
        String safeEmail = escapeHtml(email);
        String safeMessage = message.isEmpty() ? "N/A" : escapeHtml(message);

        String subject = "New Admission Application - " + safeName;
        String body = """
            <h2>New Admission Application</h2>
            <p><strong>Student Name:</strong> %s</p>
            <p><strong>Course:</strong> %s</p>
            <p><strong>Parent Contact:</strong> %s</p>
            <p><strong>Student Email:</strong> %s</p>
            <p><strong>Message:</strong> %s</p>
            """.formatted(safeName, safeCourse, safeParentContact, safeEmail, safeMessage);

        String configIssue = emailService.getEmailConfigurationIssue();
        if (configIssue != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                "sent", false,
                "message", configIssue,
                "timestamp", System.currentTimeMillis()
            ));
        }

        boolean sent = emailService.sendEmailWithStatus("academics@ranknovainstitute.com", subject, body, null);

        if (!sent) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "sent", false,
                "message", "Application saved but email delivery failed. Please verify email configuration.",
                "timestamp", System.currentTimeMillis()
            ));
        }

        return ResponseEntity.ok(Map.of(
            "sent", true,
            "message", "Application submitted and email sent",
            "timestamp", System.currentTimeMillis()
        ));
    }

    private String escapeHtml(String value) {
        return value
            .replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace("\"", "&quot;")
            .replace("'", "&#39;");
    }
}
