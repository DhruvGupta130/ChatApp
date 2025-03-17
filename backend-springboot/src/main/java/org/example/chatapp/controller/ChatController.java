package org.example.chatapp.controller;

import lombok.AllArgsConstructor;
import org.example.chatapp.model.ChatMessage;
import org.example.chatapp.service.ChatService;
import org.example.chatapp.service.RoomService;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@AllArgsConstructor
@CrossOrigin("*")
public class ChatController {

    private final ChatService chatService;
    private final RoomService roomService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public ChatMessage handleMessage(ChatMessage message) {
        return chatService.saveChatMessage(message);
    }

    @MessageMapping("/sendMessage/{roomName}")
    public void sendMessage(@DestinationVariable String roomName, @Payload ChatMessage message) {
        roomService.addMessage(roomService.fetchRoom(roomName), message);
        simpMessagingTemplate.convertAndSend("/topic/room/" + roomName, message);
    }

}