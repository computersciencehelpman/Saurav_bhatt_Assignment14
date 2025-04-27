package com.coderscampus.Assignment14.service;

import org.springframework.stereotype.Service;
import com.coderscampus.domain.Channel;
import com.coderscampus.domain.Message;

import jakarta.annotation.PostConstruct;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChannelService {

    private final Map<String, List<Message>> channelMessages = new HashMap<>();

    @PostConstruct
    public void initDefaultChannels() {
        channelMessages.putIfAbsent("General", new ArrayList<>());
        channelMessages.putIfAbsent("Channel1", new ArrayList<>());
        channelMessages.putIfAbsent("Channel2", new ArrayList<>());
        channelMessages.putIfAbsent("Channel3", new ArrayList<>());
    }
    
    public List<Channel> getAllChannels() {
        List<Channel> channels = new ArrayList<>();

        for (String channelName : channelMessages.keySet()) {
            List<Message> messages = channelMessages.get(channelName);
            String lastMessageContent = messages.isEmpty() ? "No messages yet..." 
                                                            : messages.get(messages.size() - 1).getContent();
            Channel channel = new Channel(channelName, lastMessageContent);
            channels.add(channel);
        }

        return channels;
    }

    public List<Message> getMessagesForChannel(String channelName) {
        return channelMessages.getOrDefault(channelName, new ArrayList<>());
    }

    public void addMessageToChannel(String channelName, Message message) {
        channelMessages.computeIfAbsent(channelName, k -> new ArrayList<>()).add(message);
    }
}
