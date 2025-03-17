package org.example.chatapp.service;

import lombok.RequiredArgsConstructor;
import org.example.chatapp.repository.ChatMessageRepo;
import org.example.chatapp.repository.RoomRepo;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CleanupService {
    private final ChatMessageRepo chatMessageRepository;
    private final RoomRepo roomRepo;

    @Transactional
    @Scheduled(cron = "0 0 3 * * ?") // Runs every day at 3 AM
    public void deleteOldMessages() {
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusDays(7);
        chatMessageRepository.deleteByTimestampBefore(oneWeekAgo);
        System.out.println("🗑 Deleted messages older than 7 days");
    }

    @Transactional
    @Scheduled(cron = "0 0 3 * * ?") // Runs every day at 3 AM
    public void deleteOldRooms() {
        LocalDateTime oneMonthAgo = LocalDateTime.now().minusDays(30);
        roomRepo.deleteByLastUpdateBefore(oneMonthAgo);
        System.out.println("🗑 Rooms deleted older than 30 days");
    }
}
