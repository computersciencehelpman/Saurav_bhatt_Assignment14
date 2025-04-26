package com.coderscampus.Assignment14.web;

import com.coderscampus.Assignment14.service.ChannelService; // You might need to create this service if it doesn't exist
import com.coderscampus.domain.Channel; // Make sure you have a Channel class
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class ChannelController {

    private final ChannelService channelService;

    public ChannelController(ChannelService channelService) {
        this.channelService = channelService;
    }

    @GetMapping("/channels")
    public String channelList(Model model) {
        List<Channel> channels = channelService.getAllChannels();
        model.addAttribute("channels", channels);
        return "general"; 
    }
}

