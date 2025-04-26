package com.coderscampus.Assignment14.repository;

import org.springframework.stereotype.Repository;

import com.coderscampus.domain.Message;

import java.util.*;

@Repository
public class ChannelRepository {

    private final Map<String, List<Message>> channelMessages = new HashMap<>();

    
    public List<Message> getMessages(String channelName) {
        return channelMessages.getOrDefault(channelName, new ArrayList<>());
    }

    
    public void addMessage(String channelName, Message message) {
        channelMessages.computeIfAbsent(channelName, k -> new ArrayList<>()).add(message);
    }
}

