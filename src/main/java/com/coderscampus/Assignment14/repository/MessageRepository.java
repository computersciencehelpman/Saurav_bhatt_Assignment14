package com.coderscampus.Assignment14.repository;

import org.springframework.stereotype.Repository;

import com.coderscampus.domain.Message;

import java.util.*;

@Repository
public class MessageRepository {
    private final Map<String, List<Message>> messagesByChannel = new HashMap<>();

    public void saveMessage(String channel, String text, String fromUser, String toUser) {
        channel = channel.toLowerCase();
        messagesByChannel.putIfAbsent(channel, new ArrayList<>());
        messagesByChannel.get(channel).add(new Message());
    }

    public List<Message> getAllMessages(String channel) {
        return messagesByChannel.getOrDefault(channel.toLowerCase(), new ArrayList<>());
    }
}