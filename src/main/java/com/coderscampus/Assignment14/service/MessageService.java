package com.coderscampus.Assignment14.service;

import com.coderscampus.Assignment14.repository.MessageRepository;
import com.coderscampus.domain.Message;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MessageService {
    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public void addMessage(String channel, String text, String fromUser, String toUser) {
        messageRepository.saveMessage(channel, text, fromUser, toUser);
    }

    public List<Message> getMessages(String channel) {
        return messageRepository.getAllMessages(channel.toLowerCase());
    }
}
