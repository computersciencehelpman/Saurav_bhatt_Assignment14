package com.coderscampus.Assignment14.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.coderscampus.domain.Channel;
import com.coderscampus.domain.Message;

import java.util.*;

@Service
public class ChannelService {
    private final Map<String, Channel> channels = new HashMap<>();

    public List<Channel> getAllChannels() {
        return new ArrayList<>(channels.values());
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
            channel.setLastMessage(message.getContent()); // ✅ Update lastMessage
        }
    }

    public List<Message> getMessagesForChannel(String channelName) {
        Channel channel = channels.get(channelName);
        return (channel != null) ? channel.getMessages() : Collections.emptyList();
    }
}
