package org.example.chatapp.repository;

import org.example.chatapp.model.ChatMessage;
import org.example.chatapp.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RoomRepo extends JpaRepository<Room, Long> {

    Optional<Room> findByName(String name);

    @Query("SELECT m FROM ChatMessage m WHERE m.room.name = :roomName")
    List<ChatMessage> findMessagesByRoomName(String roomName);

    void deleteByName(String name);

    void deleteByLastUpdateBefore(LocalDateTime lastUpdateBefore);
}
