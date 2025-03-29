package com.coderscampus.Assignment14.repository;

import com.coderscampus.Assignment14.*;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public class MessageRepository {
    private final Map<String, List<Message>> messagesByChannel = new HashMap<>();

    public void saveMessage(String channel, String text, String fromUser) {
        channel = channel.toLowerCase(); // Normalize channel names
        messagesByChannel.putIfAbsent(channel, new ArrayList<>());
        messagesByChannel.get(channel).add(new Message(channel, text, fromUser)); // Include fromUser
        
        System.out.println("📥 Saved message: " + text + " | From: " + fromUser + " in channel: " + channel);
    }

    public List<Message> getAllMessages(String channel) {
        return messagesByChannel.getOrDefault(channel.toLowerCase(), new ArrayList<>());
    }
}
