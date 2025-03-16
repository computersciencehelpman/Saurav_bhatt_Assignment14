package com.coderscampus.Assignment14.service;

import com.coderscampus.Assignment14.Message;
import com.coderscampus.Assignment14.repository.MessageRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MessageService {
    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public void addMessage(String channel, String text) {
        messageRepository.saveMessage(channel.toLowerCase(), text);
    }

    public List<Message> getMessages(String channel) {
        return messageRepository.getAllMessages(channel.toLowerCase());
    }
}
