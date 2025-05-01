package com.coderscampus.Assignment14.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.coderscampus.Assignment14.service.MessageService;

import jakarta.servlet.http.HttpSession;

@Controller
public class ChatController {

    private final MessageService messageService;

    public ChatController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/{channel}")
    public String chatPage(@PathVariable("channel") String channel, Model model, HttpSession session) {
        String username = (String) session.getAttribute("username");
        if (username == null) {
            return "redirect:/welcome";
        }

        if (channel == null || channel.isEmpty()) {
            channel = "channel1";
        }

        model.addAttribute("channel", channel);
        model.addAttribute("username", username);
        model.addAttribute("messages", messageService.getMessages(channel)); 
        return "channel";
    }

}
