package org.example.chatapp.controller;

import lombok.AllArgsConstructor;
import org.example.chatapp.model.ChatMessage;
import org.example.chatapp.model.Room;
import org.example.chatapp.service.RoomService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService roomService;

    @GetMapping
    public ResponseEntity<Room> getRoom(@RequestParam String roomName) {
        return ResponseEntity.ok(roomService.fetchRoom(roomName));
    }

    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody String roomName) {
        if(roomService.isRoomExists(roomName))
            throw new IllegalArgumentException("Room already exists!");
        return ResponseEntity.status(HttpStatus.CREATED).body(roomService.createRoom(roomName));
    }

    @GetMapping("/messages")
    public ResponseEntity<List<ChatMessage>> getMessages(@RequestParam String roomName) {
        return ResponseEntity.ok(roomService.getAllMessages(roomName));
    }

    @DeleteMapping("/{roomName}")
    public ResponseEntity<?> deleteRoom(@PathVariable String roomName) {
        roomService.deleteRoom(roomName);
        return ResponseEntity.ok().build();
    }
}
