package com.coderscampus.Assignment14.service;


import org.springframework.stereotype.Service;

import com.coderscampus.domain.Channel;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChannelService {

    public List<Channel> getAllChannels() {
        List<Channel> channels = new ArrayList<>();

        
        Channel channel1 = new Channel("General", "Last message in General...");
        Channel channel2 = new Channel("Random", "Last message in Random...");
        channels.add(channel1);
        channels.add(channel2);

        return channels;
    }
}

