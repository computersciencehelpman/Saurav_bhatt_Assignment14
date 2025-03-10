package com.coderscampus.Assignment14.service;

import com.coderscampus.Assignment14.repository.MessageRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MessageService {
    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public void addMessage(String channel, String message) {
        System.out.println("Adding message to channel: " + channel); // Debugging
        messageRepository.saveMessage(channel, message);
    }

    public List<String> getMessages(String channel) {
        System.out.println("Fetching messages from channel: " + channel); // Debugging
        return messageRepository.getAllMessages(channel);
    }
}
