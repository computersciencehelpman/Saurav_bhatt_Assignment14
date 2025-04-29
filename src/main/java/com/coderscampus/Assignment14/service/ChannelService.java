package com.coderscampus.Assignment14.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.coderscampus.domain.Channel;
import com.coderscampus.domain.Message;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class ChannelService {
    private final Map<String, Channel> channels = new HashMap<>();

    public ChannelService() {
        createChannel("channel1");
        createChannel("channel2");
        createChannel("channel3");
    }

    public List<Channel> getAllChannels() {
        List<Channel> sortedChannels = new ArrayList<>(channels.values());
        
        sortedChannels.sort((c1, c2) -> {
       
            LocalDateTime t1 = getLatestTimestamp(c1);
            LocalDateTime t2 = getLatestTimestamp(c2);
            
            return t2.compareTo(t1); // Newer channels first
        });
        
        return sortedChannels;
    }
    private LocalDateTime getLatestTimestamp(Channel channel) {
        if (channel.getMessages() == null || channel.getMessages().isEmpty()) {
            return LocalDateTime.MIN; // If no messages, treat as very old
        }
        return channel.getMessages()
                      .get(channel.getMessages().size() - 1)
                      .getTimestamp();
    }
    public Channel getChannelByName(String name) {
        return channels.get(name);
    }

    public void createChannel(String name) {
        if (!channels.containsKey(name)) {
            Channel channel = new Channel();
            channel.setName(name);
            channel.setMessages(new ArrayList<>());
            channel.setLastMessage("No messages yet.");
            channels.put(name, channel);
        }
    }

    public void addMessageToChannel(String channelName, Message message) {
        Channel channel = channels.get(channelName);
        if (channel != null) {
            channel.getMessages().add(message);
            channel.setLastMessage(message.getContent());
        }
    }

    public List<Message> getMessagesForChannel(String channelName) {
        Channel channel = channels.get(channelName);
        return (channel != null) ? channel.getMessages() : Collections.emptyList();
    }
}
