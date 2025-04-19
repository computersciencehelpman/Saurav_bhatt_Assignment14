package com.coderscampus.Assignment14.repository;

import com.coderscampus.Assignment14.*;
import com.coderscamus.domain.Message;

import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public class MessageRepository {
    private final Map<String, List<Message>> messagesByChannel = new HashMap<>();

    public void saveMessage(String channel, String text, String fromUser, String toUser) {
        channel = channel.toLowerCase();
        messagesByChannel.putIfAbsent(channel, new ArrayList<>());
        messagesByChannel.get(channel).add(new Message(channel, text, fromUser, toUser));
        System.out.println("📥 Saved message: " + text + " | From: " + fromUser + " to " + toUser + " in channel: " + channel);
    }

    public List<Message> getAllMessages(String channel) {
        return messagesByChannel.getOrDefault(channel.toLowerCase(), new ArrayList<>());
    }
}