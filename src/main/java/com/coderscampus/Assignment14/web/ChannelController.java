package com.coderscampus.Assignment14.web;

import com.coderscampus.Assignment14.service.ChannelService; // You might need to create this service if it doesn't exist
import com.coderscampus.domain.Channel; // Make sure you have a Channel class
import com.coderscampus.domain.Message;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import jakarta.servlet.http.HttpSession; 


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
    
    @GetMapping("/channels/{channelName}")
    public String openChannel(@PathVariable String channelName, Model model) {
        List<Message> messages = channelService.getMessagesForChannel(channelName);
        model.addAttribute("channelName", channelName);
        model.addAttribute("messages", messages);
        return "channel";
    }

    @GetMapping("/channels/{channelName}/messages")
    public String loadMessages(@PathVariable String channelName, Model model) {
        List<Message> messages = channelService.getMessagesForChannel(channelName);
        model.addAttribute("messages", messages);
        return "fragments/messages :: messagesList"; // We'll make a small fragment next!
    }

    @PostMapping("/channels/{channelName}/send")
    public String sendMessage(@PathVariable String channelName, @RequestParam String content, HttpSession session) {
        String sender = (String) session.getAttribute("username");
        channelService.addMessageToChannel(channelName, new Message(sender, content));
        return "redirect:/channels/" + channelName;
    }


    
}

