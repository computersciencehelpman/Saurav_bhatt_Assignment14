package com.coderscampus.Assignment14.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ChatController {
    @GetMapping("/{channel}")
    public String loadChannel(@PathVariable String channel, Model model) {
        model.addAttribute("channel", channel.toLowerCase()); // Normalize
        return "chat"; 
    }
}