package com.coderscampus.Assignment14.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.coderscampus.domain.Message;

@Service
public class MessageService {

    private final ChannelService channelService;

    public MessageService(ChannelService channelService) {
        this.channelService = channelService;
    }

    public void addMessage(String channel, String text, String fromUser, String toUser) {
        Message message = new Message(text, fromUser, toUser);
        channelService.addMessageToChannel(channel, message);
    }

    public List<Message> getMessages(String channel) {
        return channelService.getMessagesForChannel(channel.toLowerCase());
    }
}
