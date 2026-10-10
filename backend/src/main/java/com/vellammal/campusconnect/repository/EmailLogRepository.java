package com.vellammal.campusconnect.repository;

import com.vellammal.campusconnect.entity.EmailLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EmailLogRepository extends JpaRepository<EmailLog, Long> {
    
    List<EmailLog> findByStatus(String status);
    
    List<EmailLog> findByRecipient(String recipient);
    
    List<EmailLog> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    
    List<EmailLog> findByTriggerIdOrderByCreatedAtDesc(Long triggerId);
}
