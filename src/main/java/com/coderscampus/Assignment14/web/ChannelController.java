package com.coderscampus.Assignment14.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.coderscampus.Assignment14.service.ChannelService; // You might need to create this service if it doesn't exist
import com.coderscampus.domain.Channel; // Make sure you have a Channel class
import com.coderscampus.domain.Message;

import jakarta.servlet.http.HttpSession;
@Controller
public class ChannelController {

    private final ChannelService channelService;

    public ChannelController(ChannelService channelService) {
        this.channelService = channelService;
    }

    @GetMapping("/")
    public String welcome() {
        return "welcome";
    }

    @GetMapping("/general")
    public String general(Model model) {
        List<Channel> channels = channelService.getAllChannels();
        model.addAttribute("channels", channels);
        return "general";
    }

    @GetMapping("/channels")
    public String showChannels(Model model) {
        List<Channel> channels = channelService.getAllChannels();
        model.addAttribute("channels", channels);
        return "general"; 
    }

    @PostMapping("/create-channel")
    public String createChannel(@RequestParam String name, Model model) {
        channelService.createChannel(name);
        return "redirect:/general";
    }

    @GetMapping("/channel/{name}")
    public String channel(@PathVariable String name, Model model) {
        Channel channel = channelService.getChannelByName(name);
        if (channel == null) {
            return "redirect:/general";
        }
        model.addAttribute("channel", channel);
        return "channel";
    }

    @PostMapping("/channel/{name}/send")
    public String sendMessage(@PathVariable String name, @RequestParam String content, Model model, HttpSession session) {
        String username = (String) session.getAttribute("username");
        if (username == null) {
            username = "anonymous";
        }
        Message newMessage = new Message(content, username, "");
        channelService.addMessageToChannel(name, newMessage);

        return "redirect:/channel/" + name;
    }

    @GetMapping("/channel/{name}/messages")
    @ResponseBody
    public List<Message> getMessages(@PathVariable String name) {
        return channelService.getMessagesForChannel(name);
    }
}
