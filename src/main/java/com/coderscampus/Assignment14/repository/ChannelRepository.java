package com.coderscampus.Assignment14.repository;

import org.springframework.stereotype.Repository;

import com.coderscampus.domain.Message;

import java.util.*;

@Repository
public class ChannelRepository {

    private final Map<String, List<Message>> channelMessages = new HashMap<>();

    // Get all messages for a specific channel
    public List<Message> getMessages(String channelName) {
        return channelMessages.getOrDefault(channelName, new ArrayList<>());
    }

    // Add a new message to a channel
    public void addMessage(String channelName, Message message) {
        channelMessages.computeIfAbsent(channelName, k -> new ArrayList<>()).add(message);
    }
}

