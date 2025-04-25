package com.coderscampus.Assignment14.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ChatController {

    @GetMapping("/{channel}")
    public String chatPage(@PathVariable("channel") String channel, Model model) {
        if (channel == null || channel.isEmpty()) {
            channel = "channel1";
        }

        model.addAttribute("channel", channel);
        return "channel"; 
    }
}

