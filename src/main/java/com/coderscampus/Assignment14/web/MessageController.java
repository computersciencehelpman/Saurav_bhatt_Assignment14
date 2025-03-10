package com.coderscampus.Assignment14.web;

import com.coderscampus.Assignment14.service.MessageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/messages")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/send/{channel}")
    public void sendMessage(@PathVariable String channel, @RequestBody Map<String, String> payload) {
        String message = payload.get("text");
        System.out.println("Received message for channel: " + channel + " -> " + message); // Debugging
        messageService.addMessage(channel.toLowerCase(), message);
    }


    @GetMapping("/all/{channel}")
    public List<String> getAllMessages(@PathVariable String channel) {
    	System.out.println("Retrieving messages for channel: " + channel); // Debugging
    	return messageService.getMessages(channel.toLowerCase());
    }
}