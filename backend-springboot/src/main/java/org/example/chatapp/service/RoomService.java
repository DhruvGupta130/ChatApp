package org.example.chatapp.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.example.chatapp.model.ChatMessage;
import org.example.chatapp.model.Room;
import org.example.chatapp.repository.RoomRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class RoomService {

    private final RoomRepo roomRepo;

    public Room fetchRoom(String roomName, String password) {
        return roomRepo.findByName(roomName)
                .orElseThrow(() -> new EntityNotFoundException("Room with name " + roomName + " not found") );
    }

    public boolean isRoomExists(String roomName) {
        return roomRepo.findByName(roomName).isPresent();
    }

    public Room createRoom(String roomName, String password) {
        Room room = new Room();
        room.setName(roomName);
        room.setPassword(password);
        return roomRepo.save(room);
    }

    public List<ChatMessage> getAllMessages(String roomName) {
        return roomRepo.findMessagesByRoomName(roomName);
    }

    public void addMessage(Room room, ChatMessage chatMessage) {
        chatMessage.setRoom(room);
        room.getMessages().add(chatMessage);
        roomRepo.save(room);
    }

    @Transactional
    public void deleteRoom(String roomName) {
        roomRepo.deleteByName((roomName));
    }
}
