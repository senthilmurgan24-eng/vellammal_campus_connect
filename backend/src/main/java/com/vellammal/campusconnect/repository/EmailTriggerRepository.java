package com.vellammal.campusconnect.repository;

import com.vellammal.campusconnect.entity.EmailTrigger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmailTriggerRepository extends JpaRepository<EmailTrigger, Long> {
    
    List<EmailTrigger> findByIsActiveTrue();
    
    Optional<EmailTrigger> findByEventTypeAndIsActiveTrue(String eventType);
    
    List<EmailTrigger> findByEventType(String eventType);
}
