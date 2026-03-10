package com.vellammal.campusconnect.service;

import com.vellammal.campusconnect.entity.EmailLog;
import com.vellammal.campusconnect.entity.EmailTrigger;
import com.vellammal.campusconnect.repository.EmailLogRepository;
import com.vellammal.campusconnect.repository.EmailTriggerRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {
    
    private final JavaMailSender mailSender;
    private final EmailTriggerRepository triggerRepository;
    private final EmailLogRepository logRepository;
    @Value("${app.email.from}")
    private String fromAddress;
    
    /**
     * Send email based on event type
     */
    public void sendEmailByEvent(String eventType, String recipient, Object... templateArgs) {
        Optional<EmailTrigger> triggerOpt = triggerRepository.findByEventTypeAndIsActiveTrue(eventType);
        
        if (triggerOpt.isEmpty()) {
            log.warn("No active email trigger found for event: {}", eventType);
            return;
        }
        
        EmailTrigger trigger = triggerOpt.get();
        String body = formatTemplate(trigger.getTemplate(), templateArgs);
        
        sendEmail(recipient, trigger.getSubject(), body, trigger);
    }
    
    /**
     * Send a custom email
     */
    public void sendEmail(String to, String subject, String body, EmailTrigger trigger) {
        sendEmailWithStatus(to, subject, body, trigger);
    }

    /**
     * Send a custom email and return whether it was sent successfully
     */
    public boolean sendEmailWithStatus(String to, String subject, String body, EmailTrigger trigger) {
        EmailLog emailLog = new EmailLog();
        emailLog.setRecipient(to);
        emailLog.setSubject(subject);
        emailLog.setBody(body);
        emailLog.setTrigger(trigger);
        emailLog.setStatus("PENDING");

        boolean sent = false;
        
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromAddress);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true); // true = HTML
            
            mailSender.send(message);
            
            emailLog.setStatus("SENT");
            emailLog.setSentAt(LocalDateTime.now());
            sent = true;
            log.info("Email sent successfully to: {}", to);
            
        } catch (MessagingException | MailException e) {
            emailLog.setStatus("FAILED");
            emailLog.setErrorMessage(e.getMessage());
            log.error("Failed to send email to: {}", to, e);
        } finally {
            logRepository.save(emailLog);
        }

        return sent;
    }
    
    /**
     * Get all active email triggers
     */
    public List<EmailTrigger> getActiveTriggers() {
        return triggerRepository.findByIsActiveTrue();
    }
    
    /**
     * Get email logs by status
     */
    public List<EmailLog> getEmailLogsByStatus(String status) {
        return logRepository.findByStatus(status);
    }
    
    /**
     * Format template with arguments
     */
    private String formatTemplate(String template, Object... args) {
        if (args == null || args.length == 0) {
            return template;
        }
        return String.format(template, args);
    }
}
