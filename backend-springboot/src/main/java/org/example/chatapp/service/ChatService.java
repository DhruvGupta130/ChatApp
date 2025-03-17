package org.example.chatapp.service;

import lombok.AllArgsConstructor;
import org.example.chatapp.model.ChatMessage;
import org.example.chatapp.repository.ChatMessageRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ChatService {

    private final ChatMessageRepo chatMessageRepo;

    public ChatMessage saveChatMessage(ChatMessage chatMessage) {
        return chatMessageRepo.save(chatMessage);
    }

    public List<ChatMessage> getAllMessages() {
        return chatMessageRepo.findAll();
    }

}
