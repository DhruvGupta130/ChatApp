package org.example.chatapp.repository;

import org.example.chatapp.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface ChatMessageRepo extends JpaRepository<ChatMessage, Long> {
    void deleteByTimestampBefore(LocalDateTime timestampBefore);
}
